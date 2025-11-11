import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const CARE_CHANNELS_PHONE_NUMBERS_LIST: any[] = [
  {
    label: 'CARE_CHANNELS.LABELS.BOGOTA',
    phonenumber: '(601) 4441777',
    id: 'btn-bogota-phonenumber'
  },
  {
    label: 'CARE_CHANNELS.LABELS.BARRANQUILLA',
    phonenumber: '(605) 3304330',
    id: 'btn-barranquilla-phonenumber'
  },
  {
    label: 'CARE_CHANNELS.LABELS.BUCARAMANGA',
    phonenumber: '(607) 6302980',
    id: 'btn-bucaramanga-phonenumber'
  },
  {
    label: 'CARE_CHANNELS.LABELS.CALI',
    phonenumber: '(602) 8859595',
    id: 'btn-cali-phonenumber'
  },
  {
    label: 'CARE_CHANNELS.LABELS.MEDELLIN',
    phonenumber: '(604) 325 6000',
    id: 'btn-medellin-phonenumber'
  },
  {
    label: 'CARE_CHANNELS.LABELS.NATIONAL_LINE',
    phonenumber: '01 8000 51 8000',
    id: 'btn-linea-nacional-phonenumber'
  }
];

export const CARE_CHANNELS_BENEFITS_ALERT = {
  id: 'care-channels-benefits-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'Vas a salir de AV Villas App',
  description:
    'Seras dirigido a la página de beneficios para clientes preferentes',
  buttons: ['Si, ir a beneficios', 'CARE_CHANNELS.CHAT_ALERT.CANCEL']
};

export const OPEN_MAP_EXTERNAL_URL_ALERT = {
  id: 'open-external-url-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'REDIRECT_MAP.TITLE',
  description: 'REDIRECT_MAP.DESCRIPTION',
  buttons: ['REDIRECT_MAP.BUTTONS.OK', 'ACTIONS.CANCEL']
};

export const OPEN_MAP_URL_SEARCHER_ATH =
  'https://www.avvillas.com.co/BuscadordePuntosAvVillas/?entidad=avvillas';

export const URL_CUSTOMER = 'https://ustarizabogados.com/';

export const OPEN_BENEFITS_URL =
  'https://www.avvillas.com.co/productos-en-oficina/cliente-preferente';
