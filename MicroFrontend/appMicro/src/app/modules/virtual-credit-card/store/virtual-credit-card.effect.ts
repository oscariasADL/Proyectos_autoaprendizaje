/* eslint-disable max-lines */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import {
  catchError,
  finalize,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import * as actions from '@modules/virtual-credit-card/store/virtual-credit-card.actions';
import { ModalController } from '@commons/controllers/modal.controller';
import { VirtualCreditCardFrequentQuestionsComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-frequent-questions/virtual-credit-card-frequent-questions.component';
import { VirtualCreditCardService } from '@modules/virtual-credit-card/services/virtual-credit-card.service';
import {
  mapOperationVirtualCreditCardSuccess,
  mapOperationVirtualCreditCardError,
  mapOperationVirtualCreditCardPayload
} from '@modules/virtual-credit-card/mappers/virtual-credit-card.mapper';
import {
  VirtualCreditCardActionType,
  VirtualCreditCardDetail
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { toastAction } from '@store/actions/toast.action';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { VirtualCreditCardDetailComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-detail/virtual-credit-card-detail.component';
import { VirtualCreditCardUseComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-use/virtual-credit-card-use.component';
import { VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID } from '@modules/virtual-credit-card/constants/virtual-credit-card.constants';
import { VirtualCreditCardReissueSuccessComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-reissue-success/virtual-credit-card-reissue-success.component';

@Injectable()
export class VirtualCreditCardEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private service: VirtualCreditCardService,
    private facade: VirtualCreditCardFacade
  ) {}

  fetchVirtualCreditCardsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchVirtualCreditCardsAction),
      switchMap(({ payload }) =>
        this.service.fetchVirtualCreditCards(payload).pipe(
          switchMap((response) => {
            const maxCardsLimit = this.facade.boundsByKey(
              ParameterKey.tcvMaxCards
            );
            return [
              actions.fetchVirtualCreditCardsSuccessAction({
                cards: response,
                maxCardsLimit
              })
            ];
          })
        )
      ),
      catchError((error: HttpErrorResponse) =>
        of(
          actions.fetchVirtualCreditCardsErrorAction({ message: error.message })
        )
      )
    )
  );

  fetchVirtualCreditCardDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchVirtualCreditCardDetailAction),
      switchMap(({ payload, alertSuccess }) =>
        this.service.fetchVirtualCreditCardDetail(payload).pipe(
          switchMap((virtualCreditCardDetail: VirtualCreditCardDetail) =>
            defer(async () => {
              const modal = await this.modalCtrl.create({
                id: VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID,
                component: VirtualCreditCardDetailComponent,
                componentProps: {
                  virtualCreditCardDetail,
                  acctTypeParent: payload.acctTypeParent,
                  numberProductParent: payload.numberProductParent
                },
                mode: 'md',
                cssClass: 'avv-custom-modal'
              });
              await modal.present();
              if (alertSuccess) {
                this.facade.showToast({
                  type: ToastType.success,
                  title: alertSuccess,
                  override: {
                    timeOut: 15000,
                    positionClass: 'toast-top-center-virtual-credit-card-detail'
                  }
                });
              }
              return [actions.fetchVirtualCreditCardDetailSuccessAction()];
            })
          ),
          mergeMap((initActions) => [...initActions]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchVirtualCreditCardDetailErrorAction({
                props: {}
              })
            )
          )
        )
      )
    )
  );

  createVirtualCreditCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createVirtualCreditCardAction),
      switchMap(({ payload }) =>
        this.service.createVirtualCreditCard(payload).pipe(
          withLatestFrom(
            this.facade.activateUrlBackTo$,
            this.facade.maxCardsLimit$,
            this.facade.totalCardsCreated$
          ),
          tap(([, activateUrlBackTo]) =>
            this.navCtrl.navigateForward(activateUrlBackTo, {
              replaceUrl: true
            })
          ),
          mergeMap(([response, , maxCardsLimit, totalCardsCreated]) => [
            actions.fetchVirtualCreditCardsAction({
              payload: {
                acctTypeParent: payload.accType,
                numberProductParent: payload.numberCreditCard
              }
            }),
            actions.createVirtualCreditCardSuccessAction({
              response
            }),
            toastAction({
              props: {
                type: ToastType.success,
                title: this.translate.instant(
                  'VIRTUAL_CREDIT_CARD.ACTIVATE.SUCCESS_RESPONSE',
                  {
                    max_cards: maxCardsLimit,
                    remaining_cards: maxCardsLimit - totalCardsCreated - 1
                  }
                )
              }
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.createVirtualCreditCardErrorAction({
                props: mapOperationVirtualCreditCardError(
                  error,
                  VirtualCreditCardActionType.NEW
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
            id: 'virtual-credit-card-frequent-questions-modal',
            component: VirtualCreditCardFrequentQuestionsComponent,
            componentProps: {
              id: 'virtual-credit-card-frequent-questions-modal'
            },
            mode: 'md',
            cssClass: 'avv-custom-full-modal'
          });
          await modal.present();
        })
      ),
    { dispatch: false }
  );

  showVirtualCreditCardUseEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.showVirtualCreditCardUseAction),
        tap(async () => {
          const modal = await this.modalCtrl.create({
            id: 'virtual-credit-card-use-modal',
            component: VirtualCreditCardUseComponent,
            componentProps: { id: 'virtual-credit-card-use-modal' },
            mode: 'md',
            cssClass: 'avv-custom-modal'
          });
          await modal.present();
        })
      ),
    { dispatch: false }
  );

  cancelVirtualCreditCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.cancelVirtualCreditCardAction),
      switchMap(({ payload }) =>
        this.service
          .cancelVirtualCreditCard(
            mapOperationVirtualCreditCardPayload(payload, 'C')
          )
          .pipe(
            switchMap((response) => {
              return [
                actions.cancelVirtualCreditCardSuccessAction({
                  props: mapOperationVirtualCreditCardSuccess(
                    response,
                    VirtualCreditCardActionType.CANCELLATION
                  )
                }),
                actions.fetchVirtualCreditCardsAction({
                  payload: {
                    acctTypeParent: payload.acctTypeParent,
                    numberProductParent: payload.numberProductParent
                  }
                })
              ];
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                actions.cancelVirtualCreditCardErrorAction({
                  props: mapOperationVirtualCreditCardError(
                    error,
                    VirtualCreditCardActionType.CANCELLATION
                  )
                })
              )
            ),
            finalize(() => {
              void this.modalCtrl.dismiss(
                null,
                null,
                VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID
              );
            })
          )
      )
    )
  );

  reissueVirtualCreditCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.reissueVirtualCreditCardAction),
      switchMap(({ payload }) =>
        this.service
          .reissueVirtualCreditCard(
            mapOperationVirtualCreditCardPayload(payload, 'F')
          )
          .pipe(
            switchMap((response) => {
              return [
                actions.reissueVirtualCreditCardSuccessAction({
                  response,
                  numberProductTCV: payload.numberCreditCard
                }),
                actions.fetchVirtualCreditCardsAction({
                  payload: {
                    acctTypeParent: payload.acctTypeParent,
                    numberProductParent: payload.numberProductParent
                  }
                })
              ];
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                actions.reissueVirtualCreditCardErrorAction({
                  props: mapOperationVirtualCreditCardError(
                    error,
                    VirtualCreditCardActionType.REISSUE
                  )
                })
              )
            ),
            finalize(() => {
              void this.modalCtrl.dismiss(
                null,
                null,
                VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID
              );
            })
          )
      )
    )
  );

  reissueVirtualCreditCardSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.reissueVirtualCreditCardSuccessAction),
        tap(async ({ response, numberProductTCV }) => {
          const modal = await this.modalCtrl.create({
            id: 'virtual-credit-card-reissue-success-modal',
            component: VirtualCreditCardReissueSuccessComponent,
            componentProps: {
              response,
              numberProductTCV
            },
            mode: 'md',
            cssClass: 'avv-custom-full-modal'
          });
          await modal.present();
        })
      ),
    { dispatch: false }
  );

  editVirtualCreditCardEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.editVirtualCreditCardAction),
      switchMap(({ payload }) =>
        this.service
          .editVirtualCreditCard(
            mapOperationVirtualCreditCardPayload(payload, 'M')
          )
          .pipe(
            switchMap((response) => {
              return [
                actions.editVirtualCreditCardSuccessAction({
                  response
                }),
                actions.fetchVirtualCreditCardDetailAction({
                  payload: {
                    acctTypeParent: payload.acctTypeParent,
                    numberProductParent: payload.numberProductParent,
                    numberProductTCV: payload.numberCreditCard
                  },
                  alertSuccess: 'VIRTUAL_CREDIT_CARD.EDIT.EDIT_SUCCESS'
                }),
                actions.fetchVirtualCreditCardsAction({
                  payload: {
                    acctTypeParent: payload.acctTypeParent,
                    numberProductParent: payload.numberProductParent
                  }
                })
              ];
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                actions.editVirtualCreditCardErrorAction({
                  props: mapOperationVirtualCreditCardError(
                    error,
                    VirtualCreditCardActionType.EDIT
                  )
                })
              )
            ),
            finalize(() => {
              void this.modalCtrl.dismiss(
                null,
                null,
                VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID
              );
            })
          )
      )
    )
  );
}
