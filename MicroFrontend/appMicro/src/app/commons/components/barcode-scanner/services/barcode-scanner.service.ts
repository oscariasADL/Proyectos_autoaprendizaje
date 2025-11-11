import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Camera } from '@capacitor/camera';
import type { default as ScanbotSDKType } from 'scanbot-web-sdk/@types/scanbot-sdk';
import ScanbotSDK from 'scanbot-web-sdk/ui';
import {
  BarcodeScannerViewConfiguration,
  IBarcodeScannerHandle,
  LicenseInfo
} from 'scanbot-web-sdk/@types';

import { INITIALIZATION_OPTIONS } from '@commons/components/barcode-scanner/constants/barcode-scanner.constants';
import { isNativeMethod } from '@commons/decorators/native.decorator';

@Injectable()
export class BarcodeScannerService {
  public flashlightStatus: boolean = false;
  private _scanbotSDK: ScanbotSDKType | null = null;
  private _scanner: IBarcodeScannerHandle | null = null;

  @isNativeMethod(Promise.resolve(true))
  public async prepareScanner(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return Promise.resolve(true);

    let permStatus = await Camera.checkPermissions();
    if (
      permStatus.camera === 'prompt' ||
      permStatus.camera === 'prompt-with-rationale' ||
      permStatus.camera === 'denied'
    ) {
      permStatus = await Camera.requestPermissions({ permissions: ['camera'] });
    }
    if (permStatus.camera !== 'granted') {
      return Promise.reject('BARCODE_SCANNER.ERRORS.BARCODE_ERROR_PERMISSION');
    }
    return Promise.resolve(true);
  }

  @isNativeMethod(Promise.resolve())
  public async initialize(): Promise<void> {
    try {
      this._scanbotSDK = await ScanbotSDK.initialize(INITIALIZATION_OPTIONS);
    } catch (error) {
      console.error('Failed to initialize Scanbot SDK:', error);
      return Promise.reject(`Failed to initialize Scanbot SDK: ${error}`);
    }
  }

  @isNativeMethod(
    Promise.resolve({
      status: '',
      isValid: () => true,
      description: ''
    })
  )
  public async getLicenseInfo(): Promise<LicenseInfo> {
    if (!this._scanbotSDK) {
      console.error('Scanbot SDK not initialized.');
      return Promise.reject('Scanbot SDK not initialized.');
    }

    try {
      return await this._scanbotSDK.getLicenseInfo();
    } catch (error) {
      console.error('Failed to get license info:', error);
      return Promise.reject(`Failed to get license info: ${error}`);
    }
  }

  @isNativeMethod(Promise.resolve())
  public async createBarcodeScanner(
    configuration: BarcodeScannerViewConfiguration
  ): Promise<void> {
    if (!this._scanbotSDK) {
      console.error('Scanbot SDK not initialized.');
      return Promise.reject('Scanbot SDK not initialized.');
    }

    try {
      this._scanner = await this._scanbotSDK.createBarcodeScanner(
        configuration
      );
    } catch (error) {
      console.error('Failed to create Barcode Scanner:', error);
      return Promise.reject(`Failed to create Barcode Scanner: ${error}`);
    }
  }

  @isNativeMethod(void 0)
  public pause(): void {
    this._scanner?.pauseDetection();
  }

  @isNativeMethod(void 0)
  public dispose(): void {
    this._scanner?.dispose();
  }

  @isNativeMethod(void 0)
  public turnOnTorch(): void {
    this.flashlightStatus = true;
    this._scanner?.updateTorch(true);
  }

  @isNativeMethod(void 0)
  public turnOffTorch(): void {
    this.flashlightStatus = false;
    this._scanner?.updateTorch(false);
  }
}
