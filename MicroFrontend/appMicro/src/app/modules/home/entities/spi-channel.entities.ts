interface MFPayloadBase {
  process: ProcessType;
  origin: string;
  timestamp: number;
}
export enum ProcessType {
  spiKeyRegister = 'spiKeyRegister',
  spiKeyConsultation = 'spiKeyConsultation',
  spiKeyModification = 'spiKeyModification',
  spiKeyCancelKey = 'spiKeyCancelKey',
  spiKeytransfers = 'spiKeytransfers',
  spiKeyblock = 'spiKeyblock',
  spiKeyUnlock = 'spiKeyUnlock',
  spiKeyLock = 'spiKeyLock',
  spiKeyExtendLock = 'spiKeyExtendLock',
  spiUpdateFavoriteContact = 'spiUpdateFavoriteContact',
  spiWhatsappManageOnboarding = 'spiWhatsappManageOnboarding'
}

export interface DataResponse {
  AccountNumber: string;
  transactionId: string;
  otherAccountBankType: string;
  otherAccountData: {
    accountNumber: string; //llave
    fullNameContact: string;
  };
  previousAccount?: string; //llave anterior
}

interface DataTx {
  action: string;
  transactionId: string;
}

export interface SPIAuthTxResponse {
  eventDriven: number;
  topicName: string;
  topicValue: {
    payload: MFPayloadBase & {
      data: DataResponse;
    };
    hash: string;
  };
}
export interface TxServiceResponse {
  signed: string;
  action: string;
  timestamp: number;
}
export interface SPIAuthTxPublish {
  hash: string;
  ResponsePayload: MFPayloadBase & {
    channel: string;
    data: DataTx;
  };
  signed: string;
}

export interface SpiKeyTransferResponse {
  topicName: string;
  topicValue: {
    keyValue: string;
    inputMethod: string;
    timestamp: number;
    isSavedContact: boolean;
  };
  eventDriven: number;
}

export interface KeyBasePayload {
  payload: MFPayloadBase & {
    data: DataResponse;
  };
  hash: string;
  process: ProcessType;
  channel: string;
  transactionId: string;
}
export interface CreateKeyPayload extends KeyBasePayload {
  originAccount: string;
  newKey?: string;
}
export interface ModifyKeyPayload extends KeyBasePayload {
  originAccount: string;
  previousKey: string;
  currentKey: string;
}
export interface DeleteKeyPayload extends KeyBasePayload {
  cancelKey: string;
}

export interface UnlockKeyPayload extends KeyBasePayload {
  reactivateKey: string;
}

export type SPITransactionEvent =
  | CreateKeyPayload
  | ModifyKeyPayload
  | DeleteKeyPayload
  | UnlockKeyPayload
  | KeyBasePayload;
