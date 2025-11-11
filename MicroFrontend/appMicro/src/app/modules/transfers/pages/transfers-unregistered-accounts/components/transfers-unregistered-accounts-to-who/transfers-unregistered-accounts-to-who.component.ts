import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { resetForm } from '@commons/utils/forms';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { TransferUnregisteredAccountsSlide } from '@modules/transfers/pages/transfers-unregistered-accounts/constants/transfers-unregistered-accounts.constants';
import { TransfersFacade } from '@modules/transfers/transfers.facade';

@Component({
  selector: 'app-transfers-unregistered-accounts-to-who',
  templateUrl: './transfers-unregistered-accounts-to-who.component.html',
  styleUrls: ['./transfers-unregistered-accounts-to-who.component.sass']
})
export class TransfersUnregisteredAccountsToWhoComponent {
  @Input() form: UntypedFormGroup;

  @Output() continueSlide: EventEmitter<string> = new EventEmitter<string>();

  constructor(private facade: TransfersFacade) {}

  public setTowardAccounts(): void {
    resetForm(this.form, ['phoneNumber', 'contactData', 'transferType'], true);
    this.transferType.patchValue(TransferType.FAST_TRANSFER);
    this.continueSlide.emit(TransferUnregisteredAccountsSlide.towardAccount);
  }

  public setTowardCellPhone(): void {
    resetForm(
      this.form,
      ['towardAccountType', 'towardAccount', 'transferType'],
      true
    );
    this.continueSlide.emit(TransferUnregisteredAccountsSlide.towardCellPhone);
  }

  get denyTowardAccounts(): boolean {
    return (
      this.amount.currencyValue() <
      this.facade.boundsByKey(ParameterKey.transferValueToSendMin)
    );
  }

  get denyTowardCellPhone(): boolean {
    return (
      this.amount.currencyValue() <
        this.facade.boundsByKey(ParameterKey.transferValueToSendMin) ||
      this.amount.currencyValue() >
        this.facade.boundsByKey(ParameterKey.transferToAvvPhoneMax)
    );
  }

  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
