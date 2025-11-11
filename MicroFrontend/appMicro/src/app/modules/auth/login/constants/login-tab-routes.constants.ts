import {
  CARE_CHANNELS,
  QR_AUTHORIZATION,
  REQUEST_PRODUCTS
} from '@commons/constants/navigate.constants';
import { MenuList } from '@modules/layout/entities/tabs.interface';

export const LOGIN_MENU_LIST: MenuList[] = [
  {
    label: 'LOGIN.FOOTER.CARE_CHANNELS',
    icon: 'icon-callcenter',
    title: 'icon-callcenter',
    url: CARE_CHANNELS,
    id: 'footer-care-channels',
    position: 'left'
  },
  {
    label: 'LOGIN.FOOTER.QR',
    icon: 'icons/qr-blanco.svg',
    title: 'icon-qr',
    url: [''],
    id: 'menu-qr-login',
    position: 'center',
    subMenuList: [
      {
        label: 'QR.OPTIONS.AUTHORIZATION.TITLE',
        icon: 'iconsV2/bv-qr.svg',
        title: 'icon-transferencias',
        url: QR_AUTHORIZATION,
        id: 'submenu-qr-authorization',
        titleDetail: 'QR.OPTIONS.AUTHORIZATION.TITLE_DETAIL',
        descriptionDetail: 'QR.OPTIONS.AUTHORIZATION.DESCRIPTION_DETAIL'
      }
    ]
  },
  {
    label: 'LOGIN.FOOTER.REQUEST_PRODUCTS',
    icon: 'icon-add-product',
    title: 'icon-add-product',
    url: REQUEST_PRODUCTS,
    id: 'footer-request-products',
    position: 'right'
  }
];
