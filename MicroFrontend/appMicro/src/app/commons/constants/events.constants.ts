import { Capacitor } from '@capacitor/core';
import { environment as ENV } from '@environment';

export const enabledTealium = Capacitor.isNativePlatform() && ENV.tealium;

export const enabledDatadog =
  Capacitor.isNativePlatform() && ENV.dataDog.enable;
