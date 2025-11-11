import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { State } from '@store/state/state';
import { Observable } from 'rxjs';

import { AppFacade } from '@app/app.facade';
import {
  PayBillPayload,
  PaymentBill,
  PaymentServiceScheduleCreatePayload,
  PaymentServicesResponse
} from '@modules/payments/payment-services/entities/payment-services.interface';
import * as paymentsActions from '@modules/payments/payment-services/store/payment-services.actions';
import {
  billScheduledPayload,
  billSelectedSelector,
  hasPaymentServicesSelector,
  paymentServicesCompletedSelector,
  paymentServicesSelector,
  paymentServicesWorkingSelector,
  referenceInfoSelector,
  searchCompletedCategorySelector,
  searchCompletedSelector,
  searchHasErrorMessageSelector,
  searchListSelector,
  searchNotFoundSelector,
  searchWorkingCategorySelector,
  searchWorkingSelector
} from '@modules/payments/payment-services/store/payment-services.selector';
import {
  hasBalanceSelector,
  productsSelectorV2
} from '@modules/product/store/product.selector';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  SearchBillReferencePayload,
  SearchBillReferenceResponse,
  ServiceData
} from './entities/register-service.interface';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { ToastService } from '@commons/services/toast.service';
import { TypeAccount } from '@commons/entities/product/type-account';
import { Product } from '@commons/entities/product/product.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { PayBillsMultiplePayload } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';

@Injectable()
export class PaymentServicesFacade extends AppFacade {
  public services$: Observable<PaymentServicesResponse> = this.store.pipe(
    select(paymentServicesSelector)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(paymentServicesWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(paymentServicesCompletedSelector)
  );

  public hasServices$: Observable<boolean> = this.store.pipe(
    select(hasPaymentServicesSelector)
  );

  public billSelected$: Observable<PaymentBill> = this.store.pipe(
    select(billSelectedSelector)
  );

  public hasProducts$: Observable<boolean> = this.store.pipe(
    select(hasBalanceSelector)
  );

  public categorylist$: Observable<ServiceData[]> = this.store.pipe(
    select(searchListSelector)
  );

  public searchCompleted$: Observable<boolean> = this.store.pipe(
    select(searchCompletedSelector)
  );

  public searchCompletedCategory$: Observable<boolean> = this.store.pipe(
    select(searchCompletedCategorySelector)
  );

  public searchWorkingCategory$: Observable<boolean> = this.store.pipe(
    select(searchWorkingCategorySelector)
  );

  public searchWorkingSelector$: Observable<boolean> = this.store.pipe(
    select(searchWorkingSelector)
  );

  public notFound$: Observable<boolean> = this.store.pipe(
    select(searchNotFoundSelector)
  );
  public hasErrorMessage$: Observable<string> = this.store.pipe(
    select(searchHasErrorMessageSelector)
  );

  public referenceInfo$: Observable<SearchBillReferenceResponse> =
    this.store.pipe(select(referenceInfoSelector));

  public products$: Observable<Product[]> = this.store.pipe(
    select(
      productsSelectorV2({
        typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
      })
    )
  );

  public billScheduledPayload$: Observable<PaymentServiceScheduleCreatePayload> =
    this.store.pipe(select(billScheduledPayload));

  constructor(
    protected store: Store<State>,
    protected injector: Injector,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    super(store, injector);
  }

  public fetchServices(): void {
    this.store.dispatch(paymentsActions.fetchPaymentServicesAction());
  }

  public setBill(bill: PaymentBill): void {
    this.store.dispatch(paymentsActions.setBillAction({ bill }));
  }

  public payBill(
    payload: PayBillPayload,
    data: AlertStepData,
    isRegistered: boolean
  ): void {
    this.store.dispatch(
      paymentsActions.payBillAction({ payload, data, isRegistered })
    );
  }

  public payBillsMultiple(
    payload: PayBillsMultiplePayload,
    data: AlertStepData
  ): void {
    this.store.dispatch(
      paymentsActions.payBillsMultipleAction({ payload, data })
    );
  }

  public searchCategory(query: string): void {
    this.store.dispatch(paymentsActions.searchCategory({ query }));
  }

  public searchBillReference(payload: SearchBillReferencePayload): void {
    this.store.dispatch(paymentsActions.searchBillReference({ payload }));
  }

  public searchBillReferenceClean(): void {
    this.store.dispatch(paymentsActions.searchBillReferenceClean());
  }

  public searchCategoryClean(): void {
    this.store.dispatch(paymentsActions.searchCategoryClean());
  }

  public getPaymentMaxAmount(key: string) {
    return new Intl.NumberFormat('es-CO').format(this.boundsByKey(key));
  }

  public showToastMaxAmountWarning(key: string): void {
    this.toastService.clear();
    this.toastService.create({
      title: this.translate.instant('PAYMENTS.MAX_AMOUNT.' + key, {
        max_amount: this.getPaymentMaxAmount(
          key === 'UNREGISTERED'
            ? 'payment_service_amount_max$'
            : 'payment_registered_service_amount_max$'
        )
      }),
      type: ToastType.warning
    });
  }

  public destroyToast(): void {
    this.toastService.clear();
  }

  public setBillSchedulingPayload(
    payload: PaymentServiceScheduleCreatePayload
  ): void {
    this.store.dispatch(
      paymentsActions.setBillSchedulingPayloadAction({ payload })
    );
  }

  public createBillScheduling(data: VoucherItem[]): void {
    this.store.dispatch(paymentsActions.createBillSchedulingAction({ data }));
  }

  public editBillScheduling(data: VoucherItem[]): void {
    this.store.dispatch(paymentsActions.editBillSchedulingAction({ data }));
  }

  public deleteBillScheduling(data: VoucherItem[]): void {
    this.store.dispatch(paymentsActions.deleteBillSchedulingAction({ data }));
  }
}
