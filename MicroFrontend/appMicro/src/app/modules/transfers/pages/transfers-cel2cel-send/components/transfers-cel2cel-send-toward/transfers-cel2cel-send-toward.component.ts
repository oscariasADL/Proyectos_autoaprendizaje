import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { InformationService } from '@commons/services/information.service';
import { TRANSFERS_TRANSFIYA_INFO_ALERT } from '@modules/transfers/constants/transfers.constants';
import {
  transferNoteValidators,
  transferPhoneNumberValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import { showModalCellPhoneContacts } from '@commons/utils/util';
import {
  CellPhoneContactsProps,
  ContactsFromCellPhone
} from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { resetControl } from '@commons/utils/forms';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { Observable, Subscription } from 'rxjs';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { AlertService } from '@commons/services/alert.service';
import { TRANSFERS_AVV_PHONE_CONFIRM_TOWARD_ALERT } from '@modules/transfers/pages/transfers-cel2cel-send/constants/transfers-cel2cel-send.constants';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';

@Component({
  selector: 'app-transfers-cel2cel-send-toward',
  templateUrl: './transfers-cel2cel-send-toward.component.html',
  styleUrls: ['./transfers-cel2cel-send-toward.component.sass']
})
export class TransfersCel2celSendTowardComponent implements OnInit, OnDestroy {
  @Input() form: UntypedFormGroup;
  @Input() utagCategory: string | null = null;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  public formGroup: UntypedFormGroup;
  public transfersCel2celCompletedSubscription: Subscription = null;

  constructor(
    private facade: TransfersFacade,
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController,
    private informationService: InformationService,
    private transfersCel2celFacade: TransfersCel2celFacade,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.initForm();
    this.form.controls.useTransfiya.setValue(false);
    resetControl(this.form.controls.useTransfiya as any);
  }

  ngOnDestroy() {
    if (this.transfersCel2celCompletedSubscription) {
      this.transfersCel2celCompletedSubscription.unsubscribe();
    }
    this.transfersCel2celFacade.transfersCel2celCompletedToFalse();
    this.transfersCel2celFacade.transfersCel2celSetUseTransfiya(false);
  }

  protected initForm(): void {
    this.formGroup = this.formBuilder.group({});
    this.formGroup.addControl('phoneNumber', this.phoneNumber);
    this.formGroup.addControl('amount', this.amount);
    this.formGroup.addControl('note', this.note);
    this.formGroup.controls.note.setValidators([
      transferNoteValidators.bind(this),
      Validators.minLength(
        this.facade.boundsByKey(ParameterKey.transferNoteMinLength)
      )
    ]);
    this.formGroup.controls.phoneNumber.setValidators([
      Validators.required,
      transferPhoneNumberValidators.bind(this)
    ]);
  }

  public async showTransfiyaInformation(): Promise<void> {
    await this.informationService.showPanel(TRANSFERS_TRANSFIYA_INFO_ALERT);
  }

  public setCellPhoneContact(): void {
    const props = new CellPhoneContactsProps();
    showModalCellPhoneContacts(this.modalCtrl, {
      ...props,
      utagCategory: this.utagCategory
    }).then((data: ContactsFromCellPhone) => {
      if (!!data) {
        const { phoneNumber } = data;
        this.contactData.setValue(data);
        this.phoneNumber.setValue(phoneNumber);
      }
    });
  }

  public removeCellNumberContact(): void {
    this.contactData.setValue(null);
    this.phoneNumber.setValue(null);
    resetControl(this.contactData as any);
    resetControl(this.phoneNumber as any);
  }

  public confirmationTowardEmit() {
    this.form.controls.addenda.setValue({
      note: this.note.value,
      referenceId: null
    });
    this.continue.emit();
  }

  public confirmationToward() {
    if (!this.contactData.value?.displayName) {
      const alertData: AlertSheetProperties = {
        ...TRANSFERS_AVV_PHONE_CONFIRM_TOWARD_ALERT,
        utagCategory: 'a un celular',
        utag: 'enviar plata - confirmar numero - si, confirmar',
        utagCancel: 'enviar plata - confirmar numero - no, cambiar el numero'
      };
      alertData.title = this.phoneNumber.value;
      this.alertService.create(alertData).then((res: any) => {
        if (!!res) {
          this.getTowardProducts();
        }
      });
    } else {
      this.getTowardProducts();
    }
  }

  public getTowardProducts() {
    this.transfersCel2celCompletedSubscription = this.working$.subscribe(
      (working: boolean) => {
        if (!working && this.completed$.currentValue()) {
          this.confirmationTowardEmit();
        }
      }
    );
    this.transfersCel2celFacade.transfersCel2celFetchTowardProductsByPhoneNumber(
      this.phoneNumber.value.replace(/\D/g, '')
    );
  }

  get amountMax(): number {
    return this.facade.boundsByKey(ParameterKey.transfiyaAmountMax);
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

  get towardProduct(): AbstractControl {
    return this.form.get('towardProduct');
  }

  get note(): AbstractControl {
    return this.form.get('note');
  }

  get working$(): Observable<boolean> {
    return this.transfersCel2celFacade.transfersCel2celWorking$;
  }

  get completed$(): Observable<boolean> {
    return this.transfersCel2celFacade.transfersCel2celCompleted$;
  }
}
