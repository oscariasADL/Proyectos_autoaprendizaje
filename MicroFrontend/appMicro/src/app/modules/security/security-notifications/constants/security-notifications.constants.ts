import {
  SecurityNotificationsType,
  ToggleSecurityNotificationsResponse
} from '@modules/security/security-notifications/entities/security-notifications.interface';

export const SECURITY_NOTIFICATIONS_COMPLETED: {
  [SecurityNotificationsType: string]: ToggleSecurityNotificationsResponse;
} = {
  [SecurityNotificationsType.ENABLE]: {
    icon: 'illustrations/success.svg',
    title: 'Las notificaciones de AV Villas App <br> fueron activadas'
  },
  [SecurityNotificationsType.DISABLE]: {
    icon: 'illustrations/success.svg',
    title: 'Las notificaciones de AV Villas App <br> fueron desactivadas',
    subtitle: '¡Puedes activarlas en cualquier momento!'
  }
};

export const SECURITY_NOTIFICATIONS_ERROR: {
  [SecurityNotificationsType: string]: ToggleSecurityNotificationsResponse;
} = {
  [SecurityNotificationsType.ENABLE]: {
    icon: 'illustrationsV2/error-navegador-regular.svg',
    title: 'No fue posible activar las notificaciones',
    subtitle:
      'Estamos presentando inconvenientes, te invitamos a intentarlo más tarde.'
  },
  [SecurityNotificationsType.DISABLE]: {
    icon: 'illustrationsV2/error-navegador-regular.svg',
    title: 'No fue posible desactivar las notificaciones',
    subtitle:
      'Estamos presentando inconvenientes, te invitamos a intentarlo más tarde.'
  }
};
