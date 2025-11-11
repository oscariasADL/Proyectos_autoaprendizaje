import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { BANK_GROUP } from '@commons/constants/card.constants';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { PAY_LOAN_VILLAS } from '@modules/payments/payment-credits/constants/pay-loan.constants';
import {
  CurrencyType,
  PayLoanAmountType
} from '@modules/payments/payment-credits/entities/pay-loan.interface';
import {
  DetailTypePayment,
  PaymentCredit
} from '@modules/payments/payment-credits/entities/payment-credits.interface';

@Component({
  selector: 'app-pay-loan-amount',
  templateUrl: './pay-loan-amount.component.html',
  styleUrls: ['./pay-loan-amount.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayLoanAmountComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() control: UntypedFormControl;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public title: string;
  public isVillas: boolean;
  public isCredit: boolean;
  public isOccidente: boolean;
  public credit: PaymentCredit;
  public formGroup: UntypedFormGroup;
  public activeType: PayLoanAmountType;
  public activeCurrencyType: CurrencyType = CurrencyType.COP;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.credit = this.form.value.credit;
    this.isVillas = PAY_LOAN_VILLAS.includes(this.credit.typePayment);

    this.isOccidente =
      this.credit.bankCode === BANK_GROUP.OCCIDENTE_CODE &&
      (this.credit.typePayment === DetailTypePayment.CREDIT_CARD_OTHERS ||
        this.credit.typePayment === DetailTypePayment.CREDIT_CARD_CONTACTS);

    this.isCredit =
      this.credit.typePayment === DetailTypePayment.AVAL_CREDITS_VILLAS;

    this.title = `PAYMENTS.PAY_LOAN.AMOUNT_STEP.TITLE_${
      this.isVillas ? 'PRIMARY' : 'SECONDARY'
    }`;

    this.initForm();
  }

  public setActiveType(type: PayLoanAmountType): void {
    this.setPayLoanAmountType(type);

    switch (this.activeType) {
      case PayLoanAmountType.minPayment:
        this.amount.reset();
        this.amount.setValue(this.credit.minPaymentAmount);
        break;
      case PayLoanAmountType.minReduced:
        this.amount.reset();
        this.amount.setValue(this.credit.minPaymentReducedAmount);
        break;
      case PayLoanAmountType.totalValue:
        this.amount.reset();
        this.amount.setValue(this.credit.totalPaymentAmount);
        break;
      case PayLoanAmountType.otherValue:
        this.amount.reset();
        break;
    }
    this.amount.updateValueAndValidity();
  }

  public setActiveCurrencyType(type: CurrencyType): void {
    this.activeCurrencyType = type;
    this.form.controls.currencyType.setValue(this.activeCurrencyType);
    this.form.controls.currencyType.updateValueAndValidity();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('amount', this.control);

    if (this.isOccidente) {
      this.form.controls.currencyType.setValidators(Validators.required);
      this.formGroup.addControl(
        'currencyType',
        this.form.controls.currencyType
      );
      if (!isNullOrUndefined(this.form.controls.currencyType?.value)) {
        this.setActiveCurrencyType(this.form.controls.currencyType?.value);
      }
    }

    this.verifyControlStatus();
  }

  private setPayLoanAmountType(type: PayLoanAmountType): void {
    this.activeType = type;
    this.form.controls.activeType.setValue(this.activeType);
  }

  private verifyControlStatus(): void {
    if (!isNullOrUndefined(this.control?.value)) {
      switch (sanitizeCurrency(this.control?.value)) {
        case this.credit.minPaymentAmount:
          this.setPayLoanAmountType(PayLoanAmountType.minPayment);
          break;
        case this.credit.minPaymentReducedAmount:
          this.setPayLoanAmountType(PayLoanAmountType.minReduced);
          break;
        case this.credit.totalPaymentAmount:
          this.setPayLoanAmountType(PayLoanAmountType.totalValue);
          break;
        default:
          this.setPayLoanAmountType(PayLoanAmountType.otherValue);
      }
    }
  }

  get hasErrors(): boolean {
    return (
      !isNullOrUndefined(this.amount.errors) &&
      !this.amount.errors?.hasOwnProperty('required')
    );
  }

  get showNotice(): boolean {
    return (
      sanitizeCurrency(this.amount.value) > 0 &&
      sanitizeCurrency(this.amount.value) < this.credit.minPaymentAmount &&
      !this.isCredit
    );
  }

  get currencyType(): AbstractControl {
    return this.formGroup.get('currencyType');
  }

  get amount(): AbstractControl {
    return this.formGroup.get('amount');
  }

  get currentType(): typeof CurrencyType {
    return CurrencyType;
  }

  get payLoanAmountType(): typeof PayLoanAmountType {
    return PayLoanAmountType;
  }
}
