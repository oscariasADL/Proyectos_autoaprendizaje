import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import * as productActions from '@modules/product/store/product.actions';
import {
  mapTransfersError,
  mapTransfersResponse
} from '@modules/transfers/mappers/transfers-response.mapper';
import { TransfersService } from '@modules/transfers/service/transfers.service';
import * as actions from '@modules/transfers/store/transfers.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RemittanceService } from '../service/remittance-services.service';
import { REMITTANCES_LINK_ALERT_PROPS } from '../pages/transfers-remittances/constants/alerts';
import { CustomerRemittancesType } from '../pages/transfers-remittances/interfaces/remittance-services.interface';
import { TranslateService } from '@ngx-translate/core';
import { environment as ENV } from '@environment';
import { TransfersFacade } from '../transfers.facade';
@Injectable({
  providedIn: 'root'
})
export class TransfersEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: TransfersService,
    private remittanceService: RemittanceService,
    private translate: TranslateService,
    private facade: TransfersFacade
  ) {}

  transferEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.transferAction),
      switchMap((action) =>
        this.service.transfer(action.payload).pipe(
          mergeMap((response: GenericResponse) => [
            productActions.fetchProductsAction(),
            actions.transferSuccessAction({
              props: mapTransfersResponse(
                action.payload,
                response,
                action.data.voucher,
                action.payload.transferType
              )
            })
          ]),
          tap(() => {
            this.navCtrl.navigateRoot(action.data.backUrl);
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.transferErrorAction({
                props: mapTransfersError(error, action.payload.transferType)
              })
            )
          )
        )
      )
    )
  );

  transferRemittanceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.remittanceAction),
      mergeMap(() =>
        this.remittanceService.validateCustomer().pipe(
          map((result) => actions.remittanceSuccessAction({ result })),
          tap(console.log),
          catchError((error) => of(actions.remittanceErrorAction({ error })))
        )
      )
    )
  );
  handleCustomerFlowEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.handleCustomerFlowAction),
      mergeMap(({ customerResult, product }) => {
        if (customerResult.customer === CustomerRemittancesType.A) {
          return this.translate
            .get('TRANSFERS.REMITTANCES.INFO_ALERT.NOTIFICATION_DESCRIPTION', {
              phoneNumber: customerResult.infoAccount.cellphone
            })
            .pipe(
              switchMap(() =>
                this.remittanceService.validateCustomer().pipe(
                  map((result) =>
                    actions.handleCustomerFlowSuccessAction({ result })
                  ),
                  catchError((error) =>
                    of(actions.handleCustomerFlowErrorAction({ error }))
                  )
                )
              )
            );
        }

        return this.translate
          .get('TRANSFERS.REMITTANCES.INFO_ALERT.NOTIFICATION_DESCRIPTION', {
            phoneNumber: customerResult.infoAccount.cellphone
          })
          .pipe(
            tap((text) => {
              this.facade.openExternalLinks(
                `${ENV.remittancesActionsValues}${customerResult.tokenInfo.accessToken}`,
                '_blank',
                {
                  ...REMITTANCES_LINK_ALERT_PROPS,
                  notificationDescription: text
                },
                null,
                customerResult.customer === CustomerRemittancesType.P
                  ? null
                  : this.remittanceService.createCustomer({
                      typeAccount: product.type,
                      numberAccount: product.numberProduct
                    })
              );
            }),
            map(() =>
              actions.handleCustomerFlowSuccessAction({
                result: customerResult
              })
            ),
            catchError((error) =>
              of(actions.handleCustomerFlowErrorAction({ error }))
            )
          );
      })
    )
  );
}
