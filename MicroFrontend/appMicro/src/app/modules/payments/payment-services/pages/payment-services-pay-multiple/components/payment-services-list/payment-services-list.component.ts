import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { MAX_SELECTION_SERVICES } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/constants/services-pay-multiple.constants';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';

@Component({
  selector: 'app-payment-services-list',
  templateUrl: './payment-services-list.component.html',
  styleUrls: ['./payment-services-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentServicesListComponent {
  @Input() form: FormGroup;
  @Input() paymentBillsControl: FormArray;
  @Input() informationText: string;
  @Input() services: PaymentBill[];

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() showInformation: EventEmitter<void> = new EventEmitter<void>();

  public readonly MAX_SELECTION_SERVICES = MAX_SELECTION_SERVICES;

  public changeSelection(): void {
    const countBillsSelected = this.paymentBillsControl.controls.reduce(
      (acc, bill) => (bill.value ? acc + 1 : acc),
      0
    );
    this.countBillSelection.setValue(countBillsSelected);

    if (countBillsSelected >= this.MAX_SELECTION_SERVICES) {
      this.paymentBillsControl.controls.forEach((control) => {
        if (!control.value) {
          control.disable();
        }
      });
    } else {
      this.paymentBillsControl.controls.forEach((control) => {
        control.enable();
      });
    }
  }

  public continueAction(): void {
    this.totalAmount.setValue(this.totalValueToPay);
    const selectedBills: PaymentBill[] = [];
    this.paymentBillsControl.controls.forEach((control, index) => {
      if (control.value) {
        selectedBills.push(this.services[index]);
      }
    });
    this.selectedBills.setValue(selectedBills);
    this.continue.emit();
  }

  get countBillSelection(): AbstractControl {
    return this.form.get('countBillSelection');
  }

  get totalAmount(): AbstractControl {
    return this.form.get('totalAmount');
  }

  get selectedBills(): AbstractControl {
    return this.form.get('selectedBills');
  }

  get totalValueToPay(): number {
    return this.paymentBillsControl.controls.reduce(
      (acc, bill, currentIndex) =>
        bill.value ? acc + Number(this.services[currentIndex].amount) : acc,
      0
    );
  }
}
