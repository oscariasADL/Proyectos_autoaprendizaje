import { DeviceData } from '@commons/entities/device/device.interface';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { ToggleComplementaryServicesPayload } from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import { BANK_GROUP } from '@commons/constants/card.constants';

export function mapComplementaryServicesPayload({
  deviceInfo,
  loginData,
  fingerprint,
  automaticValidation,
  turnOn,
  otpValue
}: {
  deviceInfo: DeviceData;
  loginData: LoginUserPayload;
  fingerprint: string;
  automaticValidation: boolean;
  turnOn: boolean;
  otpValue?: string;
}): ToggleComplementaryServicesPayload {
  const {
    model: deviceModel,
    platform: devicePlatform,
    appVersion: deviceAppVersion,
    appBuild: deviceAppBuild,
    operatingSystem: deviceOperatingSystem,
    osVersion: deviceOsVersion,
    manufacturer: deviceManufacturer,
    uuid: deviceUuid,
    deviceName,
    deviceOS,
    latitude,
    longitude,
    screenSize
  } = deviceInfo;
  return {
    content: {
      idType: loginData?.typeDocument,
      id: loginData?.document,
      deviceOS,
      deviceName,
      companyId: BANK_GROUP.VILLAS_CODE,
      serial: fingerprint,
      deviceSerial: fingerprint,
      deviceModel,
      devicePlatform,
      deviceUuid,
      deviceAppVersion,
      deviceAppBuild,
      deviceOperatingSystem,
      deviceOsVersion,
      deviceManufacturer,
      otpValue,
      isVirtual: true,
      automaticValidation,
      turnOn,
      mobileLongitude: longitude,
      mobileLatitude: latitude,
      screenSize: screenSize
    }
  };
}
