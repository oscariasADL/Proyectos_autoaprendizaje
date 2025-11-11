import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { TYPE_ACCOUNT_TRANSFER_ACCOUNTS } from '@app/modules/contacts/entities/contact-product.interface';
import {
  Contact,
  ContactProduct
} from '@app/modules/contacts/entities/contact.interface';
import { ContactListFacade } from '@app/modules/contacts/pages/contact-list/contact-list.facade';
import { contactListWorkingSelector } from '@app/modules/contacts/pages/contact-list/store/contact-list.selector';
import { UTAG_FOR_ADD_FAVORITE_CONTACTS } from '@app/modules/favorites/pages/constants/add-to-favorites.constants';
import { TransferPayload } from '@app/modules/transfers/entities/transfers.interface';
import { TransfersContactsFacade } from '@app/modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  finalize,
  map,
  Observable,
  of,
  Subscription,
  tap
} from 'rxjs';

@Component({
  selector: 'app-contacs-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.sass']
})
export class ContactsFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Output() payloadChanged = new EventEmitter<TransferPayload>();
  public selectedContact: ContactProduct;
  public contact: Contact;
  public hideContactList: boolean = false;
  public readonly utagForContacts: UtagEvent = UTAG_FOR_ADD_FAVORITE_CONTACTS;
  private formChangesSub: Subscription;
  contactsWorkingSubscribe: Subscription;
  constructor(
    private facade: ContactListFacade,
    private transfersContactsFacade: TransfersContactsFacade,
    private store: Store
  ) {
    this.contactsWorkingSubscribe = this.store
      .select(contactListWorkingSelector)
      .subscribe((isWorking) => {
        isWorking ? this.facade.enableLoading() : this.facade.disableLoading();
      });

    this.transfersContactsFacade.fetchContacts();
  }
  ngOnInit(): void {
    this.form.get('accountNumber')?.clearValidators();
    this.form.get('accountNumber')?.updateValueAndValidity();

    this.formChangesSub = this.form.valueChanges.subscribe((value) => {
      const { product, transferType, favoriteName } = value;

      if (this.selectedContact) {
        const payload: TransferPayload = {
          contactInfo: {
            contactId: {
              id: this.contact.identificationData.id,
              idType: this.contact.identificationData.idType
            },
            accountInfo: {
              productId: this.selectedContact.relativeId,
              productType: this.selectedContact.type.id,
              bank: this.selectedContact.bank.id
            }
          },
          sourceAccount: {
            accountNumber: product.numberProduct,
            productType: product.type,
            productId: product.id
          },
          targetAccount: {
            accountNumber: this.selectedContact.number,
            productType: this.selectedContact.type.id,
            productId: this.selectedContact.relativeId
          },
          transferType: transferType.value,
          favoriteName
        };

        this.payloadChanged.emit(payload);
      }
    });
  }
  ngOnDestroy() {
    this.contactsWorkingSubscribe.unsubscribe();
    this.formChangesSub?.unsubscribe();
  }

  get filter$(): Observable<string> {
    return this.facade.filter$;
  }
  contacts$: Observable<Contact[]> = this.facade.contacts$.pipe(
    catchError((e) => {
      return of([]);
    }),
    finalize(() => {
      this.facade.disableLoading();
    })
  );

  public setContactFilter(text: string): void {
    if (text.length > 0) {
      this.hideContactList = false;
    }
    this.contact = null;
    this.facade.setContactFilter(text);
  }

  public getContactInfo(contact: Contact): void {
    this.form.patchValue({
      contact
    });

    this.contact = contact;
    const { identificationData } = contact;

    this.transfersContactsFacade.fetchContactProducts({
      id: identificationData.id,
      idType: identificationData.idType
    });
  }
  contactProducts$: Observable<ContactProduct[]> =
    this.transfersContactsFacade.contactProducts$.pipe(
      tap(() => {
        this.hideContactList = true;

        this.facade.enableLoading();
      }),
      filter((prod) => !!prod),
      map((products: ContactProduct[]) =>
        products.filter((product: ContactProduct) =>
          TYPE_ACCOUNT_TRANSFER_ACCOUNTS.includes(product.type.id)
        )
      ),
      tap(() => {
        this.facade.disableLoading();
      })
    );

  get favoriteName() {
    return this.form.get('favoriteName');
  }
  get contactInformation() {
    return this.form.get('contactInformation');
  }
  public setFavorite(contact: ContactProduct) {
    this.selectedContact = contact;
  }
}
