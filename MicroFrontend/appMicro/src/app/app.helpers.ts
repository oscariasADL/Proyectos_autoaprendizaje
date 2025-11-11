import { SecureKeys } from '@commons/constants/keys.constants';
import { FINGERPRINT_SALT } from '@commons/constants/one-span.constants';
import { AdlDeviceFingerprintService } from '@commons/services/adl-device-fingerprint.service';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { BootstrapService } from '@commons/services/bootstrap.service';
import { NewRelicService } from './commons/services/new-relic/new-relic.service';

export function initApp(
  secureStorage: AdlSecureStorageService,
  deviceFingerprint: AdlDeviceFingerprintService,
  bootstrapService: BootstrapService,
  newRelicService: NewRelicService
): () => Promise<any> {
  newRelicService.initNewRelic();

  return async (): Promise<any> => {
    const { fingerPrint } = await deviceFingerprint
      .getFingerprint(FINGERPRINT_SALT)
      .toPromise();

    await secureStorage.initDB(fingerPrint);
    await secureStorage.put(SecureKeys.fingerprint, fingerPrint);

    await bootstrapService.checkInit();

    return Promise.resolve({});
  };
}
