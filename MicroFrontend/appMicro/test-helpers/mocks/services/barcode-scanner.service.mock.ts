import { Injectable } from '@angular/core';
import type { default as ScanbotSDKType } from 'scanbot-web-sdk/@types/scanbot-sdk';
import {
  BarcodeScannerConfiguration,
  IBarcodeScannerHandle,
  LicenseInfo
} from 'scanbot-web-sdk/@types';
import { LicenseStatus } from 'scanbot-web-sdk/@types/core/bridge/compiled/SdkLicenseInfo';

@Injectable()
export class BarcodeScannerServiceMock {
  public flashlightStatus: boolean = false;
  private _scanbotSDK: ScanbotSDKType | null = null;
  private _scanner: IBarcodeScannerHandle | null = null;

  public async prepareScanner(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async initialize(): Promise<void> {}

  public async getLicenseInfo(): Promise<LicenseInfo> {
    return Promise.resolve({
      status: 'OKAY',
      isValid: () => true,
      licenseStatusMessage: '',
      expirationDateString: '',
      _marker: () => {}
    });
  }

  public async createBarcodeScanner(
    configuration: BarcodeScannerConfiguration
  ): Promise<void> {}

  public pause(): void {}

  public dispose(): void {}

  public turnOnTorch(): void {
    this.flashlightStatus = true;
  }

  public turnOffTorch(): void {
    this.flashlightStatus = false;
  }
}
