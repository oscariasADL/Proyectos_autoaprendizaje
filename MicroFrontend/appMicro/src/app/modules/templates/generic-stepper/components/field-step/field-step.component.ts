import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {
  AVV_CONTACTS_TAB,
  CellPhoneContactsProps,
  ContactsFromCellPhone
} from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  isValidCellPhone,
  showModalCellPhoneContacts
} from '@commons/utils/util';
import { Contact } from '@modules/contacts/entities/contact.interface';
import { GenericStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { ContactsStepFacade } from '@modules/templates/generic-stepper/facades/contacts-step.facade';
import {
  transferInvoiceValidators,
  transferNoteValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-field-step',
  templateUrl: './field-step.component.html',
  styleUrls: ['./field-step.component.sass']
})
export class FieldStepComponent implements OnInit {
  @ViewChild('inputField', { static: false }) inputField: ElementRef;

  @Input() data: GenericStepData;

  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  public form: UntypedFormGroup;
  public activeAccordion: boolean = true;
  private alphanumericPattern: any = /^[A-Za-z0-9\s]+$/;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController,
    private facade: ContactsStepFacade
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.facade.fetchContacts();
  }

  public onSelectCellPhoneContacts(): void {
    showModalCellPhoneContacts(
      this.modalCtrl,
      new CellPhoneContactsProps(
        true,
        AVV_CONTACTS_TAB.CELL_PHONE,
        this.getContacts$(),
        this.facade.contactsWorking$
      )
    ).then((data: ContactsFromCellPhone) => {
      if (!!data) {
        const { displayName, phoneNumber } = data;
        this.data.control.setValue(phoneNumber);
        this.data.displayName.setValue(displayName);
        this.setNextStep();
      }
    });
  }

  public setNextStep(): void {
    if (this.data.control.valid) {
      (this.inputField as any).input.nativeElement.blur();
      if (this.data.showAccordionSourceDataStep) {
        this.data.addenda.setValue({
          note: this.note.value,
          referenceId: this.referenceId.value
        });
      }
      this.nextStep.emit();
    }
  }

  public toggleAccordion(status: boolean = !this.activeAccordion): void {
    this.activeAccordion = status;
  }

  private initForm(): void {
    const value = this.data.control.currencyValue();
    const addenda = this.data.addenda?.value;
    const note =
      !isNullOrUndefined(addenda) && !isNullOrUndefined(addenda.note)
        ? addenda.note
        : null;
    const referenceId =
      !isNullOrUndefined(addenda) && !isNullOrUndefined(addenda.referenceId)
        ? addenda.referenceId
        : null;
    if (!!note || !!referenceId) {
      this.activeAccordion = true;
    }
    this.form = this.formBuilder.group({
      field: [value, [Validators.required]],
      note: [
        note,
        [
          transferNoteValidators.bind(this),
          Validators.pattern(this.alphanumericPattern),
          Validators.maxLength(
            this.facade.boundsByKey(ParameterKey.transferNoteMaxLength)
          ),
          Validators.minLength(
            this.facade.boundsByKey(ParameterKey.transferNoteMinLength)
          )
        ]
      ],
      referenceId: [
        referenceId,
        [
          transferInvoiceValidators.bind(this),
          Validators.pattern(this.alphanumericPattern),
          Validators.maxLength(
            this.facade.boundsByKey(ParameterKey.transferInvoiceMaxLength)
          ),
          Validators.minLength(
            this.facade.boundsByKey(ParameterKey.transferInvoiceMinLength)
          )
        ]
      ]
    });
  }

  private getContacts$(): Observable<Contact[]> {
    return this.facade.contacts$.pipe(
      map((con) =>
        con.filter(
          ({ phoneNumber }) => !!phoneNumber && !!isValidCellPhone(phoneNumber)
        )
      )
    );
  }

  get formValid(): boolean {
    return (
      this.data.control.valid &&
      this.form.controls.note.valid &&
      this.form.controls.referenceId.valid
    );
  }

  get note(): AbstractControl {
    return this.form.get('note');
  }

  get referenceId(): AbstractControl {
    return this.form.get('referenceId');
  }
}
