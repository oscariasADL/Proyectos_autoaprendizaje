import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import {
  catchError,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { SecureKeys } from '@commons/constants/keys.constants';
import { ModalController } from '@commons/controllers/modal.controller';
import { GenericResponse } from '@commons/entities/response/response.interface';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { DigitalDebitCardFrequentQuestionsComponent } from '@modules/digital-debit-card/component/digital-debit-card-frequent-questions/digital-debit-card-frequent-questions.component';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import {
  DigitalDebitCard,
  DigitalDebitCardDetail
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import {
  mapCreateDigitalDebitCardError,
  mapDigitalDebitCardDetailError,
  mapEditDigitalDebitCardError
} from '@modules/digital-debit-card/mappers/digital-debit-card-response.mapper';
import { DigitalDebitCardService } from '@modules/digital-debit-card/service/digital-debit-card.service';
import * as actions from '@modules/digital-debit-card/store/digital-debit-card.actions';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { DigitalDebitCardDetailComponent } from '@modules/digital-debit-card/component/digital-debit-card-detail/digital-debit-card-detail.component';
import { DigitalDebitCardUseComponent } from '@modules/digital-debit-card/component/digital-debit-card-use/digital-debit-card-use.component';

@Injectable()
export class DigitalDebitCardEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private facade: DigitalDebitCardFacade,
    private service: DigitalDebitCardService,
    private secureStorage: AdlSecureStorageService
  ) {}

  fetchDigitalDebitCardsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchDigitalDebitCardsAction),
      switchMap((_) =>
        this.service.fetchDigitalDebitCards().pipe(
          switchMap((cards: DigitalDebitCard[]) =>
            defer(async () => {
              const db = await this.secureStorage.getAll();
              const cardsViewed = getDBValue(
                db,
                SecureKeys.digitalDebitCardListViewed
              );

              return [
                actions.setDigitalDebitCardsViewedAction({
                  cardsViewed: cardsViewed || ''
                }),
                actions.fetchDigitalDebitCardsSuccessAction({ cards })
              ];
            })
          ),
          mergeMap((initActions) => [...initActions]),
          catchError((response: HttpErrorResponse) =>
            of(
              actions.fetchDigitalDebitCardsErrorAction({
                message: response.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchDigitalDebitCardDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchDigitalDebitCardDetailAction),
      switchMap(({ relativeParentId, alertSuccess, warningSuccess }) =>
        this.service.fetchDigitalDebitCardDetail(relativeParentId).pipe(
          switchMap((digitalDebitCardDetail: DigitalDebitCardDetail) =>
            defer(async () => {
              const db = await this.secureStorage.getAll();
              const cardsViewed =
                getDBValue(db, SecureKeys.digitalDebitCardListViewed) ?? '';
              const cardsViewedArr = cardsViewed
                .split(',')
                .filter((card) => card?.length > 0);

              if (
                !cardsViewedArr.includes(relativeParentId) &&
                isNullOrUndefinedOrEmpty(alertSuccess)
              ) {
                cardsViewedArr.push(relativeParentId);
                await this.secureStorage.put(
                  SecureKeys.digitalDebitCardListViewed,
                  cardsViewedArr.join(','),
                  true
                );
              }

              const modal = await this.modalCtrl.create({
                id: 'digital-debit-card-detail-modal',
                component: DigitalDebitCardDetailComponent,
                componentProps: {
                  relativeParentId,
                  digitalDebitCardDetail
                },
                mode: 'md',
                cssClass: 'avv-custom-modal'
              });
              await modal.present();

              if (!isNullOrUndefinedOrEmpty(alertSuccess)) {
                this.facade.showToast({
                  type: ToastType.success,
                  title: alertSuccess,
                  override: {
                    timeOut: 15000,
                    positionClass: 'toast-top-center-digital-debit-card-detail'
                  }
                });
              }

              if (!isNullOrUndefinedOrEmpty(warningSuccess)) {
                this.facade.showToast({
                  type: ToastType.warning,
                  title: warningSuccess,
                  override: {
                    timeOut: 20000,
                    positionClass: 'toast-top-center-digital-debit-card-detail',
                    enableHtml: true
                  }
                });
              }

              return [
                actions.setDigitalDebitCardsViewedAction({
                  cardsViewed: cardsViewedArr.join(',')
                }),
                actions.fetchDigitalDebitCardDetailSuccessAction()
              ];
            })
          ),
          mergeMap((initActions) => [...initActions]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchDigitalDebitCardDetailErrorAction({
                props: mapDigitalDebitCardDetailError(error)
              })
            )
          )
        )
      )
    )
  );

  createDigitalDebitCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createDigitalDebitCardAction),
      switchMap(({ payload }) =>
        this.service.createDigitalDebitCard(payload).pipe(
          withLatestFrom(this.facade.activateUrlBackTo$),
          tap(([, activateUrlBackTo]) => this.navCtrl.back()),
          mergeMap(([response]) => [
            actions.fetchDigitalDebitCardsAction(),
            actions.createDigitalDebitCardSuccessAction({ response }),
            actions.fetchDigitalDebitCardDetailAction({
              relativeParentId: payload.relativeId,
              alertSuccess: 'DIGITAL_DEBIT_CARD.ACTIVATE.SUCCESS_RESPONSE',
              warningSuccess: !isNullOrUndefinedOrEmpty(response?.description)
                ? `<b>${response?.description}</b>`
                : ''
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.createDigitalDebitCardErrorAction({
                props: mapCreateDigitalDebitCardError(
                  error,
                  payload.digitalDebitCardTrnType
                )
              })
            )
          )
        )
      )
    )
  );

  showFrequentQuestionsEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.showFrequentQuestionsAction),
        tap(async () => {
          const modal = await this.modalCtrl.create({
            id: 'digital-debit-card-frequent-questions-modal',
            component: DigitalDebitCardFrequentQuestionsComponent,
            componentProps: {
              id: 'digital-debit-card-frequent-questions-modal'
            },
            mode: 'md',
            cssClass: 'avv-custom-full-modal'
          });
          await modal.present();
        })
      ),
    { dispatch: false }
  );

  showDigitalDebitCardUseEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.showDigitalDebitCardUseAction),
        tap(async () => {
          const modal = await this.modalCtrl.create({
            id: 'digital-debit-card-use-modal',
            component: DigitalDebitCardUseComponent,
            componentProps: { id: 'digital-debit-card-use-modal' },
            mode: 'md',
            cssClass: 'avv-custom-modal'
          });
          await modal.present();
        })
      ),
    { dispatch: false }
  );

  editDigitalDebitCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.editDigitalDebitCardAction),
      switchMap(({ payload }) =>
        this.service.editDigitalDebitCard(payload).pipe(
          tap(() => this.modalCtrl.dismiss()),
          mergeMap((response: GenericResponse) => [
            actions.editDigitalDebitCardSuccessAction({ response }),
            actions.fetchDigitalDebitCardsAction(),
            actions.fetchDigitalDebitCardDetailAction({
              relativeParentId: payload.relativeIdParent,
              alertSuccess: 'DIGITAL_DEBIT_CARD.EDIT.EDIT_SUCCESS',
              warningSuccess: ''
            })
          ]),
          catchError((error: HttpErrorResponse) => {
            void this.modalCtrl.dismiss();
            return of(
              actions.editDigitalDebitCardErrorAction({
                props: mapEditDigitalDebitCardError(error)
              })
            );
          })
        )
      )
    )
  );

  cancelDigitalDebitCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.cancelDigitalDebitCardAction),
      switchMap(({ payload }) =>
        this.service.createDigitalDebitCard(payload).pipe(
          tap(() => this.modalCtrl.dismiss()),
          mergeMap((response: GenericResponse) => {
            window.setTimeout(
              () =>
                this.facade.showToast({
                  type: ToastType.success,
                  title: 'DIGITAL_DEBIT_CARD.CANCEL.CANCEL_SUCCESS',
                  override: {
                    timeOut: 5000
                  }
                }),
              300
            );
            return [
              actions.cancelDigitalDebitCardSuccessAction({ response }),
              actions.fetchDigitalDebitCardsAction()
            ];
          }),
          catchError((error: HttpErrorResponse) => {
            void this.modalCtrl.dismiss();
            return of(
              actions.cancelDigitalDebitCardErrorAction({
                props: mapCreateDigitalDebitCardError(
                  error,
                  payload.digitalDebitCardTrnType
                )
              })
            );
          })
        )
      )
    )
  );

  reissueDigitalDebitCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.reissueDigitalDebitCardAction),
      switchMap(({ payload }) =>
        this.service.createDigitalDebitCard(payload).pipe(
          tap(() => this.modalCtrl.dismiss()),
          mergeMap((response: GenericResponse) => [
            actions.reissueDigitalDebitCardSuccessAction({ response }),
            actions.fetchDigitalDebitCardsAction(),
            actions.fetchDigitalDebitCardDetailAction({
              relativeParentId: payload.relativeId,
              alertSuccess: 'DIGITAL_DEBIT_CARD.REISSUE.REISSUE_SUCCESS',
              warningSuccess: !isNullOrUndefinedOrEmpty(response?.description)
                ? `<b>${response?.description}</b>`
                : ''
            })
          ]),
          catchError((error: HttpErrorResponse) => {
            void this.modalCtrl.dismiss();
            return of(
              actions.reissueDigitalDebitCardErrorAction({
                props: mapCreateDigitalDebitCardError(
                  error,
                  payload.digitalDebitCardTrnType
                )
              })
            );
          })
        )
      )
    )
  );
}
