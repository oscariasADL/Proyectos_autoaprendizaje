import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { InformationService } from '@commons/services/information.service';
import { TRANSFERS_TRANSFIYA_INFO_ALERT } from '@modules/transfers/constants/transfers.constants';
import { showModalCellPhoneContacts } from '@commons/utils/util';
import { ContactsFromCellPhone } from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { resetControl } from '@commons/utils/forms';
import { transferPhoneNumberValidators } from '@modules/transfers/helpers/transfer-form.helper';

@Component({
  selector: 'app-transfer-base-phone-toward-cell-phone',
  template: ``
})
export class TransferBasePhoneTowardCellPhoneComponent {
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;

  constructor(
    private facade: TransfersFacade,
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController,
    private informationService: InformationService
  ) {}

  public async showTransfiyaInformation(): Promise<void> {
    await this.informationService.showPanel(TRANSFERS_TRANSFIYA_INFO_ALERT);
  }

  public setCellPhoneContact(): void {
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

  public removeCellPhoneContact(): void {
    this.contactData.setValue(null);
    this.phoneNumber.setValue(null);
    resetControl(this.contactData as any);
    resetControl(this.phoneNumber as any);
  }

  protected initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('phoneNumber', this.phoneNumber);
    this.formGroup.controls.phoneNumber.setValidators([
      Validators.required,
      transferPhoneNumberValidators.bind(this)
    ]);
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
