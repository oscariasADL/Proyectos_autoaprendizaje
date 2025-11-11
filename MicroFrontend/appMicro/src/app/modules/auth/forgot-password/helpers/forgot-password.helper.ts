import { HttpErrorResponse } from '@angular/common/http';
import { mapError } from '@commons/helpers/http.helpers';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  FORGOT_PASSWORD_FLOW_ENDS,
  FORGOT_PASSWORD_FLOW_ENDS_BIOMETRICS
} from '@modules/auth/forgot-password/constants/forgot-password.constants';
import {
  ForgotPasswordResponse,
  StepForgotPasswordType,
  StepForgotPasswordTypeWithBiometrics
} from '@modules/auth/forgot-password/entities/forgot-password.interface';
import { StepEnumType } from '../strategies/forgot-password-strategy.interface';

export function throwForgotPasswordErrorIfNecessary(
  data: ForgotPasswordResponse,
  isBiometrics?: boolean
): void {
  const errorCode = parseInt(data.errorCode, 10);
  const status = errorCode < 400 ? 400 : errorCode;

  const isValidStep = isStepDefined(data.step, isBiometrics);
  const isFinalStep = isStepInFinalFlow(data.step, isBiometrics);

  if (isFinalStep) {
    mapForgotPasswordError(data.errorMessage, data.step, status);
  } else if (!isValidStep || !verifyDataIntegrity(data)) {
    mapForgotPasswordError(mapError(null), data.step, status);
  }
}

function isStepDefined(step: string, isBiometrics: boolean) {
  const steps: string[] = isBiometrics
    ? Object.values(StepForgotPasswordTypeWithBiometrics)
    : Object.values(StepForgotPasswordType);

  return steps.includes(step);
}

function isStepInFinalFlow(step: string, isBiometrics: boolean) {
  const finalSteps = isBiometrics
    ? FORGOT_PASSWORD_FLOW_ENDS_BIOMETRICS
    : FORGOT_PASSWORD_FLOW_ENDS;

  return isStepInFlow(step, finalSteps);
}

function mapForgotPasswordError(
  description: string,
  step: string,
  status?: number
) {
  throw new HttpErrorResponse({
    error: {
      description,
      step
    },
    status
  });
}

function verifyDataIntegrity(data: ForgotPasswordResponse): boolean {
  let isValid = true;

  switch (data.step) {
    case StepForgotPasswordType.FILL_SECURE_DATA:
      isValid =
        !isNullOrUndefined(data.secureDataBriefQuestion) &&
        !isNullOrUndefined(data.secureDataBriefQuestion.length) &&
        data.secureDataBriefQuestion.length !== 0 &&
        !isNullOrUndefined(data.secureDataBriefQuestion.question) &&
        !isNullOrUndefined(data.secureDataBriefQuestion.accountType) &&
        !isNullOrUndefined(data.secureDataBriefQuestion.questionType) &&
        !isNullOrUndefined(data.secureDataBriefQuestion.productType);
      break;
  }
  return isValid;
}

export function isStepInFlow(step: string, flowSteps: string[]): boolean {
  return flowSteps.includes(step as keyof StepEnumType);
}
