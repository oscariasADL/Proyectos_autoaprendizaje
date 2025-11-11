import { Contact } from '@modules/contacts/entities/contact.interface';
import { of } from 'rxjs';

export interface ContactsFromCellPhone {
  displayName: string;
  phoneNumber: string;
}

export enum AVV_CONTACTS_TAB {
  AVV,
  CELL_PHONE
}

export class CellPhoneContactsProps {
  constructor(
    public showTabs: boolean = false,
    public activeTab: AVV_CONTACTS_TAB = AVV_CONTACTS_TAB.CELL_PHONE,
    public avvContacts$: Observable<Contact[]> = of([]),
    public avvContactsWorking$: Observable<boolean> = of(false),
    public utagCategory: string | null = null
  ) {}
}
