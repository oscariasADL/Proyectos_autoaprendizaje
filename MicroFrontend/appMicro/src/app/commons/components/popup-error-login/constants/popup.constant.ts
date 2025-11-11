export const POPUP_ERROR_LOGIN = {
  title: '¿Tienes problemas para ingresar?',
  paragraphs: ['Ten en cuenta lo siguiente:'],
  itemList: [
    'Evita conectarte desde redes wifi corporativas o con VPN activas y asegúrate de que tu red no presente problemas o restricciones de contenido.',
    '<span>Si olvidaste tu contraseña, puedes restablecerla utilizando la opción </span><span class="forgot-pass-popup">Olvidé mi contraseña.</span>',
    'Recuerda mantener la versión de la aplicación actualizada.'
  ],
  paragraphsOther: [
    'Revisa y vuelve a intentarlo, recuerda que estos controles se hacen para garantizar la seguridad en tus transacciones.'
  ],
  image: 'phone-conect.svg',
  imageAlt: 'phone-conect.svg',
  okButtonText: 'ENTENDIDO',
  linkKey: 'linkSecurityAlert',
  isTitleBottom: true,
  isOpenExternalLink: true,
  enable: false
};
export const POPUP_ERROR_LOGIN_INVALID_SEED: popUpErrorType = {
  title: 'Tienes el acceso restringido',
  paragraphs: [
    'Notamos que no has ingresado últimamente a tus canales digitales. ¡Vuelve y descubre las novedades que tenemos para ti!.',
    'Por lo cual te invitamos a restaurar tu contraseña.'
  ],
  itemList: [
    'Recuerda que desde nuestros canales digitales puedes realizar transferencias al instante desde Bre-B o número de cuenta.',
    'Puedes hacer pagos de tus facturas, créditos de otros bancos.'
  ],
  image: 'illustrationsV2/cerrar-sesion-regular.svg',
  imageAlt: 'cerrar-sesion-regular.svg',
  okButtonText: 'RESTAURAR CONTRASEÑA',
  linkKey: 'linkSecurityAlert',
  isTitleBottom: true,
  isOpenExternalLink: true,
  enable: false
};
export type popUpErrorType = {
  title: string;
  paragraphs?: string[];
  itemList: string[];
  paragraphsOther?: string[];
  image: string;
  imageAlt: string;
  okButtonText: string;
  linkKey: string;
  isTitleBottom: boolean;
  isOpenExternalLink: boolean;
  enable: boolean;
};
