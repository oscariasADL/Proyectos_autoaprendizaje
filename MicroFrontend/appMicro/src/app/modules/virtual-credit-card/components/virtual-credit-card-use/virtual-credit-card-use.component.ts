import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@Component({
  selector: 'app-virtual-credit-card-use',
  templateUrl: './virtual-credit-card-use.component.html',
  styleUrls: ['./virtual-credit-card-use.component.sass'],
  standalone: true,
  imports: [CommonModule, GlobalPipesModule]
})
export class VirtualCreditCardUseComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private modalCtrl: ModalController, private platform: Platform) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => {
        void this.modalCtrl.dismiss();
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(state: boolean = false): void {
    void this.modalCtrl.dismiss(state);
  }
}
