import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import * as createPocketWithReturnsActions from './create-pocket-with-returns.action';
import { PocketsService } from '@app/modules/pockets/services/pockets.service';
import { mapPocketCreateError } from '../../pocket-create/mappers/pocket-create-response.mapper';
import { POCKETS } from '@app/commons/constants/navigate.constants';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import { PocketCreateVoucherComponent } from '@modules/pockets/components/pocket-create-voucher/pocket-create-voucher.component';
import { PocketCreateVoucherProps } from '@modules/pockets/entities/pockets.interface';
import { ModalController } from '@commons/controllers/modal.controller';

@Injectable()
export class CreatePocketEffects {
  constructor(
    private navCtrl: NavController,
    private actions$: Actions,
    private service: PocketsService,
    private modalCtrl: ModalController
  ) {}

  CreatePocketEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(createPocketWithReturnsActions.CreatePocketAction),
      switchMap((action) =>
        this.service.createPocketWithReturns(action.payload).pipe(
          mergeMap((response) => [
            pocketsActions.fetchPocketsAction(),
            createPocketWithReturnsActions.CreatePocketSuccessAction({
              items: action.data.voucher,
              response
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              createPocketWithReturnsActions.CreatePocketErrorAction({
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
        ofType(createPocketWithReturnsActions.CreatePocketSuccessAction),
        switchMap(({ response, items }) =>
          defer(async () => {
            void this.navCtrl.navigateBack(POCKETS, { replaceUrl: true });
            const modal = await this.modalCtrl.create({
              id: 'pocket-create-voucher-modal',
              component: PocketCreateVoucherComponent,
              componentProps: <Partial<PocketCreateVoucherProps>>{
                title: 'POCKET_WITH_RETURNS.CREATE.SUCCESSFUL_RESPONSE',
                description: 'POCKETS.CREATE.DESCRIPTIONS.WITH_RETURNS',
                approvalId: response.approvalId,
                voucherItems: items,
                noticeMessage: 'POCKETS.CREATE.NOTICE_MESSAGE.WITH_RETURNS'
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
