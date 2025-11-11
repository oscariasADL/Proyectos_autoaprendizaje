import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import {
  Contact,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';
import {
  ClassicTransferPayload,
  ContactsTransferPayload,
  ExtraFields,
  TransferBreBPayload,
  TransferCel2celPayload,
  TransferPayload,
  TransferType,
  TransfiyaPayload
} from '@modules/transfers/entities/transfers.interface';
import { TowardAccount } from '../pages/transfers-aval-key/entities/transfers-aval-key.interface';

export function mapTransferPayload(values: any): TransferPayload {
  const payloadMapped = {
    [TransferType.MY_ACCOUNTS_AVV]: payloadOwnAccounts,
    [TransferType.FAST_TRANSFER]: payloadFastTransfer,
    [TransferType.MY_CONTACTS]: payloadContacts,
    [TransferType.SEND_AVV_PHONE]: payloadAvvPhone,
    [TransferType.SEND_CEL2CEL]: payloadCel2cel,
    [TransferType.REQUEST_CEL2CEL]: payloadRequestCel2cel,
    [TransferType.SEND_TRANSFIYA]: payloadCel2cel,
    [TransferType.REQUEST_TRANSFIYA]: payloadTransfiya,
    [TransferType.SEND_AVAL_KEY]: payloadAvalKey,
    [TransferType.SEND_BRE_B]: payloadBreB
  };
  const transferType = values.transferType;
  const amount = sanitizeCurrency(values.amount);

  return {
    amount,
    transferType,
    ...payloadExtraFields(values),
    ...payloadMapped[transferType](values)
  };
}

function payloadOwnAccounts(values: any): ClassicTransferPayload {
  const product: Product = values.ownProduct;

  return {
    sourceAccount: sourceAccount(values),
    targetAccount: {
      productType: product.type as TypeAccount,
      productId: product.id.toString()
    }
  };
}

function payloadFastTransfer(values: any): ClassicTransferPayload {
  const productType: TypeAccount = values.towardAccountType;
  const productId: string = values.towardAccount;

  return {
    sourceAccount: sourceAccount(values),
    targetAccount: {
      productType,
      productId
    }
  };
}

function payloadContacts(values: any): ContactsTransferPayload {
  const contact: Contact = values.contact;
  const contactProduct: ContactProduct = values.contactProduct;

  return {
    sourceAccount: sourceAccount(values),
    contactInfo: {
      contactId: {
        id: contact.identificationData.id,
        idType: contact.identificationData.idType
      },
      accountInfo: {
        productType: contactProduct.type.id as TypeAccount,
        productId: contactProduct.relativeId,
        bank: contactProduct.bank.id
      }
    }
  };
}

function payloadAvvPhone(values: any): ClassicTransferPayload {
  const productId = (values?.contactProduct || values?.phoneNumber)?.replace(
    / /g,
    ''
  );
  return {
    sourceAccount: sourceAccount(values),
    targetAccount: {
      productType: TypeAccount.CEL,
      productId
    }
  };
}

function payloadCel2cel(values: any): TransferCel2celPayload {
  const transferType = values.transferType as TransferType;
  const productId = (values?.contactProduct || values?.phoneNumber)?.replace(
    / /g,
    ''
  );
  return {
    amount: sanitizeCurrency(values.amount),
    txInfo: {
      txTarget: productId,
      txType:
        transferType === TransferType.SEND_CEL2CEL ? 'cel2cel' : 'transfiya'
    },
    sourceAccount: {
      productType: values.fromProduct?.type,
      productId: values.fromProduct?.id,
      bank: '0052'
    },
    targetAccount: {
      ...(isNullOrUndefined(values.towardProduct?.productType)
        ? {
            productType: values.towardProduct?.account?.accountType,
            productId: values.towardProduct?.account?.accountId,
            bank: values.towardProduct?.account?.bankInfo?.bankId
          }
        : {})
    },
    extraFields: {
      note: values.addenda?.note,
      referenceId: values.addenda?.referenceId
    },
    ...(transferType === TransferType.SEND_CEL2CEL
      ? {
          additionalTargetInfo: `${values.towardProduct.personInfo.name} - ${values.towardProduct.bankName}`
        }
      : {})
  };
}

function payloadAvalKey(values: any): TransferCel2celPayload {
  const towardProduct = values.towardProduct as TowardAccount;
  return {
    amount: sanitizeCurrency(values.amount),
    txInfo: {
      txTarget: '',
      txType: 'avalKey'
    },
    sourceAccount: {
      productType: values.fromProduct?.type,
      productId: values.fromProduct?.id,
      bank: '0052'
    },
    targetAccount: {
      ...(!isNullOrUndefined(towardProduct?.productId)
        ? {
            ...towardProduct
          }
        : {})
    },
    extraFields: {
      note: values.addenda?.note,
      referenceId: values.addenda?.referenceId
    },
    ...(values?.qrMetadata
      ? {
          qrMetadata: values.qrMetadata
        }
      : {}),
    ...(!isNullOrUndefined(values?.shouldSaveSpiContact)
      ? {
          shouldSaveSpiContact: values.shouldSaveSpiContact
        }
      : {}),
    ...(values.towardAvalKey
      ? {
          towardAvalKey: values.towardAvalKey
        }
      : {}),
    ...(values.isFavoriteContact !== null
      ? {
          isFavoriteSpiContact: values.isFavoriteContact
        }
      : {}),
    ...(values?.breBTransfer ? { breBTransfer: values?.breBTransfer } : {}),
    ...(values?.isSavedContact !== null
      ? { isSavedSpiContact: values?.isSavedContact }
      : {})
  };
}

function payloadBreB(values: any): TransferBreBPayload {
  return {
    breBTransfer: values?.breBTransfer,
    amount: sanitizeCurrency(values.amount),
    txInfo: {
      txTarget: '',
      txType: 'avalKey'
    },
    sourceAccount: {
      productType: values.fromProduct?.type,
      productId: values.fromProduct?.id,
      bank: '0052'
    },
    targetAccount: {
      key: values.towardProduct.key
    },
    extraFields: {
      note: values.addenda?.note,
      referenceId: values.addenda?.referenceId
    },
    ...(values?.qrMetadata
      ? {
          qrMetadata: values.qrMetadata
        }
      : {}),
    ...(!isNullOrUndefined(values?.shouldSaveSpiContact)
      ? {
          shouldSaveSpiContact: values.shouldSaveSpiContact
        }
      : {}),
    ...(values.towardAvalKey
      ? {
          towardAvalKey: values.towardAvalKey
        }
      : {}),
    ...(values.isFavoriteContact !== null
      ? {
          isFavoriteSpiContact: values.isFavoriteContact
        }
      : {}),
    ...(values?.isSavedContact !== null
      ? { isSavedSpiContact: values?.isSavedContact }
      : {})
  };
}

function payloadTransfiya(values: any): TransfiyaPayload {
  const targetNumber = (values?.contactProduct || values?.phoneNumber)?.replace(
    / /g,
    ''
  );
  return {
    targetNumber,
    account: sourceAccount(values)
  };
}

function payloadRequestCel2cel(values: any): TransfiyaPayload {
  const targetNumber = (values?.contactProduct || values?.phoneNumber)?.replace(
    / /g,
    ''
  );
  return {
    targetNumber,
    account: sourceAccount(values)
  };
}

function payloadExtraFields(values: any): { extraFields?: ExtraFields } {
  const referenceId: string = values.addenda.referenceId;
  const note: string = values.addenda.note;

  return !isNullOrUndefined(note) || !isNullOrUndefined(referenceId)
    ? {
        extraFields: {
          note,
          referenceId
        }
      }
    : {};
}

function sourceAccount(values: any): {
  productType: TypeAccount;
  productId: string;
  accountNumber: string;
} {
  const product: Product = values.fromProduct;
  return {
    productType: product.type as TypeAccount,
    productId: product.id.toString(),
    accountNumber: product.numberProduct
  };
}
