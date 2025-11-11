import { Platform } from '@commons/constants/global.constants';
import { DigitalCardStructure } from '@commons/capacitor-web-plugins/digital-wallet';

export interface StartWalletModalProps {
  title: string;
  icon: string;
  items: { icon: string; description: string }[];
  platform?: Platform;
  actionButton: string;
  cancelButton: string;
}

export interface CreateWalletResponse {
  walletInfo: {
    internalWalletId: string;
    activationCode: string;
  };
  activationCodeEnc: string;
}

export interface DigitalCardStructureExt extends DigitalCardStructure {
  canPushCardInWalletPay: boolean;
}

export interface GroupedDigitalCards {
  type: string;
  cards: DigitalCardStructureExt[];
}

export interface CardDetail {
  acctId: string;
  cardNumber: string;
  cardNumberDecrypted: string;
  cardEmbossNum: string;
  encryptedCardNumber: string;
  ccMotoAcct: {
    expDt: string;
    expDateDecrypted: string;
    cardVrfyData: string;
    walletInfo: Array<any>;
  };
}

export interface PrepareCardEnrollmentDataPayload {
  cardAcctId: {
    cardSeqNum: string;
    cardEmbossNum: string;
    ccMotoAcct: {
      expDt: string;
      name: string;
      walletInfo: {
        idWallet: string;
      };
    };
  };
}

export interface PrepareCardEnrollmentDataResponse {
  enrollmentData: string;
}

export enum WalletServicesStatus {
  ACTIVE = 'Active',
  DISABLED = 'Disabled',
  NOT_CONFIGURED_BY_USER = 'notConfiguredByUser',
  NOT_SUPPORTED_BY_DEVICE = 'notSupportedByDevice'
}
