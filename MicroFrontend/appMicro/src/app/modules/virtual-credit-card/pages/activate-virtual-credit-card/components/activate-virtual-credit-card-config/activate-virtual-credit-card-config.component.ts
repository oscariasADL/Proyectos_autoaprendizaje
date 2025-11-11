import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivateVirtualCreditCardForm } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { ACTIVATE_TCV_CONFIG } from '../../constants/activate-virtual-credit-card.constants';

@Component({
  selector: 'app-activate-virtual-credit-card-config',
  templateUrl: './activate-virtual-credit-card-config.component.html',
  styleUrls: ['./activate-virtual-credit-card-config.component.sass']
})
export class ActivateVirtualCreditCardConfigComponent {
  @Input() form: FormGroup<ActivateVirtualCreditCardForm>;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  public readonly ACTIVATE_TCV_CONFIG = ACTIVATE_TCV_CONFIG;
  get amount(): AbstractControl<string> {
    return this.form.get('amount');
  }
}
