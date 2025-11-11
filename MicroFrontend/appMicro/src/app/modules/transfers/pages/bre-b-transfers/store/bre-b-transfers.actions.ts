import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';

import { TransferPayload } from '@app/modules/transfers/entities/transfers.interface';
import { AlertStepData } from '@app/modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  AddSpiContactPayload,
  SpiContact,
  UpdateSpiContactPayload
} from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { GMFData, GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

export const initiateTransferFromSpiChannel = createAction(
  type('[Bre-B Transfers] Initiate transfer from SPI Channel'),
  props<{ spiKey: string }>()
);

export const fetchAccountKeyAction = createAction(
  type('[Bre-B Transfers] Fetch Account '),
  props<{ spiKey: string }>()
);

export const fetchAccountKeySuccessAction = createAction(
  type('[Bre-B Transfers] Fetch Account success'),
  props<{ spiKeyData: TransferSpiUserKey }>()
);

export const fetchAccountKeyErrorAction = createAction(
  type('[Bre-B Transfers] Fetch Account error'),
  props<{ props: AlertSheetProperties }>()
);

export const transferAction = createAction(
  type('[Bre-B Transfers] Transfer'),
  props<{ payload: TransferPayload; data: AlertStepData }>()
);

export const transferSuccessAction = createAction(
  type('[Bre-B Transfers]Transfer success'),
  props<{ props: AlertSheetProperties }>()
);

export const transferErrorAction = createAction(
  type('[Bre-B Transfers]Transfer error'),
  props<{ props: AlertSheetProperties }>()
);

export const clearTowardAvalKey = createAction(
  type('[Bre-B Transfers] Clear Toward Aval Key')
);

export const setAddSpiContactPayload = createAction(
  type('[Bre-B Transfers] Set Add SPI Contact Payload'),
  props<{ payload: AddSpiContactPayload }>()
);

export const addSpiContactAction = createAction(
  type('[Bre-B Transfers] Add SPI Contact'),
  props<{ payload: AddSpiContactPayload }>()
);

export const addSpiContactSuccessAction = createAction(
  type('[Bre-B Transfers] Add SPI Contact Success'),
  props<{ props: ToastProperties }>()
);

export const addSpiContactErrorAction = createAction(
  type('[Bre-B Transfers] Add SPI Contact Error')
);

export const updateSpiContactAction = createAction(
  type('[Bre-B Transfers] Update SPI Contact'),
  props<{ payload: UpdateSpiContactPayload }>()
);

export const updateSpiContactSuccessAction = createAction(
  type('[Bre-B Transfers] Update SPI Contact Success'),
  props<{ props: ToastProperties }>()
);

export const updateSpiContactErrorAction = createAction(
  type('[Bre-B Transfers] Update SPI Contact Error')
);

export const fetchSpiContactAction = createAction(
  type('[Bre-B Transfers] Fetch SPI Contact'),
  props<{ contactKey: string }>()
);

export const fetchSpiContactSuccessAction = createAction(
  type('[Bre-B Transfers] Fetch SPI Contact Success'),
  props<{ spiContact: SpiContact }>()
);

export const fetchSpiContactErrorAction = createAction(
  type('[Bre-B Transfers] Fetch SPI Contact Error')
);

export const fetchGMFAction = createAction(
  type('[Bre-B Transfers] Fetch gmf'),
  props<{ payload: GMFPayload }>()
);

export const fetchGMFSuccessAction = createAction(
  type('[Bre-B Transfers] Fetch gmf success'),
  props<{ gmf: GMFData }>()
);

export const fetchGMFErrorAction = createAction(
  type('[Bre-B Transfers] Fetch gmf error'),
  props<{ message: string }>()
);
