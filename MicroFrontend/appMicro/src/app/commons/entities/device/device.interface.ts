import { DeviceInfo } from '@capacitor/device';

export interface DeviceData extends DeviceInfo {
  deviceSerial?: string;
  deviceName?: string;
  deviceOS?: string;
  uuid?: string;
  appVersion?: string;
  appBuild?: string;
  languageCode: string;
  screenSize: string;
  longitude?: string;
  latitude?: string;
}
