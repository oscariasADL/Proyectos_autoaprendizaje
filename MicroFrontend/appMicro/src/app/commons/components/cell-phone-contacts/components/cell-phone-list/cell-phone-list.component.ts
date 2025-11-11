import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  Contacts,
  Contact,
  PhoneNumber
} from '@commons/capacitor-web-plugins/contacts';
import { ContactsFromCellPhone } from '@commons/components/cell-phone-contacts/entities/cell-phone-contacts.entities';
import { AnalyticsService } from '@commons/services/analytics.service';
import { isValidCellPhone, removeSubscriptions } from '@commons/utils/util';

@Component({
  selector: 'app-cell-phone-list',
  templateUrl: './cell-phone-list.component.html',
  styleUrls: ['./cell-phone-list.component.sass']
})
export class CellPhoneListComponent implements OnInit, OnDestroy {
  @Input() utagCategory: string | null = null;
  @Output()
  selectContacts: EventEmitter<ContactsFromCellPhone> =
    new EventEmitter<ContactsFromCellPhone>();

  public keyWord: string = '';
  public working: boolean = false;
  public contacts: ContactsFromCellPhone[] = [];
  public searchControl: UntypedFormControl = new UntypedFormControl();

  private subscriptions: Subscription[] = [];

  constructor(
    private translate: TranslateService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchControl.valueChanges
        .pipe(
          map((text) => text?.trim()),
          distinctUntilChanged()
        )
        .subscribe((text) => (this.keyWord = text))
    );
    this.working = true;
    this.getCellPhoneContacts()
      .then((contacts) => {
        this.contacts = contacts;
        this.working = false;
      })
      .catch((error) => {
        this.analytics.sendError('Get cellPhone contacts', error);
        this.working = false;
      });
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public async getCellPhoneContacts(): Promise<ContactsFromCellPhone[]> {
    let contacts: Contact[];
    const { granted } = await Contacts.getPermissions();
    if (granted) {
      const { contacts: contactsCel } = await Contacts.getContacts();
      contacts = contactsCel;
    } else {
      throw new Error(
        this.translate.instant('CELL_PHONE_CONTACTS.LIST.READ_ERROR')
      );
    }

    const contactsRes: ContactsFromCellPhone[] = [];
    contacts.forEach(({ displayName, phoneNumbers }) => {
      if (phoneNumbers.length > 0) {
        const cellPhones = [];
        phoneNumbers.forEach((phone: PhoneNumber) => {
          const phoneNumber = isValidCellPhone(phone.number.toString());
          if (phoneNumber) {
            cellPhones.push(phoneNumber);
          }
        });
        [...new Set(cellPhones)].forEach((cel) =>
          contactsRes.push({
            displayName,
            phoneNumber: cel as string
          })
        );
      }
    });
    return contactsRes.sort((a, b) => {
      const nameA = a.displayName.toUpperCase();
      const nameB = b.displayName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  get contactsFiltered(): ContactsFromCellPhone[] {
    if (this.keyWord) {
      return this.contacts.filter((con) =>
        con.displayName.toLowerCase().includes(this.keyWord.toLowerCase())
      );
    }
    return this.contacts;
  }
}
