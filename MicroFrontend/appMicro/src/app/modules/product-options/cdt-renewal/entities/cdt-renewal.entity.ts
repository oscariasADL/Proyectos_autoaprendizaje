export enum CdtRenewalStatus {
  ACTIVE = 'S',
  INACTIVE = 'N'
}

export interface CdtRenewalResponse {
  productId: string;
  numberProduct: string;
  expDate: string;
  reInvest: CdtRenewalStatus;
}

export interface CdtRenewalRequest {
  productId: string;
  reInvest: CdtRenewalStatus;
}
