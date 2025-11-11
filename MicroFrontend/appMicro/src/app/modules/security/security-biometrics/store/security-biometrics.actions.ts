import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import {
  VerifyPasswordPayload,
  SecurityBiometricStep
} from '@modules/security/security-biometrics/entities/security-biometrics.interface';
import { createAction, props } from '@ngrx/store';
import { CustomFacts } from '@app/modules/product-options/recharges/entities/recharges.interface';

export const setSecurityBiometricStepAction = createAction(
  type('[Global/UI] Set security biometric step'),
  props<{ step: SecurityBiometricStep }>()
);

export const verifyPasswordAction = createAction(
  type('[Global/API] Verify password'),
  props<{ payload: VerifyPasswordPayload }>()
);

export const verifyPasswordSuccessAction = createAction(
  type('[Global/API] Verify password success')
);

export const verifyPasswordErrorAction = createAction(
  type('[Global/API] Verify password error'),
  props<{ props: AlertSheetProperties }>()
);
export const triggerBiometricRSAServiceAction = createAction(
  type('[Global/API] Trigger biometric service')
);

export const biometricRSAServiceSuccess = createAction(
  type('[Global/API] biometric service success')
);
export const biometricRSAServiceFailure = createAction(
  type('[Global/API] biometric service failure')
);
