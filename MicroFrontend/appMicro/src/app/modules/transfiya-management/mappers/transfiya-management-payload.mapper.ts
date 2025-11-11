import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import { TransfiyaPayload } from '@modules/transfers/entities/transfers.interface';
import { UserData } from '@commons/entities/auth/auth.entities';

export function mapTransfiyaManagementPayload(values: any): TransfiyaPayload {
  const { type: productType, id: productId }: Product = values.productSelected;
  const {
    note,
    amount,
    targetNumber,
    transactionId
  }: TransfiyaAuthorizationItem = values.notification;
  const nickname: string = values.nickname;
  const { dataBasicClientDto: userData } = values.userData as UserData;
  const isDefaultAccount = values.isDefaultAccount;

  return {
    amount,
    targetNumber,
    account: { productType, productId },
    extraFields: { note, transactionId, referenceId: '', applyTrx: true },
    firstName: userData.firstName,
    lastName: userData.lastName,
    ...(!isNullOrUndefinedOrEmpty(nickname) ? { nickname } : {}),
    ...(isDefaultAccount ? { defaultAccount: isDefaultAccount } : {})
  };
}

export function mapRejectTransfiyaManagementPayload(
  values: any
): TransfiyaPayload {
  const {
    note,
    amount,
    targetNumber,
    transactionId
  }: TransfiyaAuthorizationItem = values.notification;
  const { dataBasicClientDto: userData } = values.userData as UserData;

  return {
    amount,
    targetNumber,
    account: { productType: TypeAccount.SDA, productId: '0' },
    extraFields: { note, transactionId, referenceId: '', applyTrx: false },
    firstName: userData.firstName,
    lastName: userData.lastName
  };
}
