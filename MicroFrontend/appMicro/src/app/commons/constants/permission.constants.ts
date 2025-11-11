// TODO Generate from backend
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const RESTRING_FEATURES = [
  {
    id: 'withdraw-feature',
    enable: false,
    url: '/withdraw',
    btn: 'menu-withdraw',
    children: [
      'cash-withdrawals-feature',
      'money-orders-feature',
      'recharges-feature'
    ]
  },
  {
    id: 'cash-withdrawals-feature',
    enable: false,
    url: '/cash-withdrawal',
    btn: 'btn-cash-withdrawals-service'
  },
  {
    id: 'money-orders-feature',
    enable: false,
    url: '/money-order',
    btn: 'btn-money-orders-service'
  },
  {
    id: 'recharges-feature',
    enable: false,
    url: '/recharges',
    btn: 'btn-recharges-service'
  }
];

// TODO Generate urls from RESTRING_FEATURES if enable is true
export const RESTRING_URLS = [
  /*'/withdraw',
  '/payments',
  '/request-transfiya',
  '/cash-withdrawal'*/
];

// TODO Generate ids from RESTRING_FEATURES
export const RESTRING_IDS = [
  /*'transfers-other-person-link',
  'btn-cash-withdrawals-service',
  'btn-money-orders-service',
  'btn-recharges-service'*/
];

export const ALERT_COMPLEMENTARY_SERVICE_ERROR = {
  id: 'alert-complementary-service-error',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: AlertSheetIcon.error,
  title: 'Tus servicios complementarios se encuentran inactivos',
  description:
    'Puedes activarlos desde: Menú, seguridad, servicios complementarios',
  buttons: ['Entendido']
};

export const ALERT_COMPLEMENTARY_SERVICE_FAILURE_ERROR = {
  id: 'alert-complementary-service-failure-error',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: AlertSheetIcon.error,
  title: 'Tus servicios complementarios se encuentran inactivos',
  description: 'Intenta más tarde',
  buttons: ['Entendido']
};

export const ALERT_URL_OFF_ERROR = {
  id: 'alert-url-off-error',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrations/woman-computer.svg',
  title: 'Esta funcionalidad se encuentra inactiva',
  description: 'Pronto la habilitaremos',
  buttons: ['Entendido']
};
