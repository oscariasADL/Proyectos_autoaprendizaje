import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransfersCel2celSlide {
  from = 'from',
  amount = 'amount',
  bankToward = 'bankToward',
  confirmationCel2cel = 'confirmation'
}

export const TransfersCel2celStep = {
  [TransfersCel2celSlide.from]: 0,
  [TransfersCel2celSlide.amount]: 1,
  [TransfersCel2celSlide.bankToward]: 2,
  [TransfersCel2celSlide.confirmationCel2cel]: 3
};

export const TRANSFERS_CEL2CEL_STEPS: Step[] = [
  {
    id: TransfersCel2celStep[TransfersCel2celSlide.from],
    label: 'TRANSFERS.AVV_PHONE.STEPS.FROM'
  },
  {
    id: TransfersCel2celStep[TransfersCel2celSlide.amount],
    label: 'TRANSFERS.CEL2CEL.SEND.STEPS.TOWARD_LABEL'
  },
  {
    id: TransfersCel2celStep[TransfersCel2celSlide.bankToward],
    label: 'TRANSFERS.CEL2CEL.SEND.STEPS.ENTITY_LABEL'
  },
  {
    id: TransfersCel2celStep[TransfersCel2celSlide.confirmationCel2cel],
    label: 'TRANSFERS.CEL2CEL.SEND.STEPS.CONFIRMATION_LABEL'
  }
];

export const TRANSFERS_CEL2CEL_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersAvvPhoneInfo,
  id: 'transfers-avv-phone-alert-info',
  title: 'TRANSFERS.AVV_PHONE.INFO_ALERT.TITLE',
  icon: 'icons/transfers-avv-phone-info.svg',
  description: 'TRANSFERS.AVV_PHONE.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const TRANSFERS_CEL2CEL_CANT_TRANSFER_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.question,
  id: 'transfers-avv-phone-alert-toward-no-products',
  title: 'TRANSFERS.CEL2CEL.SEND.TRANSFERS_CEL2CEL_CANT_TRANSFER_ALERT.TITLE',
  icon: 'errorde-carga.svg',
  description:
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_CEL2CEL_CANT_TRANSFER_ALERT.DESCRIPTION',
  linkText:
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_CEL2CEL_CANT_TRANSFER_ALERT.LINK_TEXT',
  buttons: [
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_CEL2CEL_CANT_TRANSFER_ALERT.BUTTON_CHANGE_NUMBER',
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_CEL2CEL_CANT_TRANSFER_ALERT.BUTTON_USE_TRANSFIYA'
  ]
};

export const TRANSFERS_TRANSFIYA_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.question,
  id: 'transfers-avv-phone-alert-info',
  title: 'TRANSFERS.TRANSFIYA.INFO_HOME_ALERT.TITLE',
  icon: 'icons/transfers-transfiya-info.svg',
  panelKey: SecureKeys.hiddenTransferSCel2CelTransfiyaInfo,
  description:
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_TRANSFIYA_INFO_ALERT.DESCRIPTION',
  linkText: 'TRANSFERS.CEL2CEL.SEND.TRANSFERS_TRANSFIYA_INFO_ALERT.LINK_TEXT',
  buttons: [
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_TRANSFIYA_INFO_ALERT.BUTTON_USE_TRANSFIYA',
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_TRANSFIYA_INFO_ALERT.BUTTON_CHANGE_NUMBER'
  ]
};

export const TRANSFERS_AVV_PHONE_CONFIRM_TOWARD_ALERT: AlertSheetProperties = {
  id: 'alert-toward-confirm-phone-number',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/celular-billete-small.svg',
  title: '',
  description:
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_AVV_PHONE_CONFIRM_TOWARD_ALERT.DESCRIPTION',
  buttons: [
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_AVV_PHONE_CONFIRM_TOWARD_ALERT.BUTTON_CONFIRM',
    'TRANSFERS.CEL2CEL.SEND.TRANSFERS_AVV_PHONE_CONFIRM_TOWARD_ALERT.BUTTON_CHANGE_NUMBER'
  ]
};

export const CEL2CEL_BANK_LIST: any[] = [
  {
    name: 'Banco de Bogotá',
    icon: 'assets/img/aval-icons/banco-bogota.svg',
    id: '0001',
    utag: 'enviar plata - elige la entidad destino de tu contacto - banco de bogota',
    utagCategory: 'a un celular'
  },
  {
    name: 'Banco de Occidente',
    icon: 'assets/img/aval-icons/banco-occidente.svg',
    id: '0023',
    utag: 'enviar plata - elige la entidad destino de tu contacto - banco de occidente',
    utagCategory: 'a un celular'
  },
  {
    name: 'Banco Popular',
    icon: 'assets/img/aval-icons/banco-popular.svg',
    id: '0002',
    utag: 'enviar plata - elige la entidad destino de tu contacto - banco popular',
    utagCategory: 'a un celular'
  },
  {
    name: 'Banco AV Villas',
    icon: 'assets/icon/favicon.png',
    id: '0052',
    utag: 'enviar plata - elige la entidad destino de tu contacto - banco av villas',
    utagCategory: 'a un celular'
  },
  {
    name: 'dale!',
    icon: 'assets/img/aval-icons/dale.svg',
    id: '0097',
    utag: 'enviar plata - elige la entidad destino de tu contacto - dale',
    utagCategory: 'a un celular'
  }
];

export interface FetchedByPhoneTowardProduct {
  account: {
    accountId: string;
    accountType: string;
    bankInfo: {
      bankId: string;
    };
  };
  personInfo: {
    name: string;
    documentType: string;
    documentNumber: string;
  };
}
export const TRANSFIYA_INFO = {
  name: 'Otras entidades (transfiya)',
  icon: 'assets/img/icons/app-de-seguridad.svg',
  iconAlt: 'assets/img/icons/transfiya.svg',
  id: '0006'
};
