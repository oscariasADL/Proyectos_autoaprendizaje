import { PushNotificationChannelEnum } from '../constanst/notification.constants';

export interface PushNotificationApprovalPayload {
  engineRiskFingerPrint: string;
  engineRiskTokenCookie: string;
  engineRiskUUID: string;
  engineRiskUserAgent: string;
  otpInfo: string;
  secFactorDesc: string;
  enhancedParam: CustomFactsOfPushNotification;
  userInfo: {
    documentNumber: string;
    documentType: string;
    ipAddress: string;
  };
  reference: string;
  deleteId: string;
  userCode: string;
}

export interface PushNotificationRejectPayload {
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
}

export interface CustomFactsOfPushNotification {
  dtlFld3?: string;
  dtlFld2?: string;
  cellphone?: string;
  email: string;
  nicknameTransaction: string;
  nicknameAccount: string;
  accountNumber: string;
  amount: string;
  date: string;
  ip: string;
  uuidTransaction: string;
  deviceTokenCookie: string;
  idTransaction: string;
  channel: PushNotificationChannelEnum;
}
