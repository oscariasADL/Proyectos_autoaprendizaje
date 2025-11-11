import { Capacitor } from '@capacitor/core';

export const isNativeMethod = (returnValue: any) =>
  function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (Capacitor.isNativePlatform()) {
        return originalMethod.apply(this, args);
      }
      return returnValue;
    };
    return descriptor;
  };
