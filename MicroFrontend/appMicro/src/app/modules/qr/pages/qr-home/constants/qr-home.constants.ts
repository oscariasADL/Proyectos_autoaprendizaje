import { QrOptions } from '@modules/qr/entities/qr.entities';

export const ITEMS_DESCRIPTION: string[] = [
  'QR.HOME.ITEMS_DESC.ITEM_1',
  'QR.HOME.ITEMS_DESC.ITEM_2',
  'QR.HOME.ITEMS_DESC.ITEM_3'
];

// ForProd
export const QR_HOME_BUTTONS: QrOptions[] = [
  {
    title: 'QR.OPTIONS.AUTHORIZATION.TITLE',
    url: '/qr/authorization',
    icon: 'icon-giros_y_transferencias',
    disabled: true
  },
  {
    title: 'QR.OPTIONS.PAY.TITLE',
    url: '/qr/pay',
    icon: 'icon-qr'
  },
  {
    title: 'Buscar QR',
    url: '',
    icon: 'icon-subir_docs',
    disabled: true
  }
];
