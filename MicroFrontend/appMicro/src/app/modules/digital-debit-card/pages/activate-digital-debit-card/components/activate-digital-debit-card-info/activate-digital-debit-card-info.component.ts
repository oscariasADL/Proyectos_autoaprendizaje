import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activate-digital-debit-card-info',
  templateUrl: './activate-digital-debit-card-info.component.html',
  styleUrls: ['./activate-digital-debit-card-info.component.sass']
})
export class ActivateDigitalDebitCardInfoComponent {
  @Input() form: FormGroup;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() showFrequentQuestions: EventEmitter<void> =
    new EventEmitter<void>();
}
