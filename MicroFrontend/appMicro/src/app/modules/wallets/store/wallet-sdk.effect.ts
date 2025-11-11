import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import * as actions from '@modules/wallets/store/wallets.actions';
import { mapValidateAndPushCardError } from '@modules/wallets/mappers/wallets.mapper';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { WalletServicesStatus } from '@modules/wallets/entities/wallets.interface';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';
import { TIME_LIMIT_WAITING_PUSH_CARD_ACTION } from '@modules/wallets/constants/wallets.constants';

@Injectable()
export class WalletSdkEffect {
  constructor(
    private actions$: Actions,
    private digitalWalletContextService: DigitalWalletContextService,
    private facade: WalletsFacade
  ) {}

  validateAndPushCardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.validateAndPushCardAction),
      switchMap(({ digitalCardId }) =>
        defer(async () => {
          this.facade.enableLoading();

          const { status: digitalWalletServiceStatus } =
            await this.digitalWalletContextService.getStatusPlatformService({
              cardId: digitalCardId
            });
          if (
            digitalWalletServiceStatus !==
            WalletServicesStatus.ACTIVE.toString()
          ) {
            return throwError({
              error: {
                message: 'WALLETS.APPLE_PAY.PUSH_PROCESS.APPLE_PAY_STATUS_ERROR'
              }
            });
          }

          const { canPushCardWalletPay } =
            await this.digitalWalletContextService.canPushCardWalletPay({
              cardId: digitalCardId
            });
          if (!canPushCardWalletPay)
            return throwError({
              error: {
                message:
                  'WALLETS.APPLE_PAY.PUSH_PROCESS.CANNOT_PUSH_CARD_TO_APPLE_PAY'
              }
            });

          window.setTimeout(() => {
            this.facade.disableLoading();
          }, TIME_LIMIT_WAITING_PUSH_CARD_ACTION);

          try {
            await this.digitalWalletContextService.pushCardToWalletPay({
              cardId: digitalCardId
            });
          } catch (error) {
            return throwError({
              error: {
                message: 'WALLETS.APPLE_PAY.PUSH_PROCESS.PUSH_CARD_ERROR'
              }
            });
          }

          this.facade.disableLoading();
          return [
            actions.validateAndPushCardSuccessAction({
              props: {
                type: ToastType.success,
                title: 'WALLETS.APPLE_PAY.PUSH_PROCESS.PUSH_CARD_SUCCESS'
              }
            }),
            actions.prepareCardsAction()
          ];
        }).pipe(
          mergeMap((initActions) => initActions),
          catchError((error) => {
            this.facade.disableLoading();
            return of(
              actions.validateAndPushCardErrorAction({
                props: mapValidateAndPushCardError(error)
              })
            );
          })
        )
      )
    )
  );
}
