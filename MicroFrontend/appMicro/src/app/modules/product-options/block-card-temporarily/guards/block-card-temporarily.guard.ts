import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';

import { ModalController } from '@commons/controllers/modal.controller';
import { BlockCardTemporarilyConfirmationModalComponent } from '@modules/product-options/block-card-temporarily/components/block-card-temporarily-confirmation-modal/block-card-temporarily-confirmation-modal.component';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';

export const BlockCardTemporarilyCanActivate: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const facade = inject(SecurityMediaActivationFacade);
  const modalCtrl = inject(ModalController);

  const modal = await modalCtrl.create({
    id: 'block-card-temporarily-confirmation-modal',
    component: BlockCardTemporarilyConfirmationModalComponent,
    componentProps: {
      confirmationModalContent: {
        icon: 'icons/block-card.svg',
        title: 'BLOCK_CARD_TEMPORARILY.MODAL_BLOCK.TITLE',
        description: 'BLOCK_CARD_TEMPORARILY.MODAL_BLOCK.DESCRIPTION',
        confirmButtonText:
          'BLOCK_CARD_TEMPORARILY.MODAL_BLOCK.CONFIRM_BUTTON_TEXT',
        cancelButtonText:
          'BLOCK_CARD_TEMPORARILY.MODAL_BLOCK.CANCEL_BUTTON_TEXT'
      }
    },
    mode: 'md',
    cssClass: 'avv-custom-modal'
  });

  await modal.present();

  return modal.onDidDismiss().then(({ data: response }) => {
    if (response) {
      facade.fetchProductsToActivate();
      return true;
    }

    return false;
  });
};
