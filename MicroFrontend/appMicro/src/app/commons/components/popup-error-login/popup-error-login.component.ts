import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { popUpErrorType, POPUP_ERROR_LOGIN } from './constants/popup.constant';

@Component({
  selector: 'app-popup-error-login',
  templateUrl: './popup-error-login.component.html',
  styleUrls: ['./popup-error-login.component.sass']
})
export class PopupErrorLoginComponent {
  @Input() popUpData: popUpErrorType;
  @Input() onClick: () => void;
  constructor(private modalCtrl: ModalController) {}

  public async closeModal(data: any = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }
}
