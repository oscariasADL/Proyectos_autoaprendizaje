import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  handleCreateWalletEvents,
  handleWalletProvisioningEligibilityEvents,
  handleWalletProvisioningInitializeEvents,
  handleWalletProvisioningStatusEvents,
  selectStartWalletModal
} from '@modules/wallets/helpers/provisioning.helpers';
import { WalletsService } from '@modules/wallets/services/wallets.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { StartWalletModalComponent } from '@modules/wallets/components/start-wallet-modal/start-wallet-modal.component';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import { AlertService } from '@commons/services/alert.service';
import { mapStartWalletProcessErrorAlert } from '@modules/wallets/mappers/wallets.mapper';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';

export const ProvisioningGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const modalCtrl = inject(ModalController);
  const service = inject(WalletsService);
  const digitalWalletContextService = inject(DigitalWalletContextService);
  const alertService = inject(AlertService);
  const walletsFacade = inject(WalletsFacade);
  const deviceOs: string = await firstValueFrom(
    walletsFacade.deviceInfo$.pipe(map(({ deviceOS }) => deviceOS))
  );

  try {
    if (!Capacitor.isNativePlatform()) {
      const { walletId } = await digitalWalletContextService.getWalletId();
      walletsFacade.setWalletId(walletId);
      return true;
    }

    walletsFacade.enableLoading();
    const { wallet: isWalletCreated } =
      await digitalWalletContextService.isWalletCreated();
    if (isWalletCreated) {
      const { walletId } = await digitalWalletContextService.getWalletId();
      walletsFacade.setWalletId(walletId);
      return true;
    }

    await digitalWalletContextService.validateWalletStatus();
    const isConnectionSuccess = await handleWalletProvisioningStatusEvents();
    if (isConnectionSuccess) {
      const { walletId } = await digitalWalletContextService.getWalletId();
      walletsFacade.setWalletId(walletId);
      return true;
    }

    walletsFacade.disableLoading();
    const modal = await modalCtrl.create({
      component: StartWalletModalComponent,
      componentProps: {
        startWalletModalProps: {
          ...selectStartWalletModal(deviceOs),
          platform: deviceOs
        }
      },
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data: isAccepted } = await modal.onDidDismiss();
    if (!isAccepted) return false;

    walletsFacade.enableLoading();
    await digitalWalletContextService.initializeWalletProvisioning();
    const isInitialized = await handleWalletProvisioningInitializeEvents();
    if (!isInitialized)
      throw new Error('WALLETS.PROVISIONING.PROVISIONING_ERROR');

    await digitalWalletContextService.checkEligibility();
    const isEligible = await handleWalletProvisioningEligibilityEvents();
    if (!isEligible) throw new Error('WALLETS.PROVISIONING.PROVISIONING_ERROR');

    const createWalletResponse = await lastValueFrom(service.createWallet());
    const walletInfo = createWalletResponse.walletInfo;

    await digitalWalletContextService.createWallet({
      activationCode: walletInfo.activationCode
    });
    const isSuccessfullyCreationWallet = await handleCreateWalletEvents();
    if (!isSuccessfullyCreationWallet)
      throw new Error('WALLETS.PROVISIONING.PROVISIONING_ERROR');

    const isConnectionSuccessV2 = await handleWalletProvisioningStatusEvents();
    if (!isConnectionSuccessV2)
      throw new Error('WALLETS.PROVISIONING.PROVISIONING_ERROR');

    const { walletId: walletIdAux } =
      await digitalWalletContextService.getWalletId();
    walletsFacade.setWalletId(walletIdAux);

    return Promise.resolve(true);
  } catch (error) {
    void alertService.create(mapStartWalletProcessErrorAlert(error));
    return Promise.resolve(false);
  } finally {
    walletsFacade.disableLoading();
  }
};
