import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import {
  Contact,
  ContactId,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TransfersContactsFacadeMock extends TransfersFacadeMock {
  public contacts$: Observable<Contact[]> = new BehaviorSubject([]);

  public contactsWorking$: Observable<boolean> = new BehaviorSubject(false);

  public products$: Observable<Product[]> = new BehaviorSubject(
    new ProductFactory().createBulk(3)
  );

  public contactProducts$: Observable<ContactProduct[]> = new BehaviorSubject(
    []
  );

  public contactProductsCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public contactProductsWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchContacts(): void {}

  public fetchContactProducts(payload: ContactId): void {}
}
