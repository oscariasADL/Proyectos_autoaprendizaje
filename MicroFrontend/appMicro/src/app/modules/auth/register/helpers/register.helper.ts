import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { mapError } from '@commons/helpers/http.helpers';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  FillCurrentPasswordErrorButton,
  FillCurrentPasswordErrorIcon,
  FillCurrentPasswordErrorLink,
  FillCurrentPasswordErrorType
} from '@modules/auth/auth-steps/components/fill-current-password/fill-current-password.component';
import {
  REGISTER_FLOW_ENDS,
  REGISTER_FLOW_ENDS_BANK
} from '@modules/auth/register/constants/register.constants';
import {
  RegisterResponse,
  StepEnrollmentType
} from '@modules/auth/register/entities/register.interface';

export function throwErrorIfNecessary(data: RegisterResponse): void {
  if (StepEnrollmentType.TEMPORARILY_BLOCKED_USER === data.step) {
    throw new HttpErrorResponse({
      error: {
        description: 'REGISTER.STEPS.TEMPORARILY_BLOCKED_USER.DESCRIPTION',
        step: data.step
      },
      status: 400
    });
  } else if (REGISTER_FLOW_ENDS.includes(data.step as StepEnrollmentType)) {
    throw new HttpErrorResponse({
      error: {
        description: data.errorMessage,
        step: data.step
      },
      status:
        parseInt(data.errorCode, 10) < 400 ? 400 : parseInt(data.errorCode, 10)
    });
  } else if (
    !Object.values(StepEnrollmentType).includes(
      data.step as StepEnrollmentType
    ) ||
    !verifyDataIntegrity(data)
  ) {
    throw new HttpErrorResponse({
      error: {
        description: mapError(null),
        step: data.step
      },
      status:
        parseInt(data.errorCode, 10) < 400 ? 400 : parseInt(data.errorCode, 10)
    });
  }
}

function verifyDataIntegrity(data: RegisterResponse): boolean {
  let isValid = true;

  switch (data.step) {
    case StepEnrollmentType.FILL_SECURE_DATA:
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

export function mapRegisterError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    id: 'register-error-alert',
    icon: AlertSheetIcon.error,
    componentType: AlertComponentType.alertCenter,
    title: 'AUTH.REGISTER.ERROR.TITLE',
    description: mapError(error),
    ...(REGISTER_FLOW_ENDS_BANK.includes(
      error?.error?.step as StepEnrollmentType
    )
      ? {
          description: 'REGISTER.STEPS.ERROR.DESCRIPTION',
          buttonIconLink:
            FillCurrentPasswordErrorIcon[FillCurrentPasswordErrorType.Office],
          buttons: [
            FillCurrentPasswordErrorButton[FillCurrentPasswordErrorType.Office],
            FillCurrentPasswordErrorLink[FillCurrentPasswordErrorType.Office]
          ],
          buttonsAction: [
            () => {
              return;
            },
            () => this.facade.redirectExternal(LinkKey.linkOfficeMap)
          ]
        }
      : {}),
    ...(StepEnrollmentType.USER_MUST_BE_SENT_TO_OFFICE ===
    (error?.error?.step as StepEnrollmentType)
      ? {
          description: 'REGISTER.STEPS.ERROR_STEP02',
          buttons: [
            FillCurrentPasswordErrorButton[FillCurrentPasswordErrorType.Office],
            FillCurrentPasswordErrorLink[FillCurrentPasswordErrorType.Office]
          ]
        }
      : {})
  };
}
