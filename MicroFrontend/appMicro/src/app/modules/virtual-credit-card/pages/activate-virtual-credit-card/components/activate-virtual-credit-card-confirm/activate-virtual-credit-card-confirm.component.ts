import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ACTIVATE_TCV_CONFIRM } from '../../constants/activate-virtual-credit-card.constants';

@Component({
  selector: 'app-activate-virtual-credit-card-confirm',
  templateUrl: './activate-virtual-credit-card-confirm.component.html',
  styleUrls: ['./activate-virtual-credit-card-confirm.component.sass']
})
export class ActivateVirtualCreditCardConfirmComponent {
  public readonly ACTIVATE_TCV_CONFIRM = ACTIVATE_TCV_CONFIRM;
  @Input() form: FormGroup;
  @Output() activate: EventEmitter<void> = new EventEmitter<void>();
  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();

  get amount(): AbstractControl<number> {
    return this.form.get('amount');
  }
}
