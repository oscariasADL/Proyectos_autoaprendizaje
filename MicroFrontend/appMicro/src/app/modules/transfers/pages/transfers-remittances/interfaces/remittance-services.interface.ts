import { TypeAccount } from '@app/commons/entities/product/type-account';

export interface CreateCustomer {
  numberAccount: string;
  typeAccount: string;
}
export interface CreateCustomerResponse {
  document: string;
  documentType: string;
  numberAccount: string;
  typeAccount: TypeAccount;
  cellphone: string;
  clientName: string;
  registerDate: string;
  registerIp: string;
  approvalId: string;
  nameWallet: string;
}
export interface CheckCustomerResult {
  tokenInfo: TokenInfo;
  infoAccount?: InfoAccount;
  customer: CustomerRemittancesType;
}
export enum CustomerRemittancesType {
  F = 'F',
  R = 'R',
  P = 'P',
  A = 'A'
}
export interface InfoAccount {
  document: string;
  documentType: string;
  cellphone: string;
  numberAccount: string;
  clientName: string;
  nameWallet: string;
}

export interface TokenInfo {
  accessToken: string;
}
