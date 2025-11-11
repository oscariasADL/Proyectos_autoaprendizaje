import { channels } from '@app/commons/constants/channels.constants';
import {
  DataResponse,
  KeyBasePayload,
  ProcessType,
  SPIAuthTxResponse,
  SPITransactionEvent
} from '../entities/spi-channel.entities';

function createBasePayload(response: SPIAuthTxResponse): KeyBasePayload {
  const hash = response.topicValue.hash;
  const process = response.topicValue.payload.process;
  const channel = channels.mb;
  const transactionId = response.topicValue.payload.data.transactionId;
  const payload = response.topicValue.payload;
  const base: KeyBasePayload = {
    payload,
    hash,
    process,
    channel,
    transactionId
  };
  return base;
}

const processExtensions = {
  [ProcessType.spiKeyCancelKey]: (data: DataResponse) => ({
    cancelKey: data.otherAccountData.accountNumber
  }),

  [ProcessType.spiKeyModification]: (data: DataResponse) => ({
    previousKey: data.previousAccount,
    currentKey: data.otherAccountData.accountNumber,
    originAccount: data.AccountNumber
  }),

  [ProcessType.spiKeyUnlock]: (data: DataResponse) => ({
    reactivateKey: data.otherAccountData.accountNumber
  }),

  [ProcessType.spiKeyExtendLock]: (data: DataResponse) => ({
    reactivateKey: data.otherAccountData.accountNumber
  }),

  [ProcessType.spiKeyLock]: (data: DataResponse) => ({
    reactivateKey: data.otherAccountData.accountNumber
  }),

  [ProcessType.spiKeyRegister]: (data: DataResponse) => ({
    originAccount: data.AccountNumber
  }),

  [ProcessType.spiUpdateFavoriteContact]: () => ({}),
  [ProcessType.spiWhatsappManageOnboarding]: () => ({})
};

export function transferPayloadMapper(
  response: SPIAuthTxResponse
): SPITransactionEvent {
  const base = createBasePayload(response);
  const data = response.topicValue.payload.data;
  const { process } = base;

  const extensionMapper = processExtensions[process];

  if (!extensionMapper) {
    throw new Error(`Unsupported process type: ${process}`);
  }

  return {
    ...base,
    ...extensionMapper(data)
  };
}
