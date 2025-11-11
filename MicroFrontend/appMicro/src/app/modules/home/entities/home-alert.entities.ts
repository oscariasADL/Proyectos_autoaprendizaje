import {
  AlertComponentType,
  BigPictureAlertSheetProps
} from '@app/commons/entities/alert/alert-sheet.entities';

export interface HomeAlertProperties {
  id: HomeAlertIds;
  description: string;
  priority: HomeAlertPriority;
  type?: HomeAlertType;
  icon?: string;
  action?: HomeAlertActionI;
}

export enum HomeAlertType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

export enum HomeAlertPriority {
  MEDIA_ACTIVATION,
  MEDIA_BLOCK,
  COMPLEMENTARY_SERVICES
}

export enum HomeAlertIds {
  MEDIA_ACTIVATION = 'alert-media-activation',
  MEDIA_BLOCKED = 'alert-media-blocked',
  COMPLEMENTARY_SERVICES = 'alert-complementary-services'
}

export interface HomeAlertActionI {
  text: string;
  url: string | any[];
}

export const HOME_ALERT_ICONS = {
  [HomeAlertType.INFO]: 'icon-info',
  [HomeAlertType.SUCCESS]: 'icon-check',
  [HomeAlertType.ERROR]: 'icon-salir',
  [HomeAlertType.WARNING]: 'icon-alerta'
};

export const SHOULD_NOT_DELETE_ALERT_ON_CLICK: HomeAlertIds[] = [
  HomeAlertIds.COMPLEMENTARY_SERVICES
];

export interface RequestProductCard {
  title: string;
  description: string;
  linkText: string;
  image: string;
  imageAlt: string;
  url: string;
  deviceOs?: 'all' | 'ios' | 'android';
}

export const HOME_ALERT: BigPictureAlertSheetProps = {
  componentType: AlertComponentType.alertBigPicture,
  id: 'home-info',
  remoteImgUri: 'assets/images/illustrations/virtual-tour/step1.svg',
  title: 'test',
  description: 'test description',

  buttonText: 'testbtn'
};
