import { TypeAccount } from '@commons/entities/product/type-account';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { FavoritesTransferType } from '../pages/constants/add-to-favorites.constants';
import { ContactProduct } from '@app/modules/contacts/entities/contact.interface';

export interface Favorite {
  keyFavorite?: string;
  amountTransaction?: string;
  nameFavoriteTransaction: string;
  identificationFavoriteType: IdentificationFavoriteType;
  sourceAccountTransaction: {
    idAcctTransaction: string;
    typeAcctTransaction: TypeAccount;
  };
  targetAccountTransaction?: {
    idAcctTransaction?: string;
    typeAcctTransaction?:
      | TypeAccount
      | TypeTarget.MONEY_ORDER
      | TypeTarget.SERVICE
      | FavoritesType.TAG_AVAL_OR_KEY
      | FavoritesType.VILLAS
      | FavoritesType.CONTACTS;
  };
  additionalDataTransaction: {
    subtypeOperation?: SubtypeOperations;
    from?: string;
    target?: string;
    descriptionTargetLabel?: string;
    typeTarget?: TypeTarget;
    actionLabel?: string;
    mobileOperator?: string;
    numberProduct?: string;
    typeName?: string;
    channel?: string;
    cashoutType?: string;
    transactionCostId?: number;
    note?: string;
    referenceId?: string;
    agreementType?: number;
    amountType?: string;
    biller?: boolean;
    maxPaymentDateComplete?: string;
    organizationId?: string;
    txType?: string;
    txTarget?: string;
    sourceBank?: string;
    targetBank?: string;
    additionalTargetInfo?: string;
    contactId?: string;
    contactIdType?: string;
  };
}

export interface FavoriteBasic {
  keyFavorite: string;
  nameFavoriteTransaction: string;
  identificationFavoriteType: string;
}

export interface FavoritePayload {
  userData?: UserData;
  favoriteTransaction: Favorite;
}

export interface FavoriteDeletePayload {
  userData: UserData;
  idFavoriteTransaction: string;
}

export interface UserData {
  idUserType: string;
  idUser: string;
}

export interface FavoriteUIConfig {
  title: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

export interface GroupedFavorites {
  typeFavorite: string | Favorite;
  values: (string | Favorite)[];
}

export enum SubtypeOperations {
  RECHARGES = 0,
  TRANSFER_AVV_PHONE = 1,
  TRANSFER_AVV_ACC = 2,
  TRANSFIYA = 3,
  MONEY_ORDER = 4,
  TRANSFER_MY_AVV_ACCOUNTS = 5,
  CEL2CEL = 6,
  REGISTERED_SERVICES = 7,
  REGISTERED_CONTACTS = 8
}

export const HOMOLOGUE_TRANSFER_TYPE = {
  [SubtypeOperations.TRANSFER_AVV_ACC]: TransferType.FAST_TRANSFER,
  [SubtypeOperations.TRANSFER_AVV_PHONE]: TransferType.SEND_AVV_PHONE,
  [SubtypeOperations.TRANSFIYA]: TransferType.SEND_TRANSFIYA,
  [SubtypeOperations.TRANSFER_MY_AVV_ACCOUNTS]: TransferType.MY_ACCOUNTS_AVV,
  [SubtypeOperations.REGISTERED_CONTACTS]: TransferType.MY_CONTACTS,
  [SubtypeOperations.CEL2CEL]: TransferType.SEND_CEL2CEL
};

export enum IdentificationFavoriteType {
  TRANSFER = 'TRANSFER',
  RECHARGE = 'RECHARGE',
  PAYMENT = 'PAYMENTS',
  MONEY_ORDER = 'MONEY_ORDER'
}

export enum TypeTarget {
  CELLPHONE = 'CELLPHONE',
  ACCOUNT = 'ACCOUNT',
  DOCUMENT = 'DOCUMENT',
  MONEY_ORDER = 'MONEY_ORDER',
  SERVICE = 'SERVICE'
}

export const ACTION_LABEL = {
  [IdentificationFavoriteType.TRANSFER]: 'Transferir',
  [IdentificationFavoriteType.RECHARGE]: 'Recargar',
  [IdentificationFavoriteType.PAYMENT]: 'Pagar servicio',
  [IdentificationFavoriteType.MONEY_ORDER]: 'Enviar giro'
};

export interface ProductByPhoneNumber {
  account: {
    accountId: string;
    accountType: string;
    bankInfo: {
      bankId: string;
    };
  };
  personInfo: {
    name: string;
    documentType: string;
    documentNumber: string;
  };
}

export interface MobileForm extends FavoriteBaseForm {
  phoneNumber: string;
  targetAccount: {
    productId?: string;
    bank?: string;
    productType?: string;
  };
  txInfo: {
    txType: string;
    txTarget: string;
  };
  additionalTargetInfo: string;
}

export interface TagAvalOrKeyForm extends FavoriteBaseForm {
  towardAvalKey: string;
}
export interface VillasForm extends FavoriteBaseForm {
  targetAccount: {
    productId: string;
    productType: string;
  };
}
export interface ContactsForm
  extends FavoriteBaseForm,
    VillasForm,
    ContactProduct {}
interface FavoriteBaseForm {
  sourceAccount: {
    productType: TypeAccount;
    productId: string;
    bank: string;
  };

  transferType: FavoritesTransferType;
  favoriteName: string;
  towardType: TransferType;
}

export enum FavoritesType {
  TAG_AVAL_OR_KEY = 'AVALKEY',
  VILLAS = 'VILLAS',
  CONTACTS = 'CONTACTS'
}
