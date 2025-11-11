import { HttpErrorResponse } from '@angular/common/http';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { LogSeverity } from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import { HttpStatus } from '@commons/constants/http.constants';
import {
  LOGIN,
  REGISTER,
  UPDATE_PASSWORD
} from '@commons/constants/navigate.constants';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import { NavController } from '@ionic/angular';
import {
  LOGIN_ERROR_CODES_FOR_UPDATE_PASSWORD,
  LOGIN_ERROR_PASSWORD_HAS_CHANGE
} from '@modules/auth/login/constants/login.constants';
import { LoginFacade } from '../login.facade';

export function mapLoginError(
  error: HttpErrorResponse,
  navCtrl: NavController,
  withBiometrics: boolean = false
): AlertSheetProperties {
  if (
    withBiometrics &&
    error.status === HttpStatus.Unauthorized &&
    error.error.statusCode.toString() === LOGIN_ERROR_PASSWORD_HAS_CHANGE
  ) {
    return {
      id: 'login-error-alert',
      icon: AlertSheetIcon.error,
      title: 'LOGIN.ERROR.PASSWORD_BIOMETRIC.TITLE',
      description: 'LOGIN.ERROR.PASSWORD_BIOMETRIC.DESCRIPTION',
      buttons: ['LOGIN.ERROR.PASSWORD_BIOMETRIC.BUTTON'],
      componentType: AlertComponentType.alertCenter
    };
  }

  if (error.status === HttpStatus.Forbidden) {
    return {
      id: 'login-error-alert',
      icon: AlertSheetIcon.error,
      title: 'LOGIN.ERROR.REGISTER_AGAIN.TITLE',
      description: mapError(error),
      buttons: ['LOGIN.ERROR.REGISTER_AGAIN.BUTTON'],
      buttonsAction: [() => navCtrl.navigateForward(REGISTER)],
      componentType: AlertComponentType.alertCenter
    };
  }

  if (
    error.status === HttpStatus.BadRequest &&
    !!error.error?.statusCode &&
    LOGIN_ERROR_CODES_FOR_UPDATE_PASSWORD.includes(
      error.error?.statusCode.toString()
    )
  ) {
    return {
      id: 'login-error-alert',
      icon: AlertSheetIcon.error,
      title: 'LOGIN.ERROR.PASSWORD_EXPIRED.TITLE',
      description: 'LOGIN.ERROR.PASSWORD_EXPIRED.DESCRIPTION',
      buttons: [
        'LOGIN.ERROR.PASSWORD_EXPIRED.BUTTON',
        'LOGIN.ERROR.PASSWORD_EXPIRED.ALTERNATIVE_BUTTON'
      ],
      buttonsAction: [
        () => navCtrl.navigateForward(UPDATE_PASSWORD),
        () => navCtrl.navigateForward(LOGIN)
      ],
      buttonIconLink: 'icon-next',
      componentType: AlertComponentType.alertCenter
    };
  }
  if (
    error.status === undefined ||
    error.status === null ||
    error.status === 0
  ) {
    return {
      id: 'login-error-alert-unknown',
      icon: AlertSheetIcon.error,
      title: 'LOGIN.ERROR.GENERAL.UNKNOWN',
      description: 'LOGIN.ERROR.GENERAL.DESCRIP_UNKNOWN',
      buttons: ['LOGIN.ERROR.GENERAL.BUTTON'],
      componentType: AlertComponentType.alertCenter
    };
  }

  return {
    id: 'login-error-alert',
    icon: AlertSheetIcon.error,
    title: 'LOGIN.ERROR.GENERAL.TITLE',
    description: mapError(error),
    buttons: ['LOGIN.ERROR.GENERAL.BUTTON'],
    componentType: AlertComponentType.alertCenter
  };
}

export const logLoginEvent = (
  logManagerService: LogManagerService,
  customMessage: string,
  user: string
) => {
  logManagerService
    .log({
      severity: LogSeverity.INFO,
      fileName: 'login.page.ts',
      functionName: 'login',
      customMessage,
      userId: user
    })
    .catch((err) => {
      console.error('Error logging:', err);
    });
};

export function showSpiKeyOnLoginPage(facade: LoginFacade) {
  return Boolean(
    facade.featureFlagsByKey(FeatureFlagsKey.ShowSpiKeyOnLoginPage)
  );
}
