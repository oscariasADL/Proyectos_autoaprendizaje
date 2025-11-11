import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NavController } from '@ionic/angular';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from './customize-aval-tag.actions';
import { fetchProductSpiUserKeysAction } from '@modules/product/store/product.actions';
import { CustomizeAvalTagService } from '@modules/product-options/customize-aval-tag/services/customize-aval-tag.service';
import { ErrorResponse } from '@commons/entities/response/response.interface';
import { AlertService } from '@commons/services/alert.service';
import { mapCustomizeAvalTagError } from '@modules/product-options/customize-aval-tag/mappers/customize-aval-tag.mapper';
import { ModalController } from '@commons/controllers/modal.controller';
import { CustomizeAvalTagModalErrorComponent } from '@modules/product-options/customize-aval-tag/components/customize-aval-tag-modal-error/customize-aval-tag-modal-error.component';
import {
  getRandomKeyAction,
  getRandomKeyFailure,
  getRandomKeySuccess
} from './customize-aval-tag.actions';
import { RandomKeyService } from '../services/random-key.service';
import { SPI_MF } from '@app/commons/constants/navigate.constants';
import { CustomizeAvalTagModalConfirmComponent } from '../components/customize-aval-tag-modal-confirm/customize-aval-tag-modal-confirm.component';
import { getProductType } from '@app/modules/product/helpers/product.helper';

@Injectable()
export class CustomizeAvalTagEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: CustomizeAvalTagService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private randomKeyService: RandomKeyService
  ) {}

  modifyAvalTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.modifyAvalTagAction),
      switchMap(({ payload }) =>
        this.service.modifyAvalTag(payload).pipe(
          switchMap((response) => {
            return of(
              fetchProductSpiUserKeysAction(),
              actions.modifyAvalTagSuccessAction({ response, payload })
            );
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.modifyAvalTagErrorAction({
                error,
                payload
              })
            )
          )
        )
      )
    )
  );
  modifyAvalTagSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.modifyAvalTagSuccessAction),
        tap(async ({ response, payload }) => {
          this.navCtrl.back();
          const modal = await this.modalCtrl.create({
            id: 'customize-aval-tag-confirm-modal',
            component: CustomizeAvalTagModalConfirmComponent,
            componentProps: {
              id: 'customize-aval-tag-confirm-modal',
              avalTag: payload.newKeyId.slice(1),
              product: `Cta. ${getProductType({
                type: payload.accountType
              })} No. ${payload.accountId}`
            },
            cssClass: 'avv-custom-modal'
          });
          await modal.present();
          modal.onWillDismiss().then((response) => {
            if (response.data) {
              this.navCtrl.navigateForward(SPI_MF);
            }
          });
        })
      ),
    { dispatch: false }
  );

  modifyAvalTagError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.modifyAvalTagErrorAction),
        tap(async ({ payload, error }) => {
          const errorBody: ErrorResponse = error?.error;
          if (errorBody && errorBody?.code === '5') {
            this.modalCtrl
              .create({
                id: 'customize-aval-tag-modal-error',
                component: CustomizeAvalTagModalErrorComponent,
                componentProps: {
                  avalTag: payload.newKeyId.slice(1)
                },
                mode: 'md',
                cssClass: 'avv-custom-modal'
              })
              .then((mod) => mod.present());
            return;
          }
          void this.alertService.create(mapCustomizeAvalTagError(error));
        })
      ),
    { dispatch: false }
  );

  getRandomKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRandomKeyAction),
      switchMap(({ payload }) =>
        this.randomKeyService.getRandomKey(payload).pipe(
          map((response) => getRandomKeySuccess({ response })),
          catchError((error) => of(getRandomKeyFailure({ error })))
        )
      )
    )
  );
}
