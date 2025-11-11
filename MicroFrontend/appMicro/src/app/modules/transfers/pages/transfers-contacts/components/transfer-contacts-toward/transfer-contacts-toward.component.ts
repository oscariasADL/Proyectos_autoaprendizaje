import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { Contact } from '@modules/contacts/entities/contact.interface';
import { mapContactsFiltered } from '@modules/contacts/mappers/contact.mapper';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { TransferContactSlide } from '@modules/transfers/pages/transfers-contacts/constants/transfers-contacts.constants';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';

@Component({
  selector: 'app-transfer-contacts-toward',
  templateUrl: './transfer-contacts-toward.component.html',
  styleUrls: ['./transfer-contacts-toward.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferContactsTowardComponent {
  @Input() form: UntypedFormGroup;

  @Output() continueSlide: EventEmitter<string> = new EventEmitter<string>();

  public keyWord: string = '';

  constructor(
    private facade: TransfersContactsFacade,
    private titleCase: TitleCasePipe
  ) {}

  public selectContact(contact: Contact): void {
    if (contact.isFake) {
      this.transferType.setValue(TransferType.MY_ACCOUNTS_AVV);
      this.continueSlide.emit(TransferContactSlide.ownProducts);
    } else {
      this.contact.setValue(contact);
      this.continueSlide.emit(TransferContactSlide.contactProducts);
    }
  }

  public listenSearch(text: string): void {
    this.keyWord = text;
  }

  get fakeContact(): any {
    return this.facade.products$
      .currentValue()
      .filter(
        (product) =>
          product.id.toString() !== this.fromProduct.value.id.toString()
      ).length > 0 &&
      this.amount.currencyValue() >=
        this.facade.boundsByKey(ParameterKey.transferValueToSendMin)
      ? [
          {
            name: !isNullOrUndefinedOrEmpty(this.basicData$.currentValue())
              ? this.titleCase.transform(
                  this.basicData$.currentValue().clientName.toString()
                )
              : '-',
            nickname: 'TRANSFERS.CONTACTS.FAKE_CONTACT',
            isFake: true
          }
        ]
      : [];
  }

  get contacts$(): Observable<Contact[]> {
    return this.facade.contacts$.pipe(
      map((contacts) => (!isNullOrUndefined(contacts) ? contacts : [])),
      map((contacts) => [...this.fakeContact, ...contacts])
    );
  }

  get contactsFiltered$(): Observable<Contact[]> {
    return this.contacts$.pipe(
      map((contacts: Contact[]) =>
        contacts.filter((contact) => !contact?.isFake)
      ),
      map((contacts: Contact[]) => mapContactsFiltered(contacts, this.keyWord)),
      map((contacts: Contact[]) => {
        return [...this.fakeContact, ...contacts];
      })
    );
  }

  get contactsWorking$(): Observable<boolean> {
    return this.facade.contactsWorking$;
  }

  get basicData$(): Observable<DataBasicClientDto> {
    return this.facade.basicData$;
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }

  get contact(): AbstractControl {
    return this.form.get('contact');
  }

  get transferType(): AbstractControl {
    return this.form.get('transferType');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

  get transfiyaMinimumAmount(): number {
    return this.facade.boundsByKey(ParameterKey.transfiyaAmountMin);
  }
}
