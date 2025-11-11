import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  defer,
  firstValueFrom,
  forkJoin,
  from,
  Observable,
  of,
  timeout
} from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  toArray,
  withLatestFrom
} from 'rxjs/operators';

import * as actions from '@modules/wallets/store/wallets.actions';
import { WalletsService } from '@modules/wallets/services/wallets.service';
import { mapError } from '@commons/helpers/http.helpers';
import { mapPrepareCardEnrollmentDataPayload } from '@modules/wallets/mappers/wallets.mapper';
import { handleEnrollCardEvents } from '@modules/wallets/helpers/enroll-digital-card.helpers';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import { DigitalCardStructureExt } from '@modules/wallets/entities/wallets.interface';
import { DigitalCardStructure } from '@commons/capacitor-web-plugins/digital-wallet';
import { environment as ENV } from '@environment';
import { DEBIT_CARD_BIN } from '@modules/wallets/constants/wallets.constants';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';

@Injectable()
export class WalletsEffect {
  constructor(
    private actions$: Actions,
    private service: WalletsService,
    private digitalWalletContextService: DigitalWalletContextService,
    private facade: WalletsFacade
  ) {}

  fetchCardListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchCardListAction),
      switchMap(() =>
        this.service.fetchCardList().pipe(
          switchMap((cardList) => [
            actions.fetchCardListSuccessAction({ cardList }),
            actions.cardEnrollmentProcessAction()
          ]),
          catchError((error) =>
            of(actions.fetchCardListErrorAction({ error: mapError(error) }))
          )
        )
      )
    )
  );

  enrollCardsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchCardListSuccessAction),
      mergeMap(({ cardList }) => from(cardList)),
      mergeMap((card) =>
        from(
          this.digitalWalletContextService.getDigitalCardId({
            cardId: card.cardNumberDecrypted
          })
        ).pipe(
          switchMap(({ digitalCardId }) => {
            if (digitalCardId) {
              return of(
                actions.enrollCardFinishedAction({
                  cardId: card.encryptedCardNumber
                })
              );
            }

            return of(
              actions.enrollCardRequestedAction({
                card
              })
            );
          }),
          catchError((err) => {
            console.error('getDigitalCardId failed for card', card, err);
            return of(
              actions.enrollCardFinishedAction({
                cardId: card.encryptedCardNumber
              })
            );
          })
        )
      )
    )
  );

  enrollCardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.enrollCardRequestedAction),
      withLatestFrom(this.facade.walletId$, this.facade.basicData$),
      mergeMap(([{ card }, walletId, userData]) => {
        const payload = mapPrepareCardEnrollmentDataPayload(
          card,
          userData.clientName,
          walletId
        );

        return this.service.fetchPrepareCardEnrollmentData(payload).pipe(
          switchMap(({ enrollmentData }) =>
            from(
              this.digitalWalletContextService.enrollCardToWallet({
                enrollmentData
              })
            ).pipe(
              switchMap(({ success }) => {
                if (!success) return of(null);

                const cardEnrollmentTokenizationTTL = this.facade.boundsByKey(
                  ParameterKey.cardEnrollmentTokenizationTTL
                );

                return Capacitor.isNativePlatform()
                  ? from(handleEnrollCardEvents()).pipe(
                      timeout(cardEnrollmentTokenizationTTL),
                      catchError(() => of(null))
                    )
                  : of(null);
              }),
              tap((success) => {
                if (success) {
                  this.facade.dispatch([
                    actions.setCustomCardDisplayAction({
                      cardId: card.cardNumberDecrypted
                    })
                  ]);
                }
              }),
              map(() =>
                actions.enrollCardFinishedAction({
                  cardId: card.encryptedCardNumber
                })
              )
            )
          ),
          catchError(() =>
            of(
              actions.enrollCardFinishedAction({
                cardId: card.encryptedCardNumber
              })
            )
          )
        );
      })
    )
  );

  waitUntilAllCardsProcessedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchCardListSuccessAction),
      switchMap(({ cardList }) =>
        this.actions$.pipe(
          ofType(actions.enrollCardFinishedAction),
          take(cardList.length),
          toArray(),
          map(() => [
            actions.cardEnrollmentProcessSuccessAction(),
            actions.prepareCardsAction()
          ]),
          mergeMap((initActions) => initActions)
        )
      )
    )
  );

  setCustomCardDisplayEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.setCustomCardDisplayAction),
        mergeMap(
          ({ cardId }) =>
            defer(async () => {
              let bin = cardId.slice(0, 6);
              let cardCromalineMap = await firstValueFrom(
                this.facade.cardCromalineMapByBin(bin)
              );

              if (!cardCromalineMap) {
                if (cardId.startsWith('5')) {
                  bin = DEBIT_CARD_BIN;
                } else if (cardId.startsWith('4')) {
                  bin = DEBIT_CARD_BIN; // Replace with default bin to Visa
                }

                cardCromalineMap = await firstValueFrom(
                  this.facade.cardCromalineMapByBin(bin)
                );
              }

              if (!cardCromalineMap) return;

              await this.digitalWalletContextService.setCustomCardDisplay({
                cardId,
                cardImageUrl:
                  ENV.resources.baseAssetsUrl + cardCromalineMap.cromalineUrl,
                cardDescription: cardCromalineMap.description
              });
            }) //.pipe(mergeMap((initActions) => initActions))
        )
      ),
    { dispatch: false }
  );

  prepareCardsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.prepareCardsAction),
      switchMap(() =>
        from(this.digitalWalletContextService.getDigitalCards()).pipe(
          map(({ cards }) => JSON.parse(cards) as DigitalCardStructure[]),
          switchMap<
            DigitalCardStructure[],
            Observable<DigitalCardStructureExt[]>
          >((walletCardList) => {
            if (!walletCardList?.length) {
              return of([]);
            }

            return forkJoin(
              walletCardList.map((card) =>
                from(
                  this.digitalWalletContextService.canPushCardWalletPay({
                    cardId: card.id
                  })
                ).pipe(
                  map(({ canPushCardWalletPay }) => ({
                    ...card,
                    canPushCardInWalletPay: canPushCardWalletPay
                  })),
                  catchError(() =>
                    of({
                      ...card,
                      canPushCardInWalletPay: true
                    })
                  )
                )
              )
            );
          }),
          map((walletCardListMapped) =>
            actions.prepareCardsSuccessAction({
              walletCardList: walletCardListMapped
            })
          ),
          catchError(() => of(actions.prepareCardsErrorAction()))
        )
      )
    )
  );
}
