import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  Contact,
  ContactId,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';
import { fetchContactProductsAction } from '@modules/contacts/pages/contact-detail/store/contact-detail.actions';
import {
  contactProductsSelector,
  contactProductsWorkingSelector
} from '@modules/contacts/pages/contact-detail/store/contact-detail.selector';
import { contactListSelector } from '@modules/contacts/pages/contact-list/store/contact-list.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ContactDetailFacade extends AppFacade {
  public contacts$: Observable<Contact[]> = this.store.pipe(
    select(contactListSelector)
  );

  public contactProducts$: Observable<ContactProduct[]> = this.store.pipe(
    select(contactProductsSelector)
  );

  public contactProductsWorking$: Observable<boolean> = this.store.pipe(
    select(contactProductsWorkingSelector)
  );

  public fetchContactProducts(payload: ContactId): void {
    this.store.dispatch(fetchContactProductsAction({ payload }));
  }
}
