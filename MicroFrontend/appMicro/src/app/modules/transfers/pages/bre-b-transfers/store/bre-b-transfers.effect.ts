import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import * as actions from './bre-b-transfers.actions';
import { mapFetchAccountAvalKeyError } from '@modules/transfers/pages/transfers-aval-key/mappers/transfers-aval-key.mapper';

import { BRE_B_TRANSFERS } from '@app/commons/constants/navigate.constants';
import { TransfersService } from '@app/modules/transfers/service/transfers.service';
import * as productActions from '@modules/product/store/product.actions';
import {
  mapTransfersError,
  mapTransfersResponse
} from '@app/modules/transfers/mappers/transfers-response.mapper';
import { BreBTransfersService } from '@modules/transfers/pages/bre-b-transfers/services/bre-b-transfers.service';
import { BreBTransfersFacade } from '@modules/transfers/pages/bre-b-transfers/bre-b-transfers.facade';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { TranslateService } from '@ngx-translate/core';
import { GmfService } from '@app/commons/services/gmf/gmf.service';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';
import { environment as ENV } from '@environment';
import {
  mapUpdateSpiContactErrorToast,
  mapUpdateSpiContactSuccessToast
} from '@modules/transfers/pages/bre-b-transfers/mappers/bre-b-transfer.mapper';

declare let utag: any;
@Injectable()
export class BreBTransfersEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private service: BreBTransfersService,
    private transferService: TransfersService,
    private facade: BreBTransfersFacade,
    private gmfService: GmfService
  ) {}

  fetchAccountKeyEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchAccountKeyAction),
      switchMap((action) =>
        this.service.fetchSpiKeyData(action.spiKey).pipe(
          map((spiKey) =>
            actions.fetchAccountKeySuccessAction({ spiKeyData: spiKey })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchAccountKeyErrorAction({
                props: mapFetchAccountAvalKeyError(error)
              })
            )
          )
        )
      )
    )
  );

  transferEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.transferAction),
      switchMap((action) =>
        this.transferService.transfer(action.payload).pipe(
          tap(() => {
            this.callUtag(true);
          }),
          withLatestFrom(this.facade.breBAddSpiContactPayload$),
          mergeMap(([response, addSpiContactPayload]) => {
            return [
              productActions.fetchProductsAction(),
              actions.transferSuccessAction({
                props: mapTransfersResponse(
                  action.payload,
                  response,
                  action.data.voucher,
                  action.payload.transferType
                )
              }),
              ...(addSpiContactPayload
                ? [
                    actions.addSpiContactAction({
                      payload: addSpiContactPayload
                    })
                  ]
                : [])
            ];
          }),
          tap(() => {
            this.navCtrl.navigateRoot(action.data.backUrl);
          }),
          catchError((error: HttpErrorResponse) => {
            this.callUtag(false);
            return of(
              actions.transferErrorAction({
                props: mapTransfersError(error, action.payload.transferType)
              })
            );
          })
        )
      )
    )
  );

  private callUtag(isSuccess: boolean): void {
    const label = `transferencias bre-b - enviar dinero - ${
      isSuccess ? 'exitoso' : 'fallido'
    }`;
    if (ENV.tealium) {
      try {
        (window as any).utag_cfg_ovrd = { noview: true };
        (window as any).utag_data = {};
        utag.track('link', {
          tealium_event: 'event_confirmation',
          event_category: 'transferencias Bre-B',
          event_label: label
        });
      } catch (err) {}
    }
  }

  transferFromSpiChannelEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.initiateTransferFromSpiChannel),
        tap(() => {
          void this.navCtrl.navigateRoot(BRE_B_TRANSFERS);
        })
      ),
    { dispatch: false }
  );

  addSpiContactEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addSpiContactAction),
      switchMap((action) =>
        this.service.addSpiContact(action.payload).pipe(
          map(() =>
            actions.addSpiContactSuccessAction({
              props: {
                type: ToastType.success,
                title: this.translate.instant(
                  'TRANSFERS.BRE_B.ADD_SPI_CONTACT.SUCCESS.TITLE',
                  {
                    contact_name: action.payload.fullName
                  }
                ),
                override: {}
              }
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(actions.addSpiContactErrorAction())
          )
        )
      )
    )
  );

  addSpiContactSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.addSpiContactAction),
        tap(() => this.facade.setAddSpiContactPayload(null))
      ),
    { dispatch: false }
  );

  fetchSpiContactEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchSpiContactAction),
      switchMap((action) =>
        this.service.fetchSpiContact(action.contactKey).pipe(
          map((spiContact) =>
            actions.fetchSpiContactSuccessAction({ spiContact })
          ),
          catchError((error: HttpErrorResponse) =>
            of(actions.fetchSpiContactErrorAction())
          )
        )
      )
    )
  );

  updateSpiContactEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateSpiContactAction),
      switchMap((action) =>
        this.service.updateSpiContact(action.payload).pipe(
          map(() => {
            const payload = action.payload;
            if (payload.isFav) {
              return actions.updateSpiContactSuccessAction({
                props: mapUpdateSpiContactSuccessToast(
                  this.translate.instant(
                    'TRANSFERS.BRE_B.UPDATE_SPI_CONTACT.ADD_TO_FAVORITE.SUCCESS',
                    {
                      contact_alias: action.payload.customName
                    }
                  )
                )
              });
            }
            return actions.updateSpiContactSuccessAction({
              props: mapUpdateSpiContactSuccessToast(
                this.translate.instant(
                  'TRANSFERS.BRE_B.UPDATE_SPI_CONTACT.REMOVE_FROM_FAVORITE.SUCCESS',
                  {
                    contact_alias: payload.contactKey
                  }
                )
              )
            });
          }),
          catchError(() => of(actions.updateSpiContactErrorAction()))
        )
      )
    )
  );

  updateSpiContactSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updateSpiContactSuccessAction),
        tap(() => {
          void this.modalCtrl.dismiss(null, null, 'transfer-success-alert');
        })
      ),
    { dispatch: false }
  );

  fetchGMFDataEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchGMFAction),
      switchMap((action) =>
        this.gmfService.fetchGMF(action.payload).pipe(
          map((gmf: GMFData) => actions.fetchGMFSuccessAction({ gmf })),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchGMFErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
