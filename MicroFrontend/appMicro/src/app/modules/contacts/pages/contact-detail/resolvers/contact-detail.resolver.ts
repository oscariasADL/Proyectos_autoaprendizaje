import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { CONTACTS } from '@commons/constants/navigate.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { NavController } from '@ionic/angular';
import { Contact } from '@modules/contacts/entities/contact.interface';
import { ContactDetailFacade } from '@modules/contacts/pages/contact-detail/contact-detail.facade';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ContactDetailResolver implements Resolve<Observable<Contact>> {
  constructor(
    private navCtrl: NavController,
    private facade: ContactDetailFacade
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Contact> {
    return this.facade.contacts$.pipe(
      take(1),
      map((contacts: Contact[]) => {
        if (contacts || (contacts && contacts.length === 0)) {
          this.navCtrl.navigateBack(CONTACTS);
        }

        this.facade.fetchContactProducts({
          id: route.params.id,
          idType: route.params.idType
        });

        return contacts.find(
          (contact: Contact) =>
            contact.identificationData.id === route.params.id &&
            contact.identificationData.idType === route.params.idType
        );
      })
    );
  }
}
