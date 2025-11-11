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
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { PAY_LOAN_PAYMENT_TYPE_LIST } from '@modules/payments/payment-credits/constants/pay-loan.constants';
import {
  PayLoanPaymentType,
  PayLoanPaymentTypeItem
} from '@modules/payments/payment-credits/entities/pay-loan.interface';

@Component({
  selector: 'app-pay-loan-type',
  templateUrl: './pay-loan-type.component.html',
  styleUrls: ['./pay-loan-type.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayLoanTypeComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() control: UntypedFormControl;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public isCredit: boolean;
  public amount: number;
  public payLoanPaymentTypeList: PayLoanPaymentTypeItem[] =
    PAY_LOAN_PAYMENT_TYPE_LIST;

  ngOnInit(): void {
    this.initType();
    this.amount = sanitizeCurrency(this.form.value.amount);
  }

  public setActiveType(type: PayLoanPaymentType): void {
    this.paymentType.setValue(type);
    this.paymentType.updateValueAndValidity();
  }

  public setExtraordinaryPayment(): void {
    if (!this.isExtraordinaryPayment) {
      this.setActiveType(PayLoanPaymentType.quota);
    }
  }

  private initType(): void {
    if (isNullOrUndefined(this.paymentType.value)) {
      this.setActiveType(PayLoanPaymentType.normal);
    }
  }

  get isExtraordinaryPayment(): boolean {
    return (
      this.paymentType.value === this.payLoanPaymentType.quota ||
      this.paymentType.value === this.payLoanPaymentType.term
    );
  }

  get paymentType(): AbstractControl {
    return this.form.get('paymentType');
  }

  get payLoanPaymentType(): typeof PayLoanPaymentType {
    return PayLoanPaymentType;
  }
}
