import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { IdentificationFavoriteType } from '@modules/favorites/entities/favorites.interface';
import {
  TransferCel2celPayload,
  TransferPayload
} from '@modules/transfers/entities/transfers.interface';
import { RechargePayload } from '@modules/product-options/recharges/entities/recharges.interface';
import { WithdrawPayload } from '@modules/withdraw/entities/withdraw.interface';
import { PayBillPayload } from '@modules/payments/payment-services/entities/payment-services.interface';
import { NotificationTypeEnum } from '@app/commons/components/notification/constants/notification.constants';

export interface AlertSheetProperties {
  type?: AlertSheetType;
  id?: string;
  icon?: string;
  title?: string;
  description?: string;
  descriptionHtml?: string;
  reference?: string;
  items?: VoucherItem[];
  message?: string;
  buttons?: Array<string>;
  iconButtons?: Array<string>;
  buttonsAction?: Array<() => void>;
  linkText?: string;
  linkAction?: any;
  linkIcon?: string;
  buttonIconLink?: string;
  allowShare?: boolean;
  denyDownload?: boolean;
  itemList?: string[];
  sublist?: string[];
  sublist2?: string[];
  sublistInfo?: string;
  checkText?: string;
  checkTextLink?: string;
  checkTextAfter?: string;
  navigateOnCloseUrl?: string;
  linkUrl?: string;
  panelKey?: string;
  componentType?: AlertComponentType;
  cssClass?: string;
  mode?: any;
  dateReference?: string;
  favoriteId?: string;
  hideCloseButton?: boolean;
  favoritesData?: {
    type: IdentificationFavoriteType;
    data:
      | TransferPayload
      | RechargePayload
      | WithdrawPayload
      | TransferCel2celPayload
      | PayBillPayload;
  };
  iconList?: any[];
  alertType?: string;
  breakpoints?: number[];
  initialBreakpoint?: number;
  utagCategory?: string;
  utag?: string;
  utagCancel?: string;
  utagInfoLink?: string;
  utagModal?: string;
  bottomMessage?: string;
  bottomImage?: string;
  showNotification?: boolean;
  notificationType?: NotificationTypeEnum;
  notificationIcon?: string;
  notificationDescription?: string;
  spiContactKey?: string;
  shouldSaveSpiContact?: boolean;
  isFavoriteSpiContact?: boolean;
  isSavedSpiContact?: boolean;
  hasSuccessButtons?: boolean;
}

export enum AlertComponentType {
  alertInfo = 'alertInfo',
  alertSheet = 'alertSheet',
  alertCenter = 'alertCenter',
  alertOptions = 'alertOptions',
  alertBigPicture = 'alertBigPicture'
}

export enum AlertSheetType {
  success = 'success',
  error = 'error',
  question = 'question',
  option = 'option'
}
export interface BigPictureAlertSheetProps
  extends AlertSheetProperties,
    BigPictureMapperProps {}
export interface BigPictureMapperProps {
  id?: string;
  title?: string;
  remoteImgUri: string;
  buttonText: string;
  redirectTo?: string;
  description?: string;
  navigateOnCloseUrl?: string;
}

export enum AlertSheetIcon {
  success = 'icons/check.svg',
  error = 'icons/error-x.svg',
  brebSupport = 'illustrationsV2/celular-seguridad.svg'
}
