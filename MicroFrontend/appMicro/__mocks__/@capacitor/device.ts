import { GetLanguageCodeResult } from '@capacitor/device/dist/esm/definitions';

export const Device = {
  async getInfo(): Promise<DeviceInfo> {
    return Promise.resolve({
      model: '',
      platform: 'ios',
      operatingSystem: '',
      osVersion: '',
      manufacturer: '',
      isVirtual: false,
      webViewVersion: ''
    });
  },
  async getId(): Promise<DeviceId> {
    return Promise.resolve({
      identifier: ''
    });
  },

  getLanguageCode(): Promise<GetLanguageCodeResult> {
    return Promise.resolve({
      value: 'es'
    });
  }
};

export interface DeviceInfo {
  name?: string;
  model: string;
  platform: 'ios' | 'android' | 'web';
  operatingSystem: any;
  osVersion: string;
  manufacturer: string;
  isVirtual: boolean;
  memUsed?: number;
  diskFree?: number;
  diskTotal?: number;
  realDiskFree?: number;
  realDiskTotal?: number;
  webViewVersion: string;
}

export interface DeviceId {
  identifier: string;
}
