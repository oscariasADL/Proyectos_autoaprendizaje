import { Injectable } from '@angular/core';
import {
  Contact,
  ContactParams
} from '@modules/contacts/entities/contact.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ContactListFacadeMock extends AppFacadeMock {
  public contacts$: Observable<Contact[]> = new BehaviorSubject([]);

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(false);

  public filter$: Observable<string> = new BehaviorSubject('');

  public fetchContacts(payload: ContactParams): void {}

  public setContactFilter(filter: string): void {}
}
