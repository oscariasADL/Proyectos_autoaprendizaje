import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloadImageDirective } from '@app/commons/directives/preload-image/preload-image.directive';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { IonicModule, ModalController, Platform } from '@ionic/angular';
import { SpiTermsAndConditionsComponent } from './spi-terms-and-conditions/spi-terms-and-conditions.component';
import { Subscription } from 'rxjs';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { removeSubscriptions } from '@commons/utils/util';

@Component({
  selector: 'app-spi-transfer-consent',
  templateUrl: './spi-transfer-consent.component.html',
  styleUrls: ['./spi-transfer-consent.component.sass'],
  imports: [
    IonicModule,
    GlobalPipesModule,
    PreloadImageDirective,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SpiTermsAndConditionsComponent
  ],
  standalone: true
})
export class SpiTransferConsentComponent implements OnInit, OnDestroy {
  public isSpiConsentAccepted: boolean = false;
  public showTermsAndConditions: boolean = false;
  private subscriptions: Subscription[] = [];

  @Input() skipSPITransferConsent: boolean = false;
  @Input() skipSPITransferConsentXOption: boolean = false;

  constructor(private platform: Platform, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.subscriptions.push(
      this.platform.backButton.subscribeWithPriority(
        BackButtonPriorities.first,
        () => {
          return;
        }
      )
    );
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public async acceptConditions(): Promise<void> {
    await this.modalCtrl.dismiss(this.isSpiConsentAccepted);
  }

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss(false);
  }

  public acceptTerms() {
    this.isSpiConsentAccepted = true;
    this.hideTerms();
  }

  public closeTermsInformation() {
    this.hideTerms();
  }

  private hideTerms(): void {
    this.showTermsAndConditions = false;
  }
}
