import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import {
  SearchBillReferencePayload,
  SearchBillReferenceResponse
} from '@modules/payments/payment-services/entities/register-service.interface';
import {
  Contributor,
  PaymentSocialSecurityPayload,
  SocialSecurityPinPayload,
  SocialSecurityPinResponse
} from '@modules/payments/payment-social-security/entities/social-security.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';

export const fetchContributorAction = createAction(
  type('[Global/API] Fetch contributor')
);

export const fetchContributorSuccessAction = createAction(
  type('[Global/API] Fetch contributor success'),
  props<{ contributors: Contributor[] }>()
);

export const fetchContributorErrorAction = createAction(
  type('[Global/API] Fetch contributor error'),
  props<{ message: string }>()
);

export const fetchSocialSecurityDataByPinAction = createAction(
  type('[Global/API] Fetch social security data by pin'),
  props<{ payload: SocialSecurityPinPayload }>()
);

export const fetchSocialSecurityDataByPinSuccessAction = createAction(
  type('[Global/API] Fetch social security data by pin success'),
  props<{ data: SocialSecurityPinResponse }>()
);

export const fetchSocialSecurityDataByPinErrorAction = createAction(
  type('[Global/API] Fetch social security data by pin error'),
  props<{ message: string }>()
);

export const fetchSocialSecurityDataByReferenceAction = createAction(
  type('[Global/API] Fetch social security data by reference'),
  props<{ payload: SearchBillReferencePayload }>()
);

export const fetchSocialSecurityDataByReferenceSuccessAction = createAction(
  type('[Global/API] Fetch social security data by reference success'),
  props<{ data: SearchBillReferenceResponse }>()
);

export const fetchSocialSecurityDataByReferenceErrorAction = createAction(
  type('[Global/API] Fetch social security data by reference error'),
  props<{ message: string }>()
);

export const paySocialSecurityAction = createAction(
  type('[Global/API] Pay social security'),
  props<{ payload: PaymentSocialSecurityPayload; data: AlertStepData }>()
);

export const paySocialSecuritySuccessAction = createAction(
  type('[Global/API] Pay social security success'),
  props<{ props: AlertSheetProperties }>()
);

export const paySocialSecurityErrorAction = createAction(
  type('[Global/API] Pay social security error'),
  props<{ props: AlertSheetProperties }>()
);
