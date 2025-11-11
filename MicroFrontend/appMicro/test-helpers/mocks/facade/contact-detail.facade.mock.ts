import { Injectable } from '@angular/core';
import {
  Contact,
  ContactId,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ContactDetailFacadeMock extends AppFacadeMock {
  public contacts$: Observable<Contact[]> = new BehaviorSubject([]);

  public contactProducts$: Observable<ContactProduct[]> = new BehaviorSubject(
    []
  );

  public contactProductsWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchContactProducts(payload: ContactId): void {}
}
