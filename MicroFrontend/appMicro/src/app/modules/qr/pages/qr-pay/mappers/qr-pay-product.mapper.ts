import { TypeAccount } from '@commons/entities/product/type-account';
import {
  QrPaymentMethod,
  QrPaymentMethodData,
  QrPaymentMethods
} from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';

export function mapPaymentMethods(
  paymentMethod: QrPaymentMethods
): QrPaymentMethod {
  return {
    creditCards: paymentMethod.paymentMethods
      .filter((product) => product?.accountType === TypeAccount.CCA)
      .map((product) => ({
        ...product,
        id: product?.accountId,
        type: TypeAccount.CCA,
        cardType: product?.cardType,
        franchise: product?.accountFranchise,
        numberProduct: product?.accountNumber,
        availableBalance: product?.accountBalance,
        availablePurchasesBalance: product?.accountBalance,
        paymentType: 'credit'
      })),
    debitAccounts: paymentMethod.paymentMethods
      .filter((product) =>
        [TypeAccount.SDA, TypeAccount.DDA].includes(
          product?.accountType as TypeAccount
        )
      )
      .map((product) => ({
        ...product,
        id: product?.accountId,
        type: product.accountType,
        typeName: 'Cuenta de Ahorros',
        numberProduct: product?.accountNumber,
        availableBalance: product?.accountBalance,
        paymentType: 'debit'
      }))
  };
}

export function mapQrPaymentMethodData(
  qrPaymentMethodData: QrPaymentMethodData
): QrPaymentMethodData {
  return {
    ...qrPaymentMethodData,
    paymentMethod: {
      ...qrPaymentMethodData.paymentMethod,
      ...(qrPaymentMethodData.paymentMethod.accountType === TypeAccount.CCA
        ? {
            id: qrPaymentMethodData.paymentMethod.accountId,
            type: TypeAccount.CCA,
            cardType: qrPaymentMethodData.paymentMethod.cardType,
            franchise: qrPaymentMethodData.paymentMethod.accountFranchise,
            numberProduct: qrPaymentMethodData.paymentMethod.accountNumber,
            availableBalance: qrPaymentMethodData.paymentMethod.accountBalance,
            availablePurchasesBalance:
              qrPaymentMethodData.paymentMethod.accountBalance
          }
        : {
            id: qrPaymentMethodData.paymentMethod.accountId,
            type: TypeAccount.SDA,
            typeName: 'Cuenta de Ahorros',
            numberProduct: qrPaymentMethodData.paymentMethod.accountNumber,
            availableBalance: qrPaymentMethodData.paymentMethod.accountBalance
          })
    }
  };
}
