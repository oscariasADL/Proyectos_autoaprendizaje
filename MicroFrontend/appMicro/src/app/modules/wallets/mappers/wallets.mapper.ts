import {
  CardDetail,
  PrepareCardEnrollmentDataPayload
} from '@modules/wallets/entities/wallets.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export function mapPrepareCardEnrollmentDataPayload(
  cardDetail: CardDetail,
  fullName: string,
  idWallet: string
): PrepareCardEnrollmentDataPayload {
  return {
    cardAcctId: {
      cardSeqNum: cardDetail.acctId,
      cardEmbossNum: cardDetail.encryptedCardNumber,
      ccMotoAcct: {
        expDt: cardDetail.ccMotoAcct.expDateDecrypted,
        name: fullName,
        walletInfo: {
          idWallet
        }
      }
    }
  };
}

export function mapValidateAndPushCardError(error: {
  error: {
    message: string;
  };
}): AlertSheetProperties {
  const errorObj = error?.error;
  return {
    type: AlertSheetType.error,
    id: 'validate-and-push-card-error-alert',
    title: 'WALLETS.APPLE_PAY.PUSH_PROCESS.TITLE_ERROR',
    description: errorObj?.message ?? 'WALLETS.GENERAL_ERROR'
  };
}

export function mapStartWalletProcessErrorAlert(error: {
  message: string;
}): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'validate-and-push-card-error-alert',
    title: 'WALLETS.APPLE_PAY.PUSH_PROCESS.TITLE_ERROR',
    description: 'WALLETS.PROVISIONING.PROVISIONING_ERROR'
  };
}
