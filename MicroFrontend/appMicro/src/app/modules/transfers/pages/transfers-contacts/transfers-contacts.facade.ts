import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  Contact,
  ContactId,
  ContactProduct,
  ContactProductFilter
} from '@modules/contacts/entities/contact.interface';
import { fetchContactProductsAction } from '@modules/contacts/pages/contact-detail/store/contact-detail.actions';
import {
  contactProductsCompletedSelector,
  contactProductsSelector,
  contactProductsWorkingSelector
} from '@modules/contacts/pages/contact-detail/store/contact-detail.selector';
import { fetchContactsAction } from '@modules/contacts/pages/contact-list/store/contact-list.actions';
import {
  contactListSelector,
  contactListWorkingSelector
} from '@modules/contacts/pages/contact-list/store/contact-list.selector';
import { productsSelector } from '@modules/product/store/product.selector';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class TransfersContactsFacade extends TransfersFacade {
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

  public contactProducts$: Observable<ContactProduct[]> = this.store.pipe(
    select(contactProductsSelector)
  );

  public contactProductsCompleted$: Observable<boolean> = this.store.pipe(
    select(contactProductsCompletedSelector)
  );

  public contactProductsWorking$: Observable<boolean> = this.store.pipe(
    select(contactProductsWorkingSelector)
  );

  public fetchContacts(
    filterBy: ContactProductFilter = ContactProductFilter.ALL
  ): void {
    if (!this.contacts$.currentValue()) {
      this.store.dispatch(fetchContactsAction({ payload: { filterBy } }));
    }
  }

  public fetchContactProducts(payload: ContactId): void {
    this.store.dispatch(fetchContactProductsAction({ payload }));
  }
}
