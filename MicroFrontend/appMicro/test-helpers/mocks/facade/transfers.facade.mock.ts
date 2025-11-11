import { Injectable } from '@angular/core';
import { Product } from '@app/commons/entities/product/product.interface';
import { CheckCustomerResult } from '@app/modules/transfers/pages/transfers-remittances/interfaces/remittance-services.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransferPayload } from '@modules/transfers/entities/transfers.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { from, of } from 'rxjs';

@Injectable()
export class TransfersFacadeMock extends AppFacadeMock {
  public transfer(
    payload: TransferPayload,
    data: AlertStepData,
    message: string
  ): void {}
  public handleCustomerFlow(
    customerResult: CheckCustomerResult,
    product: Product
  ): void {}
  public readonly remittanceLoading$: Observable<boolean> = of(false);

  public readonly remittanceResult$: Observable<CheckCustomerResult | null> =
    of(null);

  public readonly remittanceError$: Observable<any> = of(null);
  public transferRemittance(): void {}
}
