import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { BANK_GROUP } from '@commons/constants/card.constants';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { from, Observable, firstValueFrom } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { SilentEnrollmentFacade } from '../silent-enrollment.facade';
import { DeviceData } from '@app/commons/entities/device/device.interface';

@Injectable()
export class SilentEnrollmentGuard implements CanActivate {
  constructor(
    private router: Router,
    private facade: SilentEnrollmentFacade,
    private secureStorage: AdlSecureStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.secureStorage.getAll()).pipe(
      filter((db) => !isNullOrUndefined(db)),
      mergeMap(async (db) => {
        const data = JSON.parse(
          getDBValue(db, SecureKeys.silentEnrollmentData)
        );
        const { typeDocument, document, ServComp } = data;
        const deviceData = (await firstValueFrom(
          this.facade.deviceInfo$
        )) as DeviceData;
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
        } = deviceData;
        const fingerprint = getDBValue(db, SecureKeys.fingerprint);

        this.facade.runSilentEnrollment({
          content: {
            id: document,
            idType: typeDocument,
            companyId: BANK_GROUP.VILLAS_CODE,
            deviceName,
            deviceSerial: fingerprint,
            deviceOS,
            deviceModel: model,
            devicePlatform: platform,
            deviceUuid: uuid,
            deviceAppVersion: appVersion,
            deviceAppBuild: appBuild,
            deviceOperatingSystem: operatingSystem,
            deviceOsVersion: osVersion,
            deviceManufacturer: manufacturer,
            isVirtual: true,
            isComplementaryServices: ServComp.toString() === 'true'
          }
        });

        return this.facade.silentEnrollmentWorking$;
      }),
      mergeMap((observable) => observable),
      filter((working) => !working)
    );
  }
}
