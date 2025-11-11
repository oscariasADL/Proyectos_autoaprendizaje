import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { Contact } from '@modules/contacts/entities/contact.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ContactsStepFacadeMock extends AppFacadeMock {
  public contacts$: Observable<Contact[]> = new BehaviorSubject([]);

  public contactsWorking$: Observable<boolean> = new BehaviorSubject(false);

  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public fetchContacts(): void {}
}
