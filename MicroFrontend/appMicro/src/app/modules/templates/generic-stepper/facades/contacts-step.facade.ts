import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  Contact,
  ContactProductFilter
} from '@modules/contacts/entities/contact.interface';
import { fetchContactsAction } from '@modules/contacts/pages/contact-list/store/contact-list.actions';
import {
  contactListSelector,
  contactListWorkingSelector
} from '@modules/contacts/pages/contact-list/store/contact-list.selector';
import { productsSelector } from '@modules/product/store/product.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ContactsStepFacade extends AppFacade {
  public contacts$: Observable<Contact[]> = this.store.pipe(
    select(contactListSelector)
  );

  public contactsWorking$: Observable<boolean> = this.store.pipe(
    select(contactListWorkingSelector)
  );

  public products$: Observable<Product[]> = this.store.pipe(
    select(productsSelector(), {
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    })
  );

  public fetchContacts(): void {
    if (isNullOrUndefined(this.contacts$.currentValue())) {
      this.store.dispatch(
        fetchContactsAction({ payload: { filterBy: ContactProductFilter.ALL } })
      );
    }
  }
}
