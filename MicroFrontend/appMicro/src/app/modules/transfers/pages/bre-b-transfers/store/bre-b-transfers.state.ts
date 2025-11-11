import {
  AddSpiContactPayload,
  SpiContact
} from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

export const brebBTransfersFeatureName = 'brebBTransfers';

export type BreBTransfersState = Readonly<{
  towardAvalKey: string;
  spiKeyData?: TransferSpiUserKey;
  addSpiContactPayload: AddSpiContactPayload;
  spiContact: SpiContact;
  gmf: GMFData;
  working: boolean;
  completed: boolean;
}>;

export const initialBreBTransfersState: BreBTransfersState = {
  towardAvalKey: '',
  spiKeyData: null,
  addSpiContactPayload: null,
  spiContact: null,
  gmf: null,
  working: false,
  completed: false
};
