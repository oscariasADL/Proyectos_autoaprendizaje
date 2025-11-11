import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import {
  ActivationStatusDescription,
  MediaActivationData,
  MediaActivationOptionItem,
  MediaActivationType,
  ProductTypeActivation
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { mapError } from '@commons/helpers/http.helpers';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const SECURITY_MEDIA_ACTIVATION_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenMediaActivationInfo,
  id: 'media-activation-alert-info',
  title: '¿Qué es la configuración de tarjetas?',
  icon: 'illustrationsV2/configurar-tarjeta-regular.svg',
  description: 'La configuración de tarjetas te permite:',
  itemList: [
    '<b>Activar tarjetas débito y crédito</b>',
    '<b>Bloquear preventivamente o por robo</b> tus productos: Tarjetas de crédito, tarjetas debito o manillas de pago.',
    '<b>Cambiar</b> las claves de tus tarjetas débito o crédito'
  ],
  buttons: ['ACTIONS.COPY_THAT']
};

export const ACTIVATION_STATUS_CLASS = {
  [ActivationStatusDescription.TO_ACTIVATE.toLocaleLowerCase()]:
    'avv-alert-status-info',
  [ActivationStatusDescription.ACTIVE.toLocaleLowerCase()]:
    'avv-alert-status-success',
  [ActivationStatusDescription.BLOCKED.toLocaleLowerCase()]:
    'avv-alert-status-error',
  [ActivationStatusDescription.LOST_OR_THEFT_BLOCK.toLocaleLowerCase()]:
    'avv-alert-status-error',
  [ActivationStatusDescription.PREVENTIVE_BLOCK.toLocaleLowerCase()]:
    'avv-alert-status-warning',
  [ActivationStatusDescription.TEMPORAL_BLOCK.toLocaleLowerCase()]:
    'avv-alert-status-error'
};

export const MEDIA_ACTIVATION_CARD_OPTIONS: MediaActivationOptionItem[] = [
  {
    id: 'block-temporary-btn',
    icon: 'icon-alerta',
    label: 'Bloquear temporalmente',
    type: MediaActivationType.BlockTemporary
  },
  {
    id: 'block-card-btn',
    icon: 'icon-no_se_puede',
    label: 'Bloquear por pérdida o robo',
    type: MediaActivationType.BlockCard
  },
  {
    id: 'configure-password-btn',
    icon: 'icon-seguridad',
    label: 'Configurar Clave',
    type: MediaActivationType.ConfigurePassword
  }
];

export const MEDIA_ACTIVATION_CARD_OPTIONS_RESTRICTED = {
  [MediaActivationType.BlockTemporary]: [
    ProductTypeActivation.D,
    ProductTypeActivation.M,
    ProductTypeActivation.R
  ]
};

export const MEDIA_ACTIVATION_PASSWORD_DATA: {
  [key: string]: { title: string; description: string };
} = {
  [MediaActivationType.BlockCard]: {
    title: 'Activar tarjeta',
    description: 'Crea la clave para retirar en cajeros y oficinas'
  },
  [MediaActivationType.ConfigurePassword]: {
    title: 'Ingresa una clave',
    description: 'Esta servirá para hacer pagos y retiros'
  }
};

export enum MediaTextType {
  Normal = 'Normal',
  Alternative = 'Alternative'
}

export const ALTERNATIVE_CCA_TEXT = 'alternative';

export const MEDIA_TEXT_INFO = {
  [ProductTypeActivation.R]:
    'Pronto llegará a tu dirección de correspondencia la nueva Tarjeta Débito Mastercard, ' +
    'también puedes acercarte a una de nuestras Oficinas para solicitarla.',
  [ProductTypeActivation.M]:
    'Te invitamos a acercarte a una de nuestras Oficinas y solicitar tu nueva Tarjeta Débito.',
  [ProductTypeActivation.T]:
    'Pronto llegará a tu dirección de correspondencia tu nueva Tarjeta de Crédito.'
};

export const MEDIA_ACTIVATION_PASSWORD_SUCCESS: {
  [key: string]: MediaActivationData;
} = {
  [MediaActivationType.ActivateCard]: {
    title: 'La activación de tu tarjeta fue exitosa',
    description: 'Disfruta tu nueva tarjeta'
  },
  [MediaActivationType.ActivateCard + ALTERNATIVE_CCA_TEXT]: {
    title: 'La activación de tu tarjeta fue exitosa',
    showTextWithLink: true
  },
  [MediaActivationType.BlockCard]: {
    title: 'El bloqueo de tu producto fue exitoso',
    description: MEDIA_TEXT_INFO[MediaTextType.Normal]
  },
  [MediaActivationType.BlockCard + ALTERNATIVE_CCA_TEXT]: {
    title: 'El bloqueo de tu producto fue exitoso',
    description: MEDIA_TEXT_INFO[MediaTextType.Alternative]
  },
  [MediaActivationType.ConfigurePassword]: {
    title: 'La configuración se realizó  con éxito',
    description: 'Esta clave te servirá para hacer compras y retiros'
  },
  [MediaActivationType.ConfigurePassword + ALTERNATIVE_CCA_TEXT]: {
    title: 'La configuración se realizó  con éxito',
    description: 'Esta clave te servirá para hacer avances'
  },
  [MediaActivationType.BlockTemporary]: {
    title: 'El bloqueo temporal fue exitoso'
  },
  [MediaActivationType.BlockTemporary + ALTERNATIVE_CCA_TEXT]: {
    title: 'El bloqueo temporal fue exitoso'
  },
  [MediaActivationType.UnlockTemporary]: {
    title: 'El desbloqueo de tu producto fue exitoso',
    showTextWithLink: true
  },
  [MediaActivationType.UnlockTemporary + ALTERNATIVE_CCA_TEXT]: {
    title: 'El desbloqueo de tu producto fue exitoso',
    showTextWithLink: true
  },
  [MediaActivationType.UnlockPreventive]: {
    title: 'El desbloqueo de tu producto fue exitoso',
    showTextWithLink: true
  },
  [MediaActivationType.UnlockPreventive + ALTERNATIVE_CCA_TEXT]: {
    title: 'El desbloqueo de tu producto fue exitoso',
    showTextWithLink: true
  },
  [MediaActivationType.Unblock]: {
    title:
      'La configuración se realizo con éxito. Aquí te brindamos algunas recomendaciones por seguridad.',
    items: [
      'El número de tu clave es personal y nadie más debe conocerlo.',
      'Cambia tu clave con frecuencia.',
      'Realiza personalmente tus transacciones.',
      'No hagas transacciones si observas situaciones sospechosas.'
    ]
  },
  [MediaActivationType.Unblock + ALTERNATIVE_CCA_TEXT]: {
    title:
      'La configuración se realizo con éxito. Aquí te brindamos algunas recomendaciones por seguridad.',
    items: [
      'El número de tu clave es personal y nadie más debe conocerlo.',
      'Cambia tu clave con frecuencia.',
      'Realiza personalmente tus transacciones.',
      'No hagas transacciones si observas situaciones sospechosas.'
    ]
  }
};

export const MEDIA_ACTIVATION_PASSWORD_ERROR: { [key: string]: string } = {
  [MediaActivationType.ActivateCard]: 'No fue posible activar tu tarjeta',
  [MediaActivationType.BlockCard]: 'No fue posible bloquear tu producto',
  [MediaActivationType.BlockTemporary]:
    'No fue posible realizar el bloqueo temporal',
  [MediaActivationType.ConfigurePassword]: 'No fue posible asignar la clave',
  [MediaActivationType.Unblock]: 'No fue posible asignar la clave'
};

export const UNLOCK_PRODUCT_DATA: {
  [key: string]: { title: string; description?: string; message?: string };
} = {
  [ActivationStatusDescription.LOST_OR_THEFT_BLOCK]: {
    title: 'Bloqueo preventivo de tarjetas y manillas',
    description:
      'Por tu seguridad, nuestro sistema identifica transacciones sospechosas, ' +
      'si fue una compra legítima por favor desbloquea tu tarjeta o manilla.'
  },
  [ActivationStatusDescription.PREVENTIVE_BLOCK]: {
    title: 'Bloqueo preventivo de tarjetas y manillas',
    description:
      'Por tu seguridad, nuestro sistema identifica transacciones sospechosas, ' +
      'si fue una compra legítima por favor desbloquea tu tarjeta o manilla.'
  },
  [ActivationStatusDescription.TEMPORAL_BLOCK]: {
    title: 'Este producto presenta un bloqueo temporal',
    message:
      'Puedes desbloquear tu tarjeta para realizar compras físicas o virtuales, o esperar a la fecha de desbloqueo automático.'
  },
  [ActivationStatusDescription.BLOCKED]: {
    title: 'Este producto presenta un bloqueo',
    message:
      'Tu tarjeta se encuentra bloqueada por superar el máximo de intentos fallidos. Desbloquéala creando una nueva clave.'
  }
};

export const MEDIA_CAN_BE_UNLOCKED = [
  ActivationStatusDescription.PREVENTIVE_BLOCK.toLowerCase(),
  ActivationStatusDescription.TEMPORAL_BLOCK.toLowerCase()
];

export const MEDIA_UNLOCKED_TYPE = {
  [ActivationStatusDescription.PREVENTIVE_BLOCK]:
    MediaActivationType.UnlockPreventive,
  [ActivationStatusDescription.TEMPORAL_BLOCK]:
    MediaActivationType.UnlockTemporary,
  [ActivationStatusDescription.BLOCKED]: MediaActivationType.Unblock
};

export type creditcardFaceType = '-expiration' | '-cvc' | '';

export function mapBlockProductTemporarilyError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'cancel-account-error-alert',
    title: 'No fue posible bloquear temporalmente tu tarjeta',
    description: mapError(error)
  };
}

export function mapUnBlockProductError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'cancel-account-error-alert',
    title: 'No fue posible desbloquear tu tarjeta',
    description: mapError(error)
  };
}

export const UTAG_FOR_SECURITY_MEDIA_ACTIVATION: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'activar tarjeta',
  event_label: 'activar tarjeta - celular - exitosa'
};
