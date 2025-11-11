import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';
import {
  AgreementDetail,
  AgreementTaxes,
  CityPaymentTaxes,
  PaymentsReferenceValueRequest,
  PaymentTaxesRequest
} from '../entities/payment-taxes.interface';

export const fetchCities = createAction(type('[PAYMENT_TAXES] FETCH_CITIES'));

export const fetchCitiesSuccess = createAction(
  type('[PAYMENT_TAXES] FETCH_CITIES_SUCCESS'),
  props<{ list: CityPaymentTaxes[] }>()
);

export const fetchCitiesError = createAction(
  type('[PAYMENT_TAXES] FETCH_CITIES_ERROR'),
  props<{ message: string }>()
);

export const fetchAgreements = createAction(
  type('[PAYMENT_TAXES] FETCH_AGREEMENTS'),
  props<{ city: string }>()
);

export const fetchAgreementsSuccess = createAction(
  type('[PAYMENT_TAXES] FETCH_AGREEMENTS_SUCCESS'),
  props<{ payload: AgreementTaxes[] }>()
);

export const fetchAgreementsError = createAction(
  type('[PAYMENT_TAXES] FETCH_AGREEMENTS_ERROR'),
  props<{ message: string }>()
);

export const fetchReferenceValue = createAction(
  type('[PAYMENT_TAXES] FETCH_REFERENCE_VALUE'),
  props<{ payload: PaymentsReferenceValueRequest }>()
);

export const fetchReferenceValueSuccess = createAction(
  type('[PAYMENT_TAXES] FETCH_REFERENCE_VALUE_SUCCESS'),
  props<{ payload: AgreementDetail }>()
);

export const fetchReferenceValueError = createAction(
  type('[PAYMENT_TAXES] FETCH_REFERENCE_VALUE_ERROR'),
  props<{ message: string }>()
);

export const fetchReferenceNotFound = createAction(
  type('[PAYMENT_TAXES] FETCH_REFERENCE_NOT_FOUND'),
  props<{ message: string }>()
);

export const cleanReferenceDetail = createAction(
  type('[PAYMENT_TAXES] CLEAN_REFERENCE_DETAIL')
);

export const makePaymentTaxes = createAction(
  type('[PAYMENT_TAXES] MAKE_PAYMENT'),
  props<{ payload: PaymentTaxesRequest; data: AlertStepData }>()
);

export const makePaymentTaxesSuccess = createAction(
  type('[PAYMENT_TAXES] MAKE_PAYMENT_SUCCESS'),
  props<{ props: AlertSheetProperties }>()
);

export const makePaymentTaxesError = createAction(
  '[PAYMENT_TAXES] MAKE_PAYMENT_ERROR',
  props<{ props: AlertSheetProperties }>()
);
