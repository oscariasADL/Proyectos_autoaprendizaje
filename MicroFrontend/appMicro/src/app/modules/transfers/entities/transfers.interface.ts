export enum TransferType {
  MY_ACCOUNTS_AVV = 1,
  FAST_TRANSFER = 2,
  MY_CONTACTS = 3,
  SEND_AVV_PHONE = 4,
  SEND_TRANSFIYA = 5,
  REQUEST_TRANSFIYA = 6,
  SEND_CEL2CEL = 7,
  REQUEST_CEL2CEL = 8,
  SEND_AVAL_KEY = 9,
  SEND_BRE_B = 10
}

export interface ClassicTransferPayload {
  amount?: number;
  sourceAccount: {
    productType: string;
    productId: string;
    accountNumber?: string;
  };
  targetAccount: {
    productType: string;
    productId: string;
    accountNumber?: string;
  };
}

export interface ContactsTransferPayload {
  amount?: number;
  sourceAccount: {
    productType: string;
    productId: string;
    accountNumber?: string;
  };
  contactInfo: {
    contactId: { id: string; idType: string };
    accountInfo: {
      productType: string;
      productId: string;
      bank: string;
    };
  };
  favoriteName?: string;
}

export interface TransfiyaPayload {
  amount?: number;
  account?: { productType: string; productId: string };
  targetNumber?: string;
  extraFields?: ExtraFields;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  defaultAccount?: boolean;
}

export interface ExtraFields {
  note: string;
  referenceId: string;
  transactionId?: string;
  applyTrx?: boolean;
}

export interface SimCard {
  operator?: string;
  simCardId?: string;
}

export interface LocationInfo {
  countryName?: string;
  cityName?: string;
  geoLocation?: string;
}

export interface DeviceAdmin {
  brand?: string;
  osDevice?: string;
  devModel?: string;
  simCard?: SimCard;
  locationInfo?: LocationInfo;
}

export interface TransferPayload
  extends ClassicTransferPayload,
    ContactsTransferPayload,
    TransfiyaPayload {
  transferType?: TransferType;
  towardAvalKey?: string;
  towardProduct?: any;
  phoneNumber?: string;
  favoriteName?: string;
  extraFields?: ExtraFields;
  deviceAdmin?: DeviceAdmin;
  shouldSaveSpiContact?: boolean;
  isFavoriteSpiContact?: boolean;
  isSavedSpiContact?: boolean;
  productNumber?: string;
}

export interface TransferCel2celPayload {
  amount: number;
  targetAccount: {
    productId?: string;
    bank?: string;
    productType?: string;
  };
  sourceAccount: {
    productId: string;
    bank: string;
    productType: string;
  };
  txInfo: {
    txType: string;
    txTarget: string;
  };
  extraFields: {
    note: string;
    referenceId?: string | null;
  };
  transferType?: number;
  useTransfiya?: boolean;
  deviceAdmin?: DeviceAdmin;
  additionalTargetInfo?: string;
  qrMetadata?: string;
}

export interface TransferBreBPayload {
  breBTransfer: boolean;
  amount: number;
  targetAccount: {
    key: string;
  };
  sourceAccount: {
    productId: string;
    bank: string;
    productType: string;
  };
  txInfo: {
    txType: string;
    txTarget: string;
  };
  extraFields: {
    note: string;
    referenceId?: string | null;
  };
  transferType?: number;
  deviceAdmin?: DeviceAdmin;
  additionalTargetInfo?: string;
  qrMetadata?: string;
}

export interface UtagTransferData {
  utagCategory: string;
  utag: string;
}
