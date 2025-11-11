import { DeviceData } from '@commons/entities/device/device.interface';

export type DeviceState = Readonly<{
  deviceInfo: DeviceData;
}>;

export const initialDeviceState: DeviceState = {
  deviceInfo: null
};
