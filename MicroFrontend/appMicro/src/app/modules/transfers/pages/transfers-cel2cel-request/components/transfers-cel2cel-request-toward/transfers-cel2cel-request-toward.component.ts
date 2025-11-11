import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup
} from '@angular/forms';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { showModalCellPhoneContacts } from '@commons/utils/util';
import { ContactsFromCellPhone } from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { resetControl } from '@commons/utils/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { ALERT_COMPLEMENTARY_SERVICE_ERROR } from '@commons/constants/permission.constants';
import { AlertService } from '@commons/services/alert.service';

@Component({
  selector: 'app-transfers-cel2cel-request-toward',
  templateUrl: './transfers-cel2cel-request-toward.component.html',
  styleUrls: ['./transfers-cel2cel-request-toward.component.sass']
})
export class TransfersCel2celRequestTowardComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;

  constructor(
    private facade: TransfersFacade,
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.initsForm();
  }

  public setPhoneNumberContact(): void {
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

  public removePhoneNumberContact(): void {
    this.contactData.setValue(null);
    this.phoneNumber.setValue(null);
    resetControl(this.contactData as any);
    resetControl(this.phoneNumber as any);
  }

  private initsForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('phoneNumber', this.phoneNumber);
    this.formGroup.addControl('amount', this.amount);
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

  get note(): AbstractControl {
    return this.form.get('note');
  }

  public setNoteValue() {
    this.form.controls.addenda.setValue({
      note: this.note?.value ?? '',
      referenceId: null
    });
  }
}
