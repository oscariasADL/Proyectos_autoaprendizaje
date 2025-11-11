import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup
} from '@angular/forms';
import { ContactsFromCellPhone } from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { resetControl } from '@commons/utils/forms';
import { showModalCellPhoneContacts } from '@commons/utils/util';
import { TransfersFacade } from '@modules/transfers/transfers.facade';

@Component({
  selector: 'app-transfers-request-money-toward',
  templateUrl: './transfers-request-money-toward.component.html',
  styleUrls: ['./transfers-request-money-toward.component.sass']
})
export class TransfersRequestMoneyTowardComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;

  constructor(
    private facade: TransfersFacade,
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public setPhoneContact(): void {
    showModalCellPhoneContacts(this.modalCtrl).then(
      (data: ContactsFromCellPhone) => {
        if (!!data) {
          const { phoneNumber } = data;
          this.contactData.setValue(data);
          this.phoneNumber.setValue(phoneNumber);
        }
      }
    );
  }

  public removePhoneContact(): void {
    this.contactData.setValue(null);
    this.phoneNumber.setValue(null);
    resetControl(this.contactData as any);
    resetControl(this.phoneNumber as any);
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('phoneNumber', this.phoneNumber);
  }

  get denyTransfiya(): boolean {
    return (
      this.amount.currencyValue() >
      this.facade.boundsByKey(ParameterKey.transfiyaAmountMax)
    );
  }

  get contactData(): AbstractControl {
    return this.form.get('contactData');
  }

  get phoneNumber(): AbstractControl {
    return this.form.get('phoneNumber');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
