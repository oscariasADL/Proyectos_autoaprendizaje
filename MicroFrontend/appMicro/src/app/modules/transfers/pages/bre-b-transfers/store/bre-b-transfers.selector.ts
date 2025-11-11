import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  brebBTransfersFeatureName,
  BreBTransfersState
} from './bre-b-transfers.state';

const breBTransferState = createFeatureSelector<BreBTransfersState>(
  brebBTransfersFeatureName
);

export const breBKeySelector = createSelector(
  breBTransferState,
  (state: BreBTransfersState) => state.towardAvalKey
);

export const breBSpiKeyDataSelector = createSelector(
  breBTransferState,
  (state: BreBTransfersState) => state.spiKeyData
);

export const breBAccountKeyWorkingSelector = createSelector(
  breBTransferState,
  (state: BreBTransfersState) => state.working
);

export const breBAccountKeyCompletedSelector = createSelector(
  breBTransferState,
  (state: BreBTransfersState) => state.completed
);

export const breBAddSpiContactPayloadSelector = createSelector(
  breBTransferState,
  (state: BreBTransfersState) => state.addSpiContactPayload
);

export const breBSpiContactSelector = createSelector(
  breBTransferState,
  (state: BreBTransfersState) => state.spiContact
);

export const gmfSelector = createSelector(
  breBTransferState,
  (state: BreBTransfersState) => state.gmf
);
