import { TypeAccount } from '@commons/entities/product/type-account';
import { RequestProductSlide } from '@modules/products/pages/request-products/entities/request-products.entities';
import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';

export const DELAY = 15000;

export const POCKETS = ['/pockets'];
export const BUY_WALLET = ['/debit-purchase'];

export const CONFIG_SLIDES = {
  initialSlide: 0,
  centeredSlides: true,
  autoplay: {
    delay: DELAY,
    disableOnInteraction: false,
    stopOnLastSlide: false
  },
  allowTouchMove: true
};

export const BACKGROUND_CLASS_SLIDERS = {
  BO: 'slide-bo',
  CDT: 'slide-cdt',
  TDD: 'slide-tdd',
  CCL: 'slide-cci',
  TCV: 'slide-tcv'
};

export const REQUEST_PRODUCTS_SLIDERS: RequestProductSlide[] = [
  {
    img: 'slider-campaign/bolsillos.png',
    title: 'CAMPAIGN.SLIDES.SLIDE_1.TITLE',
    content: 'CAMPAIGN.SLIDES.SLIDE_1.DESCRIPTION',
    btn: 'CAMPAIGN.SLIDES.SLIDE_1.BUTTON',
    url: POCKETS.toString(),
    isExternal: false,
    class: BACKGROUND_CLASS_SLIDERS.BO,
    accountTypesAllowed: [TypeAccount.SDA, TypeAccount.DDA],
    featureFlagKey: FeatureFlagsKey.Pockets
  },
  {
    img: 'slider-campaign/cdt.png',
    title: 'CAMPAIGN.SLIDES.SLIDE_2.TITLE',
    content: 'CAMPAIGN.SLIDES.SLIDE_2.DESCRIPTION',
    btn: 'CAMPAIGN.SLIDES.SLIDE_2.BUTTON',
    url: LinkKey.linkCdt,
    isExternal: true,
    class: BACKGROUND_CLASS_SLIDERS.CDT,
    accountTypesAllowed: [TypeAccount.SDA, TypeAccount.DDA],
    featureFlagKey: FeatureFlagsKey.CdtRenewal
  },
  {
    img: 'slider-campaign/compra-cartera.png',
    title: 'CAMPAIGN.SLIDES.SLIDE_4.TITLE',
    id: 'compra-cartera',
    content: 'CAMPAIGN.SLIDES.SLIDE_4.DESCRIPTION',
    btn: 'CAMPAIGN.SLIDES.SLIDE_4.BUTTON',
    url: BUY_WALLET.toString(),
    isExternal: false,
    class: BACKGROUND_CLASS_SLIDERS.CCL,
    accountTypesAllowed: [TypeAccount.CCA],
    featureFlagKey: FeatureFlagsKey.DebitPurchase
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
