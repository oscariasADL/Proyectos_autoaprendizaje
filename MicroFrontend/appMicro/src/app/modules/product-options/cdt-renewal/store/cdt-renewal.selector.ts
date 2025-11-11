import {
  cdtRenewalFeatureName,
  CdtRenewalState
} from '@modules/product-options/cdt-renewal/store/cdt-renewal.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dateSelector } from '@store/selectors/config.selector';
import {
  mapDisabledCdtRenewalSelector,
  mapShowCdtRenewal
} from '../mappers/cdt-renewal.mapper';

const productDetailState = createFeatureSelector<CdtRenewalState>(
  cdtRenewalFeatureName
);

export const cdtRenewalDataSelector = createSelector(
  productDetailState,
  (state: CdtRenewalState) => state?.detail
);

export const showCdtRenewalSelector = createSelector(
  cdtRenewalDataSelector,
  dateSelector,
  mapShowCdtRenewal
);

export const disabledCdtRenewalSelector = createSelector(
  cdtRenewalDataSelector,
  dateSelector,
  mapDisabledCdtRenewalSelector
);
