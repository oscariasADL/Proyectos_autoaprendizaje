import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { GroupedCreditMovements } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';

@Component({
  selector: 'app-update-installments-list',
  templateUrl: './update-installments-list.component.html',
  styleUrls: ['./update-installments-list.component.sass']
})
export class UpdateInstallmentsListComponent {
  @Input() form: FormGroup;
  @Input() control: FormControl;
  @Input() movements: GroupedCreditMovements[];

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() showInformation: EventEmitter<void> = new EventEmitter<void>();

  public selectMovement(movement: CreditMovement): void {
    this.control.setValue(movement);
    this.control.markAsDirty();
    this.continue.emit();
  }
}
