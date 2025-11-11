import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-terms-detail',
  templateUrl: './terms-detail.component.html',
  styleUrls: ['./terms-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private modalCtrl: ModalController, private platform: Platform) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => {
        this.modalCtrl.dismiss();
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
