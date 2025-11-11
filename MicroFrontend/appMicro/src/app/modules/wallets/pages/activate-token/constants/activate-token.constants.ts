import { InfoActivationData } from '@modules/wallets/pages/activate-token/entities/activate-token.interface';

export const ACTIVATION_SUCCESS: InfoActivationData = {
  icon: 'iconsV2/card-hand.svg',
  title: 'WALLETS.ACTIVATE_TOKEN.SUCCESS.TITLE',
  description: 'WALLETS.ACTIVATE_TOKEN.SUCCESS.DESCRIPTION',
  button: 'WALLETS.ACTIVATE_TOKEN.SUCCESS.BUTTON_1'
};

export const ACTIVATION_ERROR: InfoActivationData = {
  icon: 'iconsV2/process-error.svg',
  title: 'WALLETS.ACTIVATE_TOKEN.ERROR.TITLE',
  description: 'WALLETS.ACTIVATE_TOKEN.ERROR.DESCRIPTION',
  button: 'WALLETS.ACTIVATE_TOKEN.ERROR.BUTTON_1'
};
