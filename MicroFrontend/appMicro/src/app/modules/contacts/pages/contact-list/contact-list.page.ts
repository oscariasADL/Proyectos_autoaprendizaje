import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  Contact,
  ContactProductFilter
} from '@modules/contacts/entities/contact.interface';
import { ContactListFacade } from '@modules/contacts/pages/contact-list/contact-list.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private facade: ContactListFacade
  ) {}

  ngOnInit(): void {
    this.facade.fetchContacts({
      filterBy: ContactProductFilter.ALL
    });
  }

  public redirectToContactDetail(contact: Contact): void {
    this.navCtrl.navigateForward(contact.urlDetail);
  }

  public setContactFilter(text: string): void {
    this.facade.setContactFilter(text);
  }

  get filter$(): Observable<string> {
    return this.facade.filter$;
  }

  get contacts$(): Observable<Contact[]> {
    return this.facade.contacts$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }
}
