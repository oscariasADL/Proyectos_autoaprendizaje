import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  AlertSheetIcon,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { POPUP_ERROR_LOGIN } from '../popup-error-login/constants/popup.constant';
import { PopupErrorLoginComponent } from '../popup-error-login/popup-error-login.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() props: AlertSheetProperties;

  private subscription: Subscription;

  constructor(private platform: Platform, private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.third,
      () => {
        this.closeModal();
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(data: any = null): void {
    this.modalCtrl.dismiss(data);
  }

  public async openPopUpErrorLogin(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PopupErrorLoginComponent,
      componentProps: {
        popUpData: POPUP_ERROR_LOGIN,
        onClick: () => this.closeModal(true)
      },
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    this.closeModal();
    await modal.present();
  }

  get icon(): string {
    return this.props?.icon || AlertSheetIcon.error;
  }
}
