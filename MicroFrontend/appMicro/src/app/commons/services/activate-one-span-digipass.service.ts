import { Injectable } from '@angular/core';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlDigipassService } from '@commons/services/adl-digipass.service';
import { getDBValue } from '@commons/helpers/text.helpers';
import { SecureKeys } from '@commons/constants/keys.constants';

@Injectable({
  providedIn: 'root'
})
export class ActivateOneSpanDigipassService {
  constructor(
    private secureStorage: AdlSecureStorageService,
    private digipass: AdlDigipassService
  ) {}

  public async activateLicense(params: {
    enrollmentKey: string;
  }): Promise<string> {
    const db = await this.secureStorage.getAll();
    const fingerPrint = getDBValue(db, SecureKeys.fingerprint);
    const multiDeviceActivateLicense =
      await this.digipass.multiDeviceActivateLicense(
        params.enrollmentKey,
        fingerPrint
      );
    const { deviceCode, staticVector, dynamicVector } =
      multiDeviceActivateLicense;
    await this.digipass.saveVectors(staticVector, dynamicVector);
    await this.digipass.saveMultiDeviceLicenseActivation(deviceCode);
    return deviceCode;
  }

  public async activateInstance(params: {
    enrollmentKey: string;
  }): Promise<string> {
    const db = await this.secureStorage.getAll();
    const fingerPrint = getDBValue(db, SecureKeys.fingerprint);
    const multiDeviceActivateInstance =
      await this.digipass.multiDeviceActivateInstance(
        params.enrollmentKey,
        fingerPrint,
        getDBValue(db, SecureKeys.staticVector),
        getDBValue(db, SecureKeys.dynamicVector)
      );
    const { signatureCode, staticVector, dynamicVector } =
      multiDeviceActivateInstance;
    await this.digipass.saveVectors(staticVector, dynamicVector);
    await this.digipass.saveMultiDeviceInstanceActivation(signatureCode);
    return signatureCode;
  }
}
