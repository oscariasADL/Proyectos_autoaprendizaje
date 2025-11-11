import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-debit-purchase-toward',
  templateUrl: './debit-purchase-toward.component.html',
  styleUrls: ['./debit-purchase-toward.component.sass']
})
export class DebitPurchaseTowardComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('bank', this.form.get('bank'));
    this.formGroup.addControl('account', this.form.get('account'));
  }

  get banksList(): any[] {
    return this.form.get('banksList').value;
  }

  get fromProduct(): FormControl {
    return this.form.get('fromProduct');
  }

  get bank(): AbstractControl {
    return this.form.get('bank');
  }

  get account(): AbstractControl {
    return this.form.get('account');
  }
}
