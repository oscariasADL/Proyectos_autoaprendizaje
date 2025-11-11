import { inject, Injectable } from '@angular/core';
import {
  MultiDeviceActivateInstanceResponse,
  MultiDeviceActivateLicenseResponse,
  DecryptSecureChannelMessageBodyResponse,
  GenerateSignatureFromSecureChannelMessageResponse,
  OneSpanDigipass,
  DecryptSecureChannelMessageBodyOptions,
  GenerateSignatureFromSecureChannelMessageOptions
} from '@avaldigitallabs/one-span-digipass';
import { getDBValue } from '@commons/helpers/text.helpers';
import { environment as ENV } from '@environment';
import { SecureKeys } from '../constants/keys.constants';
import { AdlSecureStorageService } from './adl-secure-storage.service';
import { LogSeverity } from './log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from './log-manager-service/log-manager-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdlDigipassService {
  private logManagerService = inject(LogManagerService);

  constructor(private secureStorage: AdlSecureStorageService) {}

  public multiDeviceActivateLicense(
    enrollmentKey: string,
    fingerprint: string
  ): Promise<MultiDeviceActivateLicenseResponse> {
    return OneSpanDigipass.multiDeviceActivateLicense({
      fingerprint,
      enrollmentKey,
      staticVector: ENV.static_vector
    });
  }

  public multiDeviceActivateInstance(
    enrollmentKey: string,
    fingerprint: string,
    staticVector: string,
    dynamicVector: string
  ): Promise<MultiDeviceActivateInstanceResponse> {
    return OneSpanDigipass.multiDeviceActivateInstance({
      fingerprint,
      enrollmentKey,
      dynamicVector,
      staticVector
    });
  }

  public async decryptSecureChannelMessageBody(
    options: DecryptSecureChannelMessageBodyOptions
  ): Promise<DecryptSecureChannelMessageBodyResponse> {
    try {
      return await OneSpanDigipass.decryptSecureChannelMessageBody(options);
    } catch (error) {
      const logMessageDetails = {
        severity: LogSeverity.ERROR,
        fileName: 'bootstrap.effects.ts',
        functionName: 'initInterchangeKeyEffect$',
        customMessage: `Updated publicKey value`
      };
      this.logManagerService.log(logMessageDetails);
      return null;
    }
  }

  public generateSignatureFromSecureChannel(
    options: GenerateSignatureFromSecureChannelMessageOptions
  ): Promise<GenerateSignatureFromSecureChannelMessageResponse> {
    return OneSpanDigipass.generateSignatureFromSecureChannelMessage(options);
  }

  public async saveVectors(
    staticVector: string,
    dynamicVector: string
  ): Promise<boolean> {
    await this.secureStorage.put(SecureKeys.staticVector, staticVector, true);
    await this.secureStorage.put(SecureKeys.dynamicVector, dynamicVector, true);
    return true;
  }

  public async saveMultiDeviceLicenseActivation(
    multiDeviceLicenseActivation: string
  ): Promise<boolean> {
    await this.secureStorage.put(
      SecureKeys.multiDeviceLicenseActivation,
      multiDeviceLicenseActivation,
      true
    );
    return true;
  }

  public async saveMultiDeviceInstanceActivation(
    multiDeviceInstanceActivation: string
  ): Promise<boolean> {
    await this.secureStorage.put(
      SecureKeys.multiDeviceInstanceActivation,
      multiDeviceInstanceActivation,
      true
    );
    return true;
  }

  public async staticVector(): Promise<string> {
    const db = await this.secureStorage.getAll();
    return getDBValue(db, SecureKeys.staticVector);
  }

  public async dynamicVector(): Promise<string> {
    const db = await this.secureStorage.getAll();
    return getDBValue(db, SecureKeys.dynamicVector);
  }

  public async fingerprint(): Promise<string> {
    const db = await this.secureStorage.getAll();
    return getDBValue(db, SecureKeys.fingerprint);
  }

  public async multiDeviceLicenseActivation(): Promise<string> {
    const db = await this.secureStorage.getAll();
    return getDBValue(db, SecureKeys.multiDeviceLicenseActivation);
  }

  public async multiDeviceInstanceActivation(): Promise<string> {
    const db = await this.secureStorage.getAll();
    return getDBValue(db, SecureKeys.multiDeviceInstanceActivation);
  }
}
