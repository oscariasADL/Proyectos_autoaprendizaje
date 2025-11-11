import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { OnboardingComponent } from '@app/modules/onboarding/components/onboarding/onboarding.component';
import { ModalController } from '@ionic/angular';
import { FAVORITE_ONBOARDING_SLIDES } from '../constants/favorites.contants';

export const favoritesOnboardingGuardCanActivate: CanActivateFn =
  async (): Promise<boolean> => {
    const modalCtrl = inject(ModalController);
    const secureStorage = inject(AdlSecureStorageService);

    const key = SecureKeys.favoritesOnboarding;
    const db = await secureStorage.getAll();
    const isHiddenPanel = !!getDBValue(db, key);

    if (isHiddenPanel) {
      return true;
    }

    const modal = await modalCtrl.create({
      component: OnboardingComponent,
      componentProps: {
        onboardingSliders: FAVORITE_ONBOARDING_SLIDES,
        continueButtonLabel: 'FAVORITES.ONBOARDING.CONTINUE'
      },
      id: 'favorites-onboarding-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    await secureStorage.put(key, 'notShowAgain', true);
  };
