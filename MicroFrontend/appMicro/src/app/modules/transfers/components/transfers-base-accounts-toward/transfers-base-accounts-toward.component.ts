import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ACCOUNT_TYPE_LIST } from '@modules/product/constants/product.constants';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { accountNumberValidators } from '@modules/transfers/helpers/transfer-form.helper';

@Component({
  template: ``,
  selector: 'app-transfers-base-accounts-toward'
})
export class TransfersBaseAccountsTowardComponent {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;

  public productAccountTypes: DropdownList[] = ACCOUNT_TYPE_LIST;

  constructor(
    private facade: TransfersFacade,
    private formBuilder: UntypedFormBuilder
  ) {}

  protected initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('towardAccountType', this.towardAccountType);
    this.formGroup.addControl('towardAccount', this.towardAccount);
    this.formGroup.controls.towardAccountType.setValidators([
      Validators.required
    ]);
    this.formGroup.controls.towardAccount.setValidators([
      Validators.required,
      accountNumberValidators.bind(this)
    ]);
  }

  get towardAccountType(): AbstractControl {
    return this.form.get('towardAccountType');
  }

  get towardAccount(): AbstractControl {
    return this.form.get('towardAccount');
  }
}
