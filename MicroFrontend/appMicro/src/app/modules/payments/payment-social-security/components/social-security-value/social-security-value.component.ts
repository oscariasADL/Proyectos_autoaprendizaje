import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SOCIAL_SECURITY_MONTH_LIST } from '@modules/payments/payment-social-security/constants/social-security-date.constants';
import { Contributor } from '@modules/payments/payment-social-security/entities/social-security.interface';
import { getMonth, getYear, parseISO } from 'date-fns';

@Component({
  selector: 'app-social-security-value',
  templateUrl: './social-security-value.component.html',
  styleUrls: ['./social-security-value.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialSecurityValueComponent {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  get worksheetDate(): { year: string; month: string } {
    const worksheetDate = this.formValue.worksheetDate;
    return {
      year: getYear(parseISO(worksheetDate)).toString(),
      month: SOCIAL_SECURITY_MONTH_LIST[getMonth(parseISO(worksheetDate))]
    };
  }

  get amount(): number {
    return this.formValue?.value?.amount;
  }

  get worksheetNumber(): number {
    return this.formValue?.worksheetNumber;
  }

  get contributor(): Contributor {
    return this.formValue?.contributor;
  }

  get worksheet(): string {
    return this.formValue?.worksheet?.label;
  }

  get formValue(): any {
    return this.form.value;
  }
}
