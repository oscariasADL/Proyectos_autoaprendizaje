import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransferPayload } from '@modules/transfers/entities/transfers.interface';
import { transferAction } from '@modules/transfers/store/transfers.actions';
import * as RemittanceActions from './store/transfers.actions';
import * as RemittanceSelectors from './store/transfers.selector';
import { CheckCustomerResult } from './pages/transfers-remittances/interfaces/remittance-services.interface';
import { Observable } from 'rxjs';
import { Product } from '@app/commons/entities/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class TransfersFacade extends AppFacade {
  public transfer(payload: TransferPayload, data: AlertStepData): void {
    this.store.dispatch(transferAction({ payload, data }));
  }

  public transferRemittance(): void {
    this.store.dispatch(RemittanceActions.remittanceAction());
  }

  public readonly remittanceLoading$: Observable<boolean> = this.store.select(
    RemittanceSelectors.selectRemittanceLoading
  );

  public readonly remittanceResult$: Observable<CheckCustomerResult | null> =
    this.store.select(RemittanceSelectors.selectRemittanceResult);

  public readonly remittanceError$: Observable<any> = this.store.select(
    RemittanceSelectors.selectRemittanceError
  );

  public handleCustomerFlow(
    customerResult: CheckCustomerResult,
    product: Product
  ): void {
    this.store.dispatch(
      RemittanceActions.handleCustomerFlowAction({ customerResult, product })
    );
  }
}
