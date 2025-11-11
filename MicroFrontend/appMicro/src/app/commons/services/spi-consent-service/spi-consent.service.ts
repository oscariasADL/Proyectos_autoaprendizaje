import { inject, Injectable } from '@angular/core';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { HomeFacade } from '@app/modules/home/home.facade';
import { SpiTransferConsentComponent } from '@app/modules/transfers/components/spi-transfer-consent/spi-transfer-consent.component';
import { ModalController } from '@ionic/angular';
import { AdlSecureStorageService } from '../adl-secure-storage.service';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { SecureKeys } from '@app/commons/constants/keys.constants';

const SPI_TRANSFER_CONSENT_MODAL_ID = 'spi-transfer-consent-modal';

@Injectable({
  providedIn: 'root'
})
export class SpiConsentService {
  private facade = inject(HomeFacade);
  private modalCtrl = inject(ModalController);
  private secureStorage = inject(AdlSecureStorageService);

  public fetchSpiConsent() {
    const isSPITransferConsentModalEnabled =
      this.isSPITransferConsentModalEnabled();

    if (isSPITransferConsentModalEnabled) {
      this.checkSPIConsentInStorage();
    }
  }

  public async presentSpiConsentModal() {
    const skipSPITransferConsentFlag = this.isConsentSkippable();

    const currentModal = await this.modalCtrl.getTop();
    if (currentModal) {
      if (currentModal.id === SPI_TRANSFER_CONSENT_MODAL_ID) return;
    }

    const modal = await this.modalCtrl.create({
      id: SPI_TRANSFER_CONSENT_MODAL_ID,
      component: SpiTransferConsentComponent,
      componentProps: {
        skipSPITransferConsent: !!skipSPITransferConsentFlag,
        skipSPITransferConsentXOption: !!this.facade.featureFlagsByKey(
          FeatureFlagsKey.SkipSPITransferConsentXOption
        )
      },
      mode: 'md',
      cssClass: 'avv-custom-modal',
      backdropDismiss: !!skipSPITransferConsentFlag
    });
    await modal.present();
    const { data = false } = await modal.onDidDismiss();

    if (data) {
      this.facade.acceptSpiConsent();
    }
  }

  private isSPITransferConsentModalEnabled(): boolean {
    return !!this.facade.featureFlagsByKey(
      FeatureFlagsKey.ShowSPITransferConsentModal
    );
  }

  private async checkSPIConsentInStorage(): Promise<void> {
    try {
      const db = await this.secureStorage.getAll();
      const hasAcceptedConsent = getDBValue(db, SecureKeys.spiAuthorization);
      const isSpiConsentCalled = getDBValue(db, SecureKeys.isSpiConsentCalled);

      if (!hasAcceptedConsent) {
        isSpiConsentCalled
          ? this.presentSpiConsentModal()
          : this.facade.fetchSPIAuthorization();
      }
    } catch (error) {
      console.error(
        'Error al obtener el consentimiento SPI del almacenamiento:',
        error
      );
    }
  }

  private isConsentSkippable(): boolean {
    return !!this.facade.featureFlagsByKey(
      FeatureFlagsKey.SkipSPITransferConsent
    );
  }
}
