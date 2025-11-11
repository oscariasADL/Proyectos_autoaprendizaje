import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  TRANSFIYA_AVAL,
  TRANSFIYA_NO_AVAL
} from '@commons/constants/transfiya.constants';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfiya-info',
  templateUrl: './transfiya-info.component.html',
  styleUrls: ['./transfiya-info.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfiyaInfoComponent implements OnInit, OnDestroy {
  public subscribe: Subscription;

  banks = TRANSFIYA_AVAL;
  otherBanks = TRANSFIYA_NO_AVAL;

  constructor(
    private modalController: ModalController,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.subscribe = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => {
        this.modalController.dismiss();
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscribe)) {
      this.subscribe.unsubscribe();
    }
  }

  public closeModal(): void {
    void this.modalController.dismiss();
  }
}
