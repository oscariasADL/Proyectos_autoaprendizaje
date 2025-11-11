export interface Contributor {
  documentType: string;
  documentId: string;
  fullName: string;
  category?: string;
}

export interface PaymentSocialSecurityPayload {
  productOrigin: {
    accountType: string;
    accountId: string;
  };
  referenceId: string;
  invoiceNumber: string;
  agreementType: number;
  maxPaymentDateComplete: string;
  amount: string;
  biller: boolean;
  organizationId: string;
  amountType: string;
}

export interface PaymentSocialSecurityResponse {
  moreInformation: string;
  httpMessage: string;
  requestId: string;
  approvalId: string;
  rqUID: string;
  msgRsHdr: string;
  httpCode: string;
  paymentDate: string;
  transactionDate: string;
  athResponseError: boolean;
  status: string;
}

export interface SocialSecurityPinPayload {
  identificationData: {
    idType: string;
    id: string;
  };
  agreementId: string;
  referenceId: string;
  referenceType: string;
}

export interface SocialSecurityPinResponse {
  referenceId: string;
  agreementType: number;
  invoiceNumber: string;
  maxPaymentDate?: string;
  maxPaymentDateComplete: string;
  amount: number;
  amountType: string;
  biller: boolean;
  paid?: boolean;
}

export enum PaymentSocialSecurityWorksheetType {
  hasWorksheet = 'hasWorksheet',
  notWorksheet = 'notWorksheet'
}
