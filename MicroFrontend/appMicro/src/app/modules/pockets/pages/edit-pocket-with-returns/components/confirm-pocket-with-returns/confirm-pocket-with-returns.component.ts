import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  EditPocketWithReturns,
  EditPocketWithReturnsForm
} from '../../entities/edit-pocket-with-returns.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';

@Component({
  selector: 'app-confirm-pocket-with-returns',
  templateUrl: './confirm-pocket-with-returns.component.html',
  styleUrls: ['./confirm-pocket-with-returns.component.sass']
})
export class ConfirmPocketWithReturnsComponent implements OnInit {
  @Input() form: FormGroup<EditPocketWithReturnsForm>;
  @Input() installments: number;

  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  public editPocketWithReturns: EditPocketWithReturns;

  ngOnInit() {
    this.editPocketWithReturns = {
      name: this.form.get('name').value,
      quota: this.form.get('quota').value,
      goal: this.form.get('goal').value,
      category: this.form.get('category').value,
      period: this.form.get('period').value,
      pocket: this.form.get('pocket').value
    };
  }

  public sanitizeCurrency(value: string) {
    return sanitizeCurrency(value);
  }
}
