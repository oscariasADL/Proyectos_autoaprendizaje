import { mapHasServices } from '@modules/payments/payment-services/mappers/payment-services.mapper';
import { mapServiceList } from '@modules/payments/payment-services/pages/payment-services-home/mappers/payment-services.mapper';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  paymentServicesFeatureName,
  PaymentServicesState
} from './payment-services.state';

const paymentServicesState = createFeatureSelector<PaymentServicesState>(
  paymentServicesFeatureName
);

export const paymentServicesSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => mapServiceList(state.services)
);

export const paymentServicesWorkingSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.working
);

export const paymentServicesCompletedSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.completed
);

export const hasPaymentServicesSelector = createSelector(
  paymentServicesSelector,
  mapHasServices
);

export const billSelectedSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.billSelected
);

export const searchListSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.searchBills.data
);

export const searchCompletedSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.searchBills.completed
);

export const searchCompletedCategorySelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.searchBills.completedCategory
);

export const searchWorkingCategorySelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.searchBills.workingCategory
);

export const searchWorkingSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.searchBills.working
);

export const searchNotFoundSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.searchBills.notFound
);

export const searchHasErrorMessageSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) =>
    state.searchBills.hasErrorMessage ? state.searchBills.message : null
);

export const referenceInfoSelector = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.searchBills.referenceInfo
);

export const billScheduledPayload = createSelector(
  paymentServicesState,
  (state: PaymentServicesState) => state.billSchedulePayload
);
