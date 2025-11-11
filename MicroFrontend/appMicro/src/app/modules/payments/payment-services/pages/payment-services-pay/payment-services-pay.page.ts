import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { HOME } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  SERVICES_PAY_AVAILABLE_FIELD,
  SERVICES_PAY_BILL_STEPS,
  SERVICES_PAY_EXIT_DATA,
  SERVICES_PAY_STEPS,
  ServicesPaySlide
} from '@modules/payments/payment-services/pages/payment-services-pay/constants/services-pay.constants';
import { servicePayAmountValidators } from '@modules/payments/payment-services/pages/payment-services-pay/helpers/services-pay-validators.helpers';
import {
  mapServicesPayConfirm,
  mapServicesPayVoucher
} from '@modules/payments/payment-services/pages/payment-services-pay/mappers/services-pay-confirm.mapper';
import { mapServicesPayPayload } from '@modules/payments/payment-services/pages/payment-services-pay/mappers/services-pay-payload.mapper';
import { mapServicesPaySlides } from '@modules/payments/payment-services/pages/payment-services-pay/mappers/services-pay-slides.mapper';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-services-pay',
  templateUrl: './payment-services-pay.page.html',
  styleUrls: ['./payment-services-pay.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: ServicesPaySlide.from,
    alternativeSlide: ServicesPaySlide.from
  },
  {
    backUrl: HOME,
    steps: (component: PaymentServicesPayPage) =>
      component.hasBillAmount ? SERVICES_PAY_BILL_STEPS : SERVICES_PAY_STEPS,
    exitData: SERVICES_PAY_EXIT_DATA,
    data: (component: PaymentServicesPayPage) =>
      mapServicesPaySlides(component.form, component.hasBillAmount),
    confirmMapper: mapServicesPayConfirm,
    voucherMapper: mapServicesPayVoucher
  },
  { step: ServicesPaySlide.from, field: SERVICES_PAY_AVAILABLE_FIELD }
)
export class PaymentServicesPayPage
  extends GenericStepperBase
  implements OnInit, OnDestroy
{
  constructor(
    protected injector: Injector,
    private facade: PaymentServicesFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.verifyAmount();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.facade.destroyToast();
  }

  public nextStep(slide: string): void {
    if (slide === 'confirmation') {
      this.facade.showToastMaxAmountWarning('REGISTERED');
    } else {
      this.facade.destroyToast();
    }
    super.nextStep(slide);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [null, [Validators.required]],
      amount: [
        this.billAmount,
        [Validators.required, servicePayAmountValidators.bind(this)]
      ],
      bill: [this.billSelected$.currentValue(), [Validators.required]],
      fee: [null],
      confirmation: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.PaymentBills,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperAction
  public payBill(): void {
    if (this.form.valid) {
      this.facade.payBill(
        mapServicesPayPayload(this.form.value),
        this.alertStepData(),
        true
      );
    }
  }

  private verifyAmount(): void {
    if (this.hasBillAmount) {
      this.data[ServicesPaySlide.from].data.validateAmount = this.billAmount;
      this.cdRef.detectChanges();
    }
  }

  get hasBillAmount(): boolean {
    return !isNullOrUndefined(this.billAmount);
  }

  get billAmount(): number {
    return !isNullOrUndefined(this.billSelected$.currentValue()?.amount)
      ? parseInt(this.billSelected$.currentValue()?.amount, 10)
      : null;
  }

  get billSelected$(): Observable<PaymentBill> {
    return this.facade.billSelected$;
  }
}
