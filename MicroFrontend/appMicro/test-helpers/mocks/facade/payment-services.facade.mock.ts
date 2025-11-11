import { Injectable } from '@angular/core';
import {
  PayBillPayload,
  PaymentBill,
  PaymentServiceScheduleCreatePayload,
  PaymentServicesResponse
} from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  SearchBillReferencePayload,
  SearchBillReferenceResponse,
  ServiceData
} from '@modules/payments/payment-services/entities/register-service.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '@commons/entities/product/product.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { PayBillsMultiplePayload } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';
import * as paymentsActions from '@modules/payments/payment-services/store/payment-services.actions';

@Injectable()
export class PaymentServicesFacadeMock extends AppFacadeMock {
  public services$: Observable<PaymentServicesResponse> = new BehaviorSubject(
    null
  );

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(false);

  public hasServices$: Observable<boolean> = new BehaviorSubject(false);

  public billSelected$: Observable<PaymentBill> = new BehaviorSubject(
    new PaymentBillFactory().create()
  );

  public hasProducts$: Observable<boolean> = new BehaviorSubject(false);

  public categorylist$: Observable<ServiceData[]> = new BehaviorSubject([]);

  public searchCompleted$: Observable<boolean> = new BehaviorSubject(true);

  public searchCompletedCategory$: Observable<boolean> = new BehaviorSubject(
    true
  );

  public searchWorkingCategory$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public searchWorkingSelector$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public notFound$: Observable<boolean> = new BehaviorSubject(null);

  public hasErrorMessage$: Observable<string> = new BehaviorSubject(null);

  public referenceInfo$: Observable<SearchBillReferenceResponse> =
    new BehaviorSubject(
      new PaymentBillFactory().buildSearchBillReferenceResponse()
    );

  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public billScheduledPayload$: Observable<PaymentServiceScheduleCreatePayload> =
    new BehaviorSubject(null);

  public fetchServices(): void {}

  public setBill(bill: PaymentBill): void {}

  public payBill(
    payload: PayBillPayload,
    data: AlertStepData,
    isRegistered: boolean
  ): void {}

  public payBillsMultiple(
    payload: PayBillsMultiplePayload,
    data: AlertStepData
  ): void {}

  public searchCategory(query: string): void {}

  public searchBillReference(payload: SearchBillReferencePayload): void {}

  public searchBillReferenceClean(): void {}

  public searchCategoryClean(): void {}

  public showToastMaxAmountWarning(key: string): void {}

  public setBillSchedulingPayload(
    payload: PaymentServiceScheduleCreatePayload
  ): void {}

  public createBillScheduling(data: VoucherItem[]): void {}

  public editBillScheduling(data: VoucherItem[]): void {}

  public deleteBillScheduling(data: VoucherItem[]): void {}

  public destroyToast(): void {}
}
