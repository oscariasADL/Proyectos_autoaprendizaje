import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-popup-security-alert',
  templateUrl: './popup-security-alert.component.html',
  styleUrls: ['./popup-security-alert.component.sass']
})
export class PopupSecurityAlertComponent {
  @Input() title: string;
  @Input() paragraphs: string[];
  @Input() okButtonText: string;
  @Input() closeButtonText: string = null;
  @Input() isTitleBottom: boolean;
  @Input() image: string;
  @Input() imageAlt: string;
  @Input() listTitle: string;
  @Input() itemList: string[];
  @Input() redirectUrl: string;
  @Input() isImgBig: boolean;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  public async onClick() {
    await this.closeModal(true);
    if (this.redirectUrl) {
      void this.navCtrl.navigateForward(this.redirectUrl);
    }
  }

  public async closeModal(data: any = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }
}
