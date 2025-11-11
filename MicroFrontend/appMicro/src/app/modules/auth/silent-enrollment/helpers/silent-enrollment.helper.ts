import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { mapError } from '@commons/helpers/http.helpers';
import {
  FillCurrentPasswordErrorButton,
  FillCurrentPasswordErrorIcon,
  FillCurrentPasswordErrorLink,
  FillCurrentPasswordErrorType
} from '@modules/auth/auth-steps/components/fill-current-password/fill-current-password.component';
import {
  SILENT_ENROLLMENT_FLOW_ENDS,
  SILENT_ENROLLMENT_FLOW_ENDS_BANK
} from '../constants/silent-enrollment.constants';
import {
  SilentEnrollmentResponse,
  StepSilentEnrollmentType
} from '../entities/silent-enrollment.interface';

export function throwSilentEnrollmentErrorIfNecessary(
  data: SilentEnrollmentResponse
): void {
  if (
    SILENT_ENROLLMENT_FLOW_ENDS.includes(data.step as StepSilentEnrollmentType)
  ) {
    throw new HttpErrorResponse({
      error: {
        description: data.errorMessage,
        step: data.step
      },
      status:
        parseInt(data.errorCode, 10) < 400 ? 400 : parseInt(data.errorCode, 10)
    });
  } else if (
    !Object.values(StepSilentEnrollmentType).includes(
      data.step as StepSilentEnrollmentType
    )
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

export function mapSilentEnrollmentError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    id: 'silent-enrollment-error-alert',
    icon: AlertSheetIcon.error,
    componentType: AlertComponentType.alertCenter,
    title: 'AUTH.REGISTER.ERROR.TITLE',
    description: mapError(error),
    ...(SILENT_ENROLLMENT_FLOW_ENDS_BANK.includes(
      error?.error?.step as StepSilentEnrollmentType
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
              // Intentionally left blank
            },
            () => this.facade.redirectExternal(LinkKey.linkOfficeMap)
          ]
        }
      : {}),
    ...(StepSilentEnrollmentType.USER_MUST_BE_SENT_TO_OFFICE ===
    (error?.error?.step as StepSilentEnrollmentType)
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
