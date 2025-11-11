import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Contact } from '@modules/contacts/entities/contact.interface';
import { contactAddProductAction } from '@modules/contacts/pages/contact-add-product/store/contact-add-product.actions';

@Injectable()
export class ContactAddProductFacade extends AppFacade {
  public addProductToContact(payload: Contact, onlyAdd: boolean = false): void {
    this.store.dispatch(contactAddProductAction({ payload, onlyAdd }));
  }
}
