import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { RequestProductSlide } from '../entities/request-products.entities';
import {
  CREDIT_CARD_MICROFRONTEND,
  DETAIL_HOUSING_MICROFRONTEND,
  DIGITAL_DEBIT_CARD,
  PERSONAL_LOAN_MICROFRONTEND
} from '@app/commons/constants/navigate.constants';

export const BACKGROUND_CLASS_SLIDERS = {
  TC: 'slider-tc',
  CA: 'slider-ca',
  CDT: 'slider-cdt',
  CLI: 'slider-cli',
  TDD: 'slider-tdd',
  SE: 'slider-se',
  DH: 'slider-dh'
};

export const CREDIT_CARD_SLIDE = {
  img: 'solicitar-productos/tarjeta-credito.png',
  content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_1',
  btn: 'REQUEST_PRODUCTS.SLIDER.BTN_CREDITO',
  url: LinkKey.linkCreditCard,
  isExternal: true,
  class: BACKGROUND_CLASS_SLIDERS.TC
};

export const CREDIT_CARD_SLIDE_MFE = {
  img: 'solicitar-productos/tarjeta-credito.png',
  content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_1',
  btn: 'REQUEST_PRODUCTS.SLIDER.BTN_CREDITO',
  url: `${CREDIT_CARD_MICROFRONTEND}`,
  isExternal: false,
  class: BACKGROUND_CLASS_SLIDERS.TC
};

export const PERSONAL_LOAN_SLIDE = {
  img: 'solicitar-productos/cuenta-credito-libre.png',
  content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_4',
  btn: 'REQUEST_PRODUCTS.SLIDER.BTN_DLA',
  url: LinkKey.linkDla,
  isExternal: true,
  class: BACKGROUND_CLASS_SLIDERS.CLI
};

export const PERSONAL_LOAN_SLIDE_MFE = {
  img: 'solicitar-productos/cuenta-credito-libre.png',
  content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_4',
  btn: 'REQUEST_PRODUCTS.SLIDER.BTN_DLA',
  url: `${PERSONAL_LOAN_MICROFRONTEND}`,
  isExternal: false,
  class: BACKGROUND_CLASS_SLIDERS.CLI
};

export const DIGITAL_DEBIT_CARD_SLIDE = {
  img: 'solicitar-productos/tarjeta-debito-digital.png',
  content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_5',
  btn: 'REQUEST_PRODUCTS.SLIDER.BTN_TDD',
  url: DIGITAL_DEBIT_CARD.toString(),
  isExternal: false,
  id: 'btn-request-digital-debit-card',
  class: BACKGROUND_CLASS_SLIDERS.TDD
};

export const DIGITAL_HOUSING_SLIDE_MFE = {
  img: '/assets/images/product-request/digital-housing.png',
  content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_7',
  btn: 'REQUEST_PRODUCTS.SLIDER.BTN_DLA',
  url: `${DETAIL_HOUSING_MICROFRONTEND}`,
  isExternal: false,
  class: BACKGROUND_CLASS_SLIDERS.DH,
  isImageSourceOnline: true
};

export const REQUEST_PRODUCTS_SLIDERS: RequestProductSlide[] = [
  {
    img: 'solicitar-productos/cuenta-ahorro.png',
    content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_2',
    btn: 'REQUEST_PRODUCTS.SLIDER.BTN_AHORRO',
    url: LinkKey.linkSavingsAccount,
    isExternal: true,
    class: BACKGROUND_CLASS_SLIDERS.CA
  },
  {
    img: 'solicitar-productos/cuenta-cdt.png',
    content: 'REQUEST_PRODUCTS.SLIDER.CONTENT.SLIDER_3',
    btn: 'REQUEST_PRODUCTS.SLIDER.BTN_CDT',
    url: LinkKey.linkCdt,
    isExternal: true,
    class: BACKGROUND_CLASS_SLIDERS.CDT
  }
];

export const REQUEST_PRODUCTS_ALERT = {
  id: 'home-promotion-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'REQUEST_PRODUCTS.ALERT.TITLE',
  description: 'REQUEST_PRODUCTS.ALERT.DESCRIPTION',
  buttons: ['REQUEST_PRODUCTS.ALERT.BUTTON', 'REQUEST_PRODUCTS.ALERT.CANCEL']
};

export const REQUEST_PRODUCTS_SLIDER_OPTIONS: any = {
  initialSlide: 0,
  speed: 500,
  slidesPerView: 2,
  spaceBetween: 180,
  centeredSlides: true
};
