import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  Contact,
  ContactParams
} from '@modules/contacts/entities/contact.interface';
import {
  fetchContactsAction,
  setContactFilterAction
} from '@modules/contacts/pages/contact-list/store/contact-list.actions';
import {
  contactListCompletedSelector,
  contactListFilteredSelector,
  contactListFilterSelector,
  contactListWorkingSelector
} from '@modules/contacts/pages/contact-list/store/contact-list.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ContactListFacade extends AppFacade {
  public contacts$: Observable<Contact[]> = this.store.pipe(
    select(contactListFilteredSelector)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(contactListWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(contactListCompletedSelector)
  );

  public filter$: Observable<string> = this.store.pipe(
    select(contactListFilterSelector)
  );

  public fetchContacts(payload: ContactParams): void {
    this.store.dispatch(fetchContactsAction({ payload }));
  }

  public setContactFilter(filter: string): void {
    this.store.dispatch(setContactFilterAction({ filter }));
  }
}
