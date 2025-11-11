import {
  AlertSheetProperties,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';
import {
  CustomFactsOfPushNotification,
  PushNotificationApprovalPayload,
  PushNotificationRejectPayload
} from '../entities/push-notification.interface';
import { DecryptSecureChannelMessageBodyOptions } from '@avaldigitallabs/one-span-digipass';
import { DataBasicClientDto } from '@app/commons/entities/auth/auth.entities';
import { AdlDigipassService } from '@app/commons/services/adl-digipass.service';
import { CurrencyFormatPipe } from '@app/commons/pipes/currency-format.pipe';
import { TranslateService } from '@ngx-translate/core';
import { PushNotificationChannelEnum } from '../constanst/notification.constants';
import { format } from 'date-fns';
import { NotificationItem } from '@app/commons/entities/notifications/notification.entities';

export function mapCustomFactsOfPushNotification(
  decryptedMessage: any
): CustomFactsOfPushNotification {
  const {
    DTL_FLD2,
    DTL_FLD3,
    CELULAR,
    CORREO,
    NICKNAME_TRANSACTION,
    NICKNAME_ACCOUNT,
    NUMBER_ACCOUNT,
    AMOUNT,
    DATE,
    IP,
    UUID_TRANSACTION,
    DEVICE_TOKEN_COOKIE,
    ID_TRANSACTION,
    CHANNEL
  } = decryptedMessage;

  return {
    dtlFld2: DTL_FLD2,
    dtlFld3: DTL_FLD3,
    cellphone: CELULAR,
    email: CORREO,
    nicknameTransaction: NICKNAME_TRANSACTION,
    nicknameAccount: NICKNAME_ACCOUNT,
    accountNumber: NUMBER_ACCOUNT,
    amount: AMOUNT,
    date: DATE,
    ip: IP,
    uuidTransaction: UUID_TRANSACTION,
    deviceTokenCookie: DEVICE_TOKEN_COOKIE,
    idTransaction: ID_TRANSACTION,
    channel: CHANNEL as PushNotificationChannelEnum
  };
}

export function mapPushNotificationAlert(
  customFacts: CustomFactsOfPushNotification,
  translateService: TranslateService
): AlertSheetProperties {
  return {
    type: AlertSheetType.question,
    icon: 'illustrations/wallet.svg',
    id: 'pocket-update-confirm-exit-alert',
    title: 'NOTIFICATION.TRANSACTION_ATHORIZATION.ALERT.TITLE',
    description: mapPushNotificationAlertMessage(customFacts, translateService),
    buttons: [
      'NOTIFICATION.TRANSACTION_ATHORIZATION.ALERT.ACTIONS.BUTTON',
      'NOTIFICATION.TRANSACTION_ATHORIZATION.ALERT.ACTIONS.BUTTON_CANCEL'
    ]
  };
}

function mapPushNotificationAlertMessage(
  customFacts: CustomFactsOfPushNotification,
  translateService: TranslateService
): string {
  const currencyFormat = new CurrencyFormatPipe('en-US');

  return translateService.instant('PUSH_NOTIFICATIONS.ALERT_MESSAGE', {
    nicknameTransaction: customFacts.nicknameTransaction,
    nicknameAccount: customFacts.nicknameAccount,
    accountNumber: customFacts.accountNumber,
    amount: currencyFormat.transform(customFacts.amount),
    date: format(new Date(customFacts.date), 'dd/MM/yyyy HH:mm:ss')
  });
}

async function createBasePayload(
  customFacts: CustomFactsOfPushNotification,
  userData: DataBasicClientDto,
  adlDigipass: AdlDigipassService,
  notificationItem: NotificationItem
): Promise<{
  engineRiskFingerPrint: string;
  engineRiskTokenCookie: string;
  engineRiskUUID: string;
  engineRiskUserAgent: string;
  secFactorDesc: string;
  userInfo: {
    documentNumber: string;
    documentType: string;
    ipAddress: string;
  };
  reference: string;
  deleteId: string;
  userCode: string;
}> {
  const fingerprint = await adlDigipass.fingerprint();

  return {
    engineRiskFingerPrint: fingerprint,
    engineRiskTokenCookie: customFacts.deviceTokenCookie,
    engineRiskUUID: customFacts.uuidTransaction,
    engineRiskUserAgent: '',
    secFactorDesc: customFacts.idTransaction,
    userInfo: {
      documentNumber: userData.documentNumber,
      documentType: userData.documentType,
      ipAddress: customFacts.ip ? customFacts.ip : userData.ip
    },
    reference: notificationItem.reference,
    deleteId: notificationItem.deleteId,
    userCode: notificationItem.userCode
  };
}

export async function mapNotificationApprovalPayload(
  customFacts: CustomFactsOfPushNotification,
  userData: DataBasicClientDto,
  adlDigipass: AdlDigipassService,
  notificationItem: NotificationItem
): Promise<PushNotificationApprovalPayload> {
  try {
    const basePayload = await createBasePayload(
      customFacts,
      userData,
      adlDigipass,
      notificationItem
    );
    const fingerprint = await adlDigipass.fingerprint();
    const options: DecryptSecureChannelMessageBodyOptions = {
      secureChannelMessageRequest: notificationItem.message,
      staticVector: await adlDigipass.staticVector(),
      dynamicVector: await adlDigipass.dynamicVector(),
      fingerprint: fingerprint
    };

    const { dynamicCode } =
      await adlDigipass.generateSignatureFromSecureChannel(options);
    const pushNotificationApprovalPayload: PushNotificationApprovalPayload = {
      ...basePayload,
      otpInfo: dynamicCode,
      enhancedParam: customFacts
    };

    return pushNotificationApprovalPayload;
  } catch (error) {
    console.log('Error al hacer mapNotificationApprovalPayload.');
  }
}

export async function mapNotificationRejectPayload(
  customFacts: CustomFactsOfPushNotification,
  userData: DataBasicClientDto,
  adlDigipass: AdlDigipassService,
  notificationItem: NotificationItem
): Promise<PushNotificationRejectPayload> {
  const basePayload = await createBasePayload(
    customFacts,
    userData,
    adlDigipass,
    notificationItem
  );

  const pushNotificationRejectPayload: PushNotificationRejectPayload = {
    ...basePayload
  };
  return pushNotificationRejectPayload;
}

export function mapPushNotificationApprovedError(
  pushNotificationApprovalPayload: PushNotificationApprovalPayload
): AlertSheetProperties {
  return {
    type: AlertSheetType.question,
    icon: 'illustrations/error-cellphone.svg',
    id: 'push-notification-approved-error-alert',
    title: 'PUSH_NOTIFICATIONS.APPROVAL.ALERT_ERROR.TITLE',
    description:
      pushNotificationApprovalPayload.enhancedParam.channel ===
      PushNotificationChannelEnum.MOBILE
        ? 'PUSH_NOTIFICATIONS.APPROVAL.ALERT_ERROR.MOBILE_DESCRIPTION'
        : 'PUSH_NOTIFICATIONS.APPROVAL.ALERT_ERROR.WEB_DESCRIPTION',
    buttons: [
      'PUSH_NOTIFICATIONS.APPROVAL.ALERT_ERROR.ACTIONS.BUTTON',
      'PUSH_NOTIFICATIONS.APPROVAL.ALERT_ERROR.ACTIONS.BUTTON_CANCEL'
    ]
  };
}
