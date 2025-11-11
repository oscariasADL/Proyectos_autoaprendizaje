import { StartWalletModalProps } from '@modules/wallets/entities/wallets.interface';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const DEBIT_CARD_BIN = '518503';

export const TIME_LIMIT_WAITING_PUSH_CARD_ACTION = 10_000;

export const START_WALLET_IOS_MODAL: StartWalletModalProps = {
  title: 'WALLETS.APPLE_PAY.START_WALLET_ALERT_MODAL.TITLE',
  icon: 'wallets/apple-pay-logo.svg',
  items: [
    {
      icon: 'icon-payment-wristband',
      description: 'WALLETS.APPLE_PAY.START_WALLET_ALERT_MODAL.ICON_LIST.ITEM1'
    },
    {
      icon: 'icon-seguridad2',
      description: 'WALLETS.APPLE_PAY.START_WALLET_ALERT_MODAL.ICON_LIST.ITEM2'
    }
  ],
  actionButton: 'WALLETS.APPLE_PAY.START_WALLET_ALERT_MODAL.ACTION_BUTTON',
  cancelButton: 'ACTIONS.CANCEL'
};

export const START_WALLET_ANDROID_MODAL: StartWalletModalProps = {
  title: 'WALLETS.GOOGLE_PAY.START_WALLET_ALERT_MODAL.TITLE',
  icon: 'wallets/google-wallet-logo.svg',
  items: [
    {
      icon: 'icon-phone-card',
      description: 'WALLETS.GOOGLE_PAY.START_WALLET_ALERT_MODAL.ICON_LIST.ITEM1'
    },
    {
      icon: 'icon-security-shield',
      description: 'WALLETS.GOOGLE_PAY.START_WALLET_ALERT_MODAL.ICON_LIST.ITEM2'
    },
    {
      icon: 'icon-payment-terminal',
      description: 'WALLETS.GOOGLE_PAY.START_WALLET_ALERT_MODAL.ICON_LIST.ITEM3'
    }
  ],
  actionButton: 'WALLETS.GOOGLE_PAY.START_WALLET_ALERT_MODAL.ACTION_BUTTON',
  cancelButton: 'ACTIONS.CANCEL'
};

export const WALLET_CONTINUE_PROCESS_APPLE_WALLET_ALERT: AlertSheetProperties =
  {
    id: 'wallet-continue-process-apple-wallet-alert',
    type: AlertSheetType.question,
    componentType: AlertComponentType.alertSheet,
    icon: 'wallets/apple-pay-logo.svg',
    title: 'WALLETS.APPLE_PAY.HOME.CONTINUE_PROCESS_ALERT.TITLE',
    description: 'WALLETS.APPLE_PAY.HOME.CONTINUE_PROCESS_ALERT.DESCRIPTION',
    buttons: ['ACTIONS.CONTINUE', 'ACTIONS.CANCEL']
  };

export const WALLET_CONTINUE_PROCESS_GOOGLE_WALLET_ALERT: AlertSheetProperties =
  {
    id: 'wallet-continue-process-google-wallet-alert',
    type: AlertSheetType.question,
    componentType: AlertComponentType.alertSheet,
    icon: 'wallets/google-wallet-logo.svg',
    title: 'WALLETS.GOOGLE_PAY.HOME.CONTINUE_PROCESS_ALERT.TITLE',
    description: 'WALLETS.GOOGLE_PAY.HOME.CONTINUE_PROCESS_ALERT.DESCRIPTION',
    buttons: ['ACTIONS.CONTINUE', 'ACTIONS.CANCEL']
  };

export const WALLET_CARD_LIST_MOCK = [
  {
    id: '4960802010000262',
    status: 'Active',
    lastDigits: '0262',
    bin: '496080',
    expirationDate: '0329',
    imageIsLoaded: true
  },
  {
    id: '5185036789012346',
    status: 'Active',
    lastDigits: '0263',
    bin: '518503',
    expirationDate: '0327',
    imageIsLoaded: true
  },
  {
    id: '4532987654321123',
    status: 'Active',
    lastDigits: '0261',
    bin: '453298',
    expirationDate: '0325',
    imageIsLoaded: true
  },
  {
    id: '5185034567890123',
    status: 'Active',
    lastDigits: '0260',
    bin: '518503',
    expirationDate: 'true',
    imageIsLoaded: false
  }
];
