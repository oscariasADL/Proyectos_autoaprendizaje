import { QuickAction } from '@commons/capacitor-web-plugins/quick-actions';
import {
  CARE_CHANNELS,
  HOME,
  REQUEST_PRODUCTS
} from '@commons/constants/navigate.constants';

export enum ProductTypeActivation {
  careChannels = 'careChannels',
  requestProducts = 'requestProducts',
  qr = 'qr'
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    type: ProductTypeActivation.careChannels,
    title: 'Canales de atención',
    iconType: 'QuickActionCareChannel'
  },
  {
    type: ProductTypeActivation.requestProducts,
    title: 'Solicitar productos',
    iconType: 'QuickActionRequestProducts'
  } /*,
  {
    type: ProductTypeActivation.qr,
    title: 'QR',
    iconType: 'QuickActionQR'
  }*/
];

export const QUICK_ACTIONS_URL = {
  [ProductTypeActivation.careChannels]: CARE_CHANNELS,
  [ProductTypeActivation.requestProducts]: REQUEST_PRODUCTS,
  [ProductTypeActivation.qr]: HOME
};
