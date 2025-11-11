import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties
} from '@app/commons/entities/alert/alert-sheet.entities';
import { mapError } from '@app/commons/helpers/http.helpers';
import {
  FillCurrentPasswordErrorButton,
  FillCurrentPasswordErrorIcon,
  FillCurrentPasswordErrorLink,
  FillCurrentPasswordErrorType
} from '../../auth-steps/components/fill-current-password/fill-current-password.component';
import { LinkKey } from '@app/commons/entities/parameters/links.entities';

export function mapForgotPasswordError(
  error: HttpErrorResponse,
  isErrorStep: boolean,
  redirectExternal: (url: string) => void
): AlertSheetProperties {
  return {
    id: 'forgot-password-error-alert',
    icon: AlertSheetIcon.error,
    componentType: AlertComponentType.alertCenter,
    title: 'AUTH.FORGOT_PASSWORD.ERROR.TITLE',
    description: mapError(error),
    ...(isErrorStep
      ? {
          description: 'AUTH.ERROR.OFFICE',
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
            () => redirectExternal(LinkKey.linkOfficeMap)
          ]
        }
      : {})
  };
}
