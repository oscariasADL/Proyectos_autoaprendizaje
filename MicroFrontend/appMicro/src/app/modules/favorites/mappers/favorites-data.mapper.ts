import {
  TransferCel2celPayload,
  TransferPayload,
  TransferType
} from '@modules/transfers/entities/transfers.interface';
import { RechargePayload } from '@modules/product-options/recharges/entities/recharges.interface';
import {
  ChannelType,
  WithdrawPayload
} from '@modules/withdraw/entities/withdraw.interface';
import {
  ACTION_LABEL,
  Favorite,
  IdentificationFavoriteType,
  SubtypeOperations,
  TypeTarget
} from '@modules/favorites/entities/favorites.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { TransactionCostIds } from '@commons/entities/fee/fee.interface';
import { PayBillPayload } from '@modules/payments/payment-services/entities/payment-services.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function mapFavoritesData(
  name: string,
  type: IdentificationFavoriteType,
  data:
    | TransferPayload
    | RechargePayload
    | WithdrawPayload
    | PayBillPayload
    | TransferCel2celPayload
): Favorite {
  function getSubTypeOperation(dataTransfer: TransferPayload): {
    type: TransferType;
    operation: SubtypeOperations;
    label: string;
  } {
    const transferMappings = [
      {
        type: TransferType.FAST_TRANSFER,
        operation: SubtypeOperations.TRANSFER_AVV_ACC,
        label: 'Av Villas'
      },
      {
        type: TransferType.MY_ACCOUNTS_AVV,
        operation: SubtypeOperations.TRANSFER_MY_AVV_ACCOUNTS,
        label: 'Av Villas'
      },
      {
        type: TransferType.MY_CONTACTS,
        operation: SubtypeOperations.REGISTERED_CONTACTS,
        label: 'Contacto Inscrito'
      }
    ];
    const defaultOperation = {
      label: 'A celulares AV Villas',
      type: TransferType.SEND_CEL2CEL,
      operation: SubtypeOperations.TRANSFER_AVV_PHONE
    };
    return (
      transferMappings.find(
        (mapping) => mapping.type === dataTransfer.transferType
      ) ?? defaultOperation
    );
  }

  const MAPPER = {
    [IdentificationFavoriteType.TRANSFER]: (): Favorite => {
      const dataTransfer = data as TransferPayload;
      if (
        [
          TransferType.FAST_TRANSFER,
          TransferType.SEND_AVV_PHONE,
          TransferType.MY_ACCOUNTS_AVV,
          TransferType.MY_CONTACTS
        ].includes(dataTransfer.transferType)
      ) {
        const { operation, label } = getSubTypeOperation(dataTransfer);

        return {
          nameFavoriteTransaction: name,
          identificationFavoriteType: type,
          sourceAccountTransaction: {
            typeAcctTransaction: dataTransfer.sourceAccount
              .productType as TypeAccount,
            idAcctTransaction: dataTransfer.sourceAccount.productId
          },
          targetAccountTransaction: {
            typeAcctTransaction: dataTransfer.targetAccount
              .productType as TypeAccount,
            idAcctTransaction: dataTransfer.targetAccount.productId
          },
          additionalDataTransaction: {
            subtypeOperation: operation,
            from: dataTransfer.sourceAccount.productId,
            ...(TransferType.MY_CONTACTS === dataTransfer.transferType
              ? { target: dataTransfer.targetAccount.accountNumber }
              : { target: dataTransfer.targetAccount.productId }),
            descriptionTargetLabel: label,
            typeTarget: [
              TransferType.FAST_TRANSFER,
              TransferType.MY_ACCOUNTS_AVV,
              TransferType.MY_CONTACTS
            ].includes(dataTransfer.transferType)
              ? TypeTarget.ACCOUNT
              : TypeTarget.CELLPHONE,
            actionLabel: ACTION_LABEL[type],
            transactionCostId: TransactionCostIds.TransferToAVVillas,
            note: dataTransfer?.extraFields?.note,
            referenceId: dataTransfer?.extraFields?.referenceId,
            ...(dataTransfer.transferType === TransferType.MY_CONTACTS
              ? {
                  targetBank: dataTransfer.contactInfo.accountInfo.bank,
                  contactId: dataTransfer.contactInfo.contactId.id,
                  contactIdType: dataTransfer.contactInfo.contactId.idType
                }
              : {}),
            ...(TransferType.MY_CONTACTS === dataTransfer.transferType
              ? { numberProduct: dataTransfer.sourceAccount.accountNumber }
              : {})
          }
        };
      } else if (
        [TransferType.SEND_TRANSFIYA, TransferType.SEND_CEL2CEL].includes(
          dataTransfer.transferType
        )
      ) {
        const dataTransferCel2Cel = data as TransferCel2celPayload;
        const isCel2cel =
          TransferType.SEND_CEL2CEL === dataTransfer.transferType;

        return {
          nameFavoriteTransaction: name,
          identificationFavoriteType: type,
          sourceAccountTransaction: {
            typeAcctTransaction: dataTransferCel2Cel.sourceAccount
              .productType as TypeAccount,
            idAcctTransaction: dataTransferCel2Cel.sourceAccount.productId
          },
          targetAccountTransaction: {
            typeAcctTransaction: isCel2cel
              ? (dataTransferCel2Cel.targetAccount.productType as TypeAccount)
              : TypeAccount.CEL,
            idAcctTransaction: isCel2cel
              ? dataTransferCel2Cel.targetAccount.productId
              : dataTransferCel2Cel.txInfo.txTarget
          },
          additionalDataTransaction: {
            subtypeOperation: isCel2cel
              ? SubtypeOperations.CEL2CEL
              : SubtypeOperations.TRANSFIYA,
            from: dataTransferCel2Cel.sourceAccount.productId,
            target: isCel2cel
              ? dataTransferCel2Cel.targetAccount.productId
              : dataTransferCel2Cel.txInfo.txTarget,
            descriptionTargetLabel: isCel2cel
              ? 'A celulares AVAL'
              : 'A celulares transfiya',
            typeTarget: TypeTarget.CELLPHONE,
            actionLabel: ACTION_LABEL[type],
            transactionCostId: isCel2cel ? TransactionCostIds.Transfiya : null,
            note: dataTransferCel2Cel?.extraFields?.note,
            referenceId: dataTransferCel2Cel?.extraFields?.referenceId,
            sourceBank: dataTransferCel2Cel.sourceAccount.bank,
            txType: dataTransferCel2Cel.txInfo.txType,
            txTarget: dataTransferCel2Cel.txInfo.txTarget,
            ...(isCel2cel
              ? {
                  targetBank: dataTransferCel2Cel.targetAccount.bank,
                  additionalTargetInfo: dataTransferCel2Cel.additionalTargetInfo
                }
              : {})
          }
        };
      }
    },
    [IdentificationFavoriteType.RECHARGE]: (): Favorite => {
      const dataRecharge = data as RechargePayload;
      return {
        nameFavoriteTransaction: name,
        identificationFavoriteType: type,
        sourceAccountTransaction: {
          typeAcctTransaction: dataRecharge.productOrigin
            .accountType as TypeAccount,
          idAcctTransaction: dataRecharge.productOrigin.accountId
        },
        targetAccountTransaction: {
          typeAcctTransaction: TypeAccount.CEL,
          idAcctTransaction: dataRecharge.phoneNumber
        },
        additionalDataTransaction: {
          subtypeOperation: SubtypeOperations.RECHARGES,
          from: dataRecharge.productOrigin.accountId,
          target: dataRecharge.phoneNumber,
          descriptionTargetLabel: dataRecharge.mobileOperator,
          mobileOperator: dataRecharge.mobileOperator,
          typeTarget: TypeTarget.CELLPHONE,
          numberProduct: dataRecharge.productOrigin.numberProduct,
          typeName: dataRecharge.productOrigin.typeName,
          actionLabel: ACTION_LABEL[type],
          transactionCostId: TransactionCostIds.PhoneRecharge
        }
      };
    },
    [IdentificationFavoriteType.MONEY_ORDER]: (): Favorite => {
      const dataWithDraw = data as WithdrawPayload;
      return {
        nameFavoriteTransaction: name,
        identificationFavoriteType: type,
        sourceAccountTransaction: {
          typeAcctTransaction: dataWithDraw.sourceProduct
            .productType as TypeAccount,
          idAcctTransaction: dataWithDraw.sourceProduct.productId
        },
        targetAccountTransaction: {
          typeAcctTransaction: TypeTarget.MONEY_ORDER,
          idAcctTransaction: dataWithDraw.beneficiaryDocumentId
        },
        additionalDataTransaction: {
          subtypeOperation: SubtypeOperations.MONEY_ORDER,
          from: dataWithDraw.sourceProduct.productId,
          target: dataWithDraw.beneficiaryDocumentId,
          descriptionTargetLabel:
            dataWithDraw.channel === ChannelType.ATM
              ? this.translate.instant('WITHDRAW.CHANNEL_TYPE.ATM')
              : this.translate.instant('WITHDRAW.CHANNEL_TYPE.CB'),
          typeTarget: TypeTarget.DOCUMENT,
          channel: dataWithDraw.channel,
          cashoutType: dataWithDraw.cashoutType,
          actionLabel: ACTION_LABEL[type],
          transactionCostId: TransactionCostIds.WithdrawalMoneyOrder
        }
      };
    },
    [IdentificationFavoriteType.PAYMENT]: (): Favorite => {
      const dataPaymentService = data as PayBillPayload;
      return {
        nameFavoriteTransaction: name,
        amountTransaction: dataPaymentService?.biller
          ? dataPaymentService?.amount
          : undefined,
        identificationFavoriteType: type,
        sourceAccountTransaction: {
          typeAcctTransaction: dataPaymentService.productOrigin
            .accountType as TypeAccount,
          idAcctTransaction: dataPaymentService.productOrigin.accountId
        },
        targetAccountTransaction: {
          typeAcctTransaction: TypeTarget.SERVICE,
          idAcctTransaction: dataPaymentService.referenceId
        },
        additionalDataTransaction: {
          subtypeOperation: SubtypeOperations.REGISTERED_SERVICES,
          from: dataPaymentService.productOrigin.accountId,
          target: dataPaymentService.referenceId,
          descriptionTargetLabel: `${dataPaymentService?.organizationName} - Ref de pago:`,
          typeTarget: TypeTarget.SERVICE,
          actionLabel: ACTION_LABEL[type],
          transactionCostId: TransactionCostIds.PaymentBills,
          ...(!isNullOrUndefined(dataPaymentService?.invoiceNumber)
            ? { referenceId: dataPaymentService?.invoiceNumber }
            : {}),
          agreementType: dataPaymentService.agreementType,
          amountType: dataPaymentService.amountType,
          biller: dataPaymentService.biller,
          ...(!isNullOrUndefined(dataPaymentService?.maxPaymentDateComplete)
            ? {
                maxPaymentDateComplete:
                  dataPaymentService.maxPaymentDateComplete
              }
            : {}),
          organizationId: dataPaymentService.organizationId
        }
      };
    }
  };

  return MAPPER[type]();
}
