import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-digital-debit-card-use',
  templateUrl: './digital-debit-card-use.component.html',
  styleUrls: ['./digital-debit-card-use.component.sass'],
  standalone: true,
  imports: [CommonModule, GlobalPipesModule]
})
export class DigitalDebitCardUseComponent implements OnInit, OnDestroy {
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
