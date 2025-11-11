import { TypeAccount } from '@commons/entities/product/type-account';

export interface RechargePayload {
  productOrigin: {
    accountType: TypeAccount;
    accountId: string;
    availableBalance: number;
    typeName: string;
    numberProduct: string;
  };
  mobileOperator: string;
  amount: number;
  phoneNumber: string;
}

export interface CustomFacts {
  mobileDeviceName: string;
  mobileDeviceModel: string;
  mobileDeviceHardwareId: string;
  mobileOSVersion: string;
  mobileOS: string;
  mobileLongitude: string;
  mobileLatitude?: string;
  mobileLanguage?: string;
  screenSize: string;
  appVersion: string;
}
