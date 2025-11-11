import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '@modules/contacts/entities/contact.interface';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { Platform } from '@ionic/angular';
import { mapContactsFiltered } from '@modules/contacts/mappers/contact.mapper';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AVV_CONTACTS_TAB,
  ContactsFromCellPhone
} from './entities/cell-phone-contacts.entities';

@Component({
  selector: 'app-cell-phone-contacts',
  templateUrl: './cell-phone-contacts.component.html',
  styleUrls: ['./cell-phone-contacts.component.sass']
})
export class CellPhoneContactsComponent implements OnInit {
  @Input() showTabs: boolean = false;
  @Input() activeTab: AVV_CONTACTS_TAB = AVV_CONTACTS_TAB.CELL_PHONE;
  @Input() avvContacts$: Observable<Contact[]>;
  @Input() avvContactsWorking$: Observable<boolean>;
  @Input() utagCategory: string | null = null;

  public avvContactsKeyWord: string = '';

  private subscription: Subscription;

  constructor(private modalCtrl: ModalController, private platform: Platform) {}

  ngOnInit(): void {
    this.listenBack();
  }

  public selectCellPhoneContacts(contact: ContactsFromCellPhone): void {
    this.modalCtrl.dismiss(contact);
  }

  public selectContactFromAVV(contact: Contact): void {
    this.modalCtrl.dismiss({
      displayName: contact.name,
      phoneNumber: contact.phoneNumber
    });
  }

  public closeClick(): void {
    this.modalCtrl.dismiss();
  }

  private listenBack(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => this.modalCtrl.dismiss()
    );
  }

  get avvContactsFiltered$(): Observable<Contact[]> {
    return this.avvContacts$.pipe(
      map((contacts: Contact[]) =>
        mapContactsFiltered(contacts, this.avvContactsKeyWord)
      )
    );
  }

  get AVV_CONTACTS_TAB(): typeof AVV_CONTACTS_TAB {
    return AVV_CONTACTS_TAB;
  }

  get isFromCellPhone(): boolean {
    return this.activeTab === AVV_CONTACTS_TAB.CELL_PHONE;
  }
}
