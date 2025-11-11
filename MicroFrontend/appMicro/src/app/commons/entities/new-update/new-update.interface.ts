export interface NewUpdateParameter {
  appVersion: string;
  isMandatoryUpdate: string;
  platform: UpdatePlatform;
}

export enum UpdatePlatform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  BOTH = 'BOTH'
}
