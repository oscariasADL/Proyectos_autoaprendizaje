import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { TypeProduct } from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransfiyaPayload } from '@modules/transfers/entities/transfers.interface';
import { select } from '@ngrx/store';
import * as notificationsActions from '@store/actions/notifications.action';
import { transfiyaNotificationsByIdSelector } from '@store/selectors/notifications.selector';
import { Observable } from 'rxjs';
import { productsSelector } from '../product/store/product.selector';

@Injectable()
export class TransfiyaManagementFacade extends AppFacade {
  public products$: Observable<Product[]> = this.store.pipe(
    select(productsSelector(), {
      typeProduct: TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS,
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    })
  );

  public getTransfiyaNotificationById$(
    id: number
  ): Observable<TransfiyaAuthorizationItem> {
    return this.store.pipe(select(transfiyaNotificationsByIdSelector(), id));
  }

  public acceptTransfiyaAuthorization(
    payload: TransfiyaPayload,
    data: AlertStepData,
    isRequest: boolean
  ): void {
    this.store.dispatch(
      notificationsActions.acceptTransfiyaAuthorizationAction({
        payload,
        data,
        isRequest
      })
    );
  }

  public rejectTransfiyaAuthorization(
    payload: TransfiyaPayload,
    data: AlertStepData,
    isRequest: boolean
  ): void {
    this.store.dispatch(
      notificationsActions.rejectTransfiyaAuthorizationAction({
        payload,
        data,
        isRequest
      })
    );
  }
}
