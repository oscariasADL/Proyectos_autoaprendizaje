import { TypeAccount } from '@commons/entities/product/type-account';

export const TYPE_ACCOUNT_TRANSFER_ACCOUNTS: TypeAccount[] = [
  TypeAccount.SDA,
  TypeAccount.DDA,
  TypeAccount.DEL
];

export const TYPE_ACCOUNT_PAYMENT_CREDITS: TypeAccount[] = [
  TypeAccount.CCA,
  TypeAccount.DE,
  TypeAccount.CH
];

export enum ContactProductActionType {
  transfer = 'transfer',
  payment = 'payment',
  none = 'none'
}
