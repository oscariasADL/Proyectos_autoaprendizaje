import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import {
  mapPocketCreateError,
  mapPocketCreateResponse
} from '@modules/pockets/pages/pocket-create/mappers/pocket-create-response.mapper';
import * as actions from '@modules/pockets/pages/pocket-create/store/pocket-create.actions';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { POCKETS } from '@commons/constants/navigate.constants';
import { ModalController } from '@commons/controllers/modal.controller';
import { PocketCreateVoucherComponent } from '@modules/pockets/components/pocket-create-voucher/pocket-create-voucher.component';
import { PocketCreateVoucherProps } from '@modules/pockets/entities/pockets.interface';

@Injectable()
export class PocketCreateEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PocketsService,
    private modalCtrl: ModalController
  ) {}

  pocketCreateEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pocketCreateAction),
      switchMap((action) =>
        this.service.createPocket(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            pocketsActions.fetchPocketsAction(),
            actions.pocketCreateSuccessAction({
              items: action.data.voucher,
              response
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pocketCreateErrorAction({
                props: mapPocketCreateError(error)
              })
            )
          )
        )
      )
    )
  );

  pocketCreateSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.pocketCreateSuccessAction),
        switchMap(({ response, items }) =>
          defer(async () => {
            void this.navCtrl.navigateBack(POCKETS, { replaceUrl: true });
            const modal = await this.modalCtrl.create({
              id: 'pocket-create-voucher-modal',
              component: PocketCreateVoucherComponent,
              componentProps: <Partial<PocketCreateVoucherProps>>{
                title: 'POCKETS.CREATE.SUCCESS',
                description: null,
                approvalId: response.approvalId,
                voucherItems: items,
                noticeMessage: null
              },
              mode: 'md',
              cssClass: 'avv-custom-full-modal'
            });
            await modal.present();
            return null;
          })
        )
      ),
    { dispatch: false }
  );
}
