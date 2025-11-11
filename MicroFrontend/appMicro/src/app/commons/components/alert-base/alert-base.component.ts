import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { Subscription } from 'rxjs';
import { ModalController } from '@commons/controllers/modal.controller';
import { Platform } from '@ionic/angular';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { AppFacade } from '@app/app.facade';

@Component({
  selector: 'app-alert-base',
  template: ``
})
export class AlertBaseComponent implements OnInit, OnDestroy {
  @Input() props: AlertSheetProperties;

  public notShowAgain: boolean = true;

  private subscription: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private facade: AppFacade
  ) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.third,
      () => {
        this.modalCtrl.dismiss();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(
    notShowAgain: boolean = this.notShowAgain,
    hasAccepted?: boolean | undefined | null
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    if (hasAccepted === false) {
      this.modalCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss({
        notShowAgain
      });
    }
  }

  public toggleCheck(notShowAgain: boolean = !this.notShowAgain): void {
    this.notShowAgain = notShowAgain;
  }
  public openExternal(url: string) {
    this.facade.openExternalLinks(url);
  }
}
