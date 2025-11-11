import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CityPaymentTaxes } from '../entities/payment-taxes.interface';
import {
  paymentTaxesfeatureName,
  PaymentTaxesState
} from './payment-taxes.state';

const paymentTaxesState = createFeatureSelector<PaymentTaxesState>(
  paymentTaxesfeatureName
);

export function findCityDetail(
  data: CityPaymentTaxes[],
  id: string
): CityPaymentTaxes {
  return data
    .filter((item) => !!item)
    .find((city) => city.code.toString() === id.toString());
}

export const citiesSelector = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.cities.list
);

export const agreementSelector = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreements.list
);

export const workingCities = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.cities.working
);

export const workingAgreements = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreements.working
);

export const errorCities = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) =>
    state.cities.completed && state.cities.list.length === 0
);

export const errorAgreements = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) =>
    state.agreements.completed && state.agreements.list.length === 0
);

export const completeAgreements = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreements.completed
);

export const agreementDetailSelector = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreementDetail.data
);

export const agreementDetailNotFoundSelector = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreementDetail.notFound
);

export const agreementDetailMessageSelector = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreementDetail.message
);

export const workingAgreementDetailSelector = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreementDetail.working
);

export const completedAgreementDetailSelector = createSelector(
  paymentTaxesState,
  (state: PaymentTaxesState) => state.agreementDetail.completed
);

export const findCity = () => createSelector(citiesSelector, findCityDetail);
