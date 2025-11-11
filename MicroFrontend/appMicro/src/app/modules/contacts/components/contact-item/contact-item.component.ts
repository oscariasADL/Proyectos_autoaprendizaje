import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverComponent } from '@commons/components/popover/popover.component';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { PopoverController } from '@ionic/angular';
import {
  Contact,
  StatusType
} from '@modules/contacts/entities/contact.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactItemComponent {
  @Input() contact: Contact;
  @Input() keyWord: string = '';
  @Input() fieldToNickname: string = null;
  @Input() index: number = -1;
  @Input() showTitle: boolean = false;

  public statusContact = StatusType;
  public popoverMessage = this.translate.instant('CONTACTS.POPOVER.BLOCK');

  constructor(
    private popoverCtrl: PopoverController,
    private translate: TranslateService
  ) {}

  public async showPopover(ev: Event): Promise<void> {
    const popover = await this.popoverCtrl.create({
      id: 'popover-product-detail-' + this.myId,
      component: PopoverComponent,
      componentProps: {
        text: this.translate.instant('CONTACTS.POPOVER.BLOCK')
      },
      cssClass: 'avv-popover',
      event: ev,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }

  get viewArrow(): boolean {
    return (
      this.contact?.status === this.statusContact.ACTIVE || this.contact?.isFake
    );
  }

  get myId(): string {
    if (this.contact?.isFake) {
      return 'fake';
    }
    return this.contact?.identificationData?.id;
  }

  get contactLetter(): string {
    if (isNullOrUndefined(this.contact)) return '';
    return (
      this.contact?.isFake
        ? this.contact?.nickname || ''
        : this.contact?.name || ''
    )
      .slice(0, 1)
      .toUpperCase();
  }
}
