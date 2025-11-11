import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { CREDITS } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import {
  PAY_LOAN_AVAILABLE_FIELD,
  PAY_LOAN_EXIT_DATA,
  PAY_LOAN_STEPS,
  PayLoanSlide
} from '@modules/payments/payment-credits/constants/pay-loan.constants';
import {
  payLoanAccountValidators,
  payLoanAmountValidators
} from '@modules/payments/payment-credits/helpers/pay-loan-validators.helpers';
import {
  mapPayLoanConfirm,
  mapPayLoanVoucher
} from '@modules/payments/payment-credits/mappers/pay-loan-confirm.mapper';
import { mapPayLoanPayload } from '@modules/payments/payment-credits/mappers/pay-loan-payload.mapper';
import { mapPayLoanSlides } from '@modules/payments/payment-credits/mappers/pay-loan-slides.mapper';
import { PaymentCreditsPayBase } from '@modules/payments/payment-credits/pages/payment-credits-pay/payment-credits-pay.base';

@Component({
  selector: 'app-payment-credits-pay',
  templateUrl: './payment-credits-pay.page.html',
  styleUrls: ['./payment-credits-pay.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: PayLoanSlide.from,
    alternativeSlide: PayLoanSlide.amount,
    field: PAY_LOAN_AVAILABLE_FIELD
  },
  {
    backUrl: CREDITS,
    steps: PAY_LOAN_STEPS,
    exitData: PAY_LOAN_EXIT_DATA,
    data: (component: PaymentCreditsPayPage) =>
      mapPayLoanSlides(component.form),
    confirmMapper: mapPayLoanConfirm,
    voucherMapper: mapPayLoanVoucher
  },
  { step: PayLoanSlide.from, field: PAY_LOAN_AVAILABLE_FIELD }
)
export class PaymentCreditsPayPage
  extends PaymentCreditsPayBase
  implements OnInit, OnDestroy
{
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  ngOnDestroy(): void {
    this.genericStepperFacade.resetProductSelected();
    this.facade.setCreditSelected(null);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [
        this.productSelected(),
        [Validators.required, payLoanAccountValidators.bind(this)]
      ],
      credit: [
        this.facade.creditSelected$.currentValue(),
        [Validators.required]
      ],
      amount: [null, [Validators.required, payLoanAmountValidators.bind(this)]],
      activeType: [null],
      paymentType: [null],
      currencyType: [null],
      fee: [null],
      costGmf: [null],
      confirmation: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.PaymentLoanAVVillas,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperGMFPayload
  public gmfPayload(): GMFPayload {
    const { fromProduct, amount } = this.form.value;

    return {
      productNumber: fromProduct.numberProduct,
      productType: fromProduct.type,
      amountTransaction: amount,
      availableBalance: fromProduct.availableBalance
    };
  }

  @GenericStepperAction
  public payLoan(): void {
    if (this.form.valid) {
      this.facade.payLoan(
        mapPayLoanPayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  get paymentType(): AbstractControl {
    return this.form.get('paymentType');
  }
}
