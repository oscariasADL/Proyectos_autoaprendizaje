import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { BANK_GROUP } from '@commons/constants/card.constants';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { RegisterFacade } from '@modules/auth/register/register.facade';
import { from, Observable } from 'rxjs';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';

export const registerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const facade = inject(RegisterFacade);
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
        deviceOS,
        latitude,
        longitude,
        screenSize
      } = deviceInfo;

      const fingerprint = getDBValue(db, SecureKeys.fingerprint);

      facade.runRegister({
        content: {
          idType: _loginData.typeDocument,
          id: _loginData.document,
          deviceOS,
          deviceName,
          companyId: BANK_GROUP.VILLAS_CODE,
          serial: fingerprint,
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
          mobileLongitude: longitude,
          mobileLatitude: latitude,
          screenSize: screenSize,
          isRegister: true
        }
      });

      return facade.registerWorking$;
    }),
    filter((working) => !working)
  );
};
