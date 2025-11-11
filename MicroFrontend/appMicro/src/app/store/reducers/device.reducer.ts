import { findIOSModel } from '@app/commons/helpers/findModel.helper';
import { Capacitor } from '@capacitor/core';
import { DeviceInfo } from '@capacitor/device';
import { capitalize } from '@commons/helpers/text.helpers';
import { Action, createReducer, on } from '@ngrx/store';
import {
  setDeviceInfo,
  setGeolocationInfo
} from '@store/actions/global.actions';
import { DeviceState, initialDeviceState } from '@store/state/device.state';

function getDeviceName(deviceInfo: DeviceInfo): string {
  if (Capacitor.getPlatform() === 'ios') {
    return toNormalForm(deviceInfo.name);
  }

  if (deviceInfo.model.startsWith(deviceInfo.manufacturer)) {
    return capitalize(toNormalForm(deviceInfo.model));
  }

  return toNormalForm(
    `${capitalize(deviceInfo.manufacturer)} ${deviceInfo.model}`
  );
}

const removeSpc = (str: string) =>
  str.toLowerCase().replace(' ', '').toLowerCase();
const featureReducer = createReducer(
  initialDeviceState,
  on(setDeviceInfo, (state: DeviceState, { deviceInfo }) => ({
    ...state,
    deviceInfo: {
      ...deviceInfo,
      deviceName: toNormalForm(
        `${
          Capacitor.getPlatform() === 'ios'
            ? removeSpc(findIOSModel(deviceInfo.model))
            : removeSpc(deviceInfo.model)
        }`
      ),
      deviceFullName: getDeviceName(deviceInfo),
      deviceOS: deviceInfo.operatingSystem,
      uuid: deviceInfo.uuid,
      model: `${removeSpc(deviceInfo.manufacturer)}_${
        Capacitor.getPlatform() === 'ios'
          ? removeSpc(findIOSModel(deviceInfo.model))
          : removeSpc(deviceInfo.model)
      }`
    }
  })),
  on(setGeolocationInfo, (state: DeviceState, { latitude, longitude }) => ({
    ...state,
    deviceInfo: {
      ...state.deviceInfo,
      latitude,
      longitude
    }
  }))
);

export const deviceReducer = (
  state: DeviceState,
  action: Action
): DeviceState => {
  return featureReducer(state, action);
};

export function toNormalForm(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '')
    .replace(/"/g, '');
}
