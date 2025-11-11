import { DeviceData } from '@app/commons/entities/device/device.interface';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import {
  CustomFacts,
  RechargePayload
} from '@modules/product-options/recharges/entities/recharges.interface';

export function mapRechargesPayload(values: any): RechargePayload {
  const productOrigin: Product = values.productOrigin;
  const mobileOperator: string = values.mobileOperator;
  const phoneNumber: string = values.phoneNumber;
  const amount: string = values.amount;

  return {
    productOrigin: {
      accountType: productOrigin.type as any,
      accountId: productOrigin.id,
      availableBalance: productOrigin.availableBalance,
      typeName: productOrigin.typeName,
      numberProduct: productOrigin.numberProduct
    },
    mobileOperator,
    amount: sanitizeCurrency(amount),
    phoneNumber: phoneNumber.replace(/ /g, '')
  };
}

export function mapCustomFacts(deviceInfo: DeviceData): CustomFacts {
  return {
    mobileDeviceName: deviceInfo.name,
    mobileDeviceModel: deviceInfo.model,
    mobileDeviceHardwareId: deviceInfo.uuid,
    mobileOSVersion: deviceInfo.osVersion,
    mobileOS: deviceInfo.platform,
    mobileLongitude: deviceInfo.longitude,
    mobileLatitude: deviceInfo.latitude,
    mobileLanguage: deviceInfo.languageCode,
    screenSize: deviceInfo.screenSize,
    appVersion: deviceInfo.appVersion
  };
}
