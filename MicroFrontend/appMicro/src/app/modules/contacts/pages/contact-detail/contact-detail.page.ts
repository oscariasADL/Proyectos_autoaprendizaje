import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Contact,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';
import { ContactDetailFacade } from '@modules/contacts/pages/contact-detail/contact-detail.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailPage {
  constructor(
    private route: ActivatedRoute,
    private facade: ContactDetailFacade
  ) {}

  get contact(): Contact {
    return this.route.snapshot.data.contact;
  }

  get contactProducts$(): Observable<ContactProduct[]> {
    return this.facade.contactProducts$;
  }

  get contactProductsWorking$(): Observable<boolean> {
    return this.facade.contactProductsWorking$;
  }
}
