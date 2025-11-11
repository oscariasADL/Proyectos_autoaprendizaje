import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn
} from '@angular/router';
import { BANK_GROUP } from '@commons/constants/card.constants';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { ForgotPasswordFacade } from '@modules/auth/forgot-password/forgot-password.facade';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { from, Observable } from 'rxjs';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';

export const forgotPasswordGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const facade = inject(ForgotPasswordFacade);
  const secureStorage = inject(AdlSecureStorageService);

  return from(secureStorage.getAll()).pipe(
    filter((db) => !isNullOrUndefined(db)),
    withLatestFrom(facade.deviceInfo$),
    mergeMap(([db, deviceInfo]) => {
      const loginData = getDBValue(db, SecureKeys.loginData);
      const _loginData: LoginUserPayload = !isNullOrUndefined(loginData)
        ? JSON.parse(loginData)
        : null;

      const {
        model,
        platform,
        appVersion,
        appBuild,
        operatingSystem,
        osVersion,
        manufacturer,
        uuid,
        deviceName,
        deviceOS
      } = deviceInfo;

      const fingerprint = getDBValue(db, SecureKeys.fingerprint);

      facade.runForgotPassword({
        content: {
          idType: _loginData.typeDocument,
          id: _loginData.document,
          deviceOS,
          deviceName,
          companyId: BANK_GROUP.VILLAS_CODE,
          deviceSerial: fingerprint,
          deviceModel: model,
          devicePlatform: platform,
          deviceUuid: uuid,
          deviceAppVersion: appVersion,
          deviceAppBuild: appBuild,
          deviceOperatingSystem: operatingSystem,
          deviceOsVersion: osVersion,
          deviceManufacturer: manufacturer,
          isVirtual: true,
          isRegister: false
        }
      });

      return facade.forgotPasswordWorking$;
    }),
    filter((working) => !working)
  );
};
