import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { ContactsFromCellPhone } from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { InformationService } from '@commons/services/information.service';
import { resetControl } from '@commons/utils/forms';
import { showModalCellPhoneContacts } from '@commons/utils/util';
import { RadioInput } from '@modules/forms-avv/entities/radio.interface';
import { TRANSFERS_TRANSFIYA_INFO_ALERT } from '@modules/transfers/constants/transfers.constants';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { transferPhoneNumberValidators } from '@modules/transfers/helpers/transfer-form.helper';
import { TransfersFacade } from '@modules/transfers/transfers.facade';

@Component({
  selector: 'app-transfers-unregistered-accounts-toward-cell-phone',
  templateUrl:
    './transfers-unregistered-accounts-toward-cell-phone.component.html',
  styleUrls: [
    './transfers-unregistered-accounts-toward-cell-phone.component.sass'
  ]
})
export class TransfersUnregisteredAccountsTowardCellPhoneComponent
  implements OnInit
{
  @Input() form: UntypedFormGroup;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public formGroup: UntypedFormGroup;
  public transfersUnregisteredTypeList: RadioInput[] = [];

  constructor(
    private facade: TransfersFacade,
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController,
    private informationService: InformationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initTransfersUnregisteredTypeList();
  }

  public async showTransfiyaInfo(): Promise<void> {
    await this.informationService.showPanel(TRANSFERS_TRANSFIYA_INFO_ALERT);
  }

  public setCellContact(): void {
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

  public removeCellContact(): void {
    this.contactData.setValue(null);
    this.phoneNumber.setValue(null);
    resetControl(this.contactData as any);
    resetControl(this.phoneNumber as any);
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('transferType', this.transferType);
    this.formGroup.addControl('phoneNumber', this.phoneNumber);
    this.formGroup.controls.transferType.setValidators([Validators.required]);
    this.formGroup.controls.phoneNumber.setValidators([
      Validators.required,
      transferPhoneNumberValidators.bind(this)
    ]);
  }

  private initTransfersUnregisteredTypeList(): void {
    this.transfersUnregisteredTypeList = [
      {
        value: TransferType.SEND_AVV_PHONE,
        label: 'TRANSFERS.TYPES.SEND_AVV_PHONE'
      },
      {
        value: TransferType.SEND_TRANSFIYA,
        label: 'TRANSFERS.TYPES.SEND_TRANSFIYA',
        disabled: this.denyTransfiya
      }
    ];
  }

  get denyTransfiya(): boolean {
    return (
      this.amount.currencyValue() >
      this.facade.boundsByKey(ParameterKey.transfiyaAmountMax)
    );
  }

  get transferType(): AbstractControl {
    return this.form.get('transferType');
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
