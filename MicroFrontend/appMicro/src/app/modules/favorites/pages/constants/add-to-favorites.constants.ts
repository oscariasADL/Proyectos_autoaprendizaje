import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { TransferType } from '@app/modules/transfers/entities/transfers.interface';

export enum FavoritesTransferType {
  avVillasAccounts = TransferType.FAST_TRANSFER,
  cellphone = TransferType.SEND_CEL2CEL,
  contacts = TransferType.MY_CONTACTS
}

export const FAVORITES_TRANSFER_LIST = [
  {
    icon: 'icon-salario',
    label: 'Cuentas AV Villas',
    value: FavoritesTransferType.avVillasAccounts
  },
  {
    icon: 'icon-celular',
    label: 'A un celular',
    value: FavoritesTransferType.cellphone
  },
  {
    icon: 'icon-giros_y_transferencias',
    label: 'Contactos inscritos',
    value: FavoritesTransferType.contacts
  }
];

export const UTAG_FOR_ADD_FAVORITE_TAG_AVAL: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'agregar favorito tag aval',
  event_label: 'agregar favorito - Tag o llave'
};

export const UTAG_FOR_ADD_FAVORITE_MOBILE: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'agregar favorito celular',
  event_label: 'agregar favorito - celular - número de celular'
};

export const UTAG_FOR_ADD_FAVORITE_TRANSFIYA: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'agregar favorito celular',
  event_label: 'agregar favorito - celular - otras entidades'
};

export const UTAG_FOR_ADD_FAVORITE_FAVORITE_NAME: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'agregar favorito tag aval',
  event_label: 'agregar favorito - nombre de favorito'
};
export const UTAG_FOR_ADD_FAVORITE_VILLAS: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'agregar favorito villas',
  event_label: 'agregar favorito - villas - villas'
};
export const UTAG_FOR_ADD_FAVORITE_CONTACTS: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'agregar favorito contactos',
  event_label: 'agregar favorito - contactos - contactos'
};
export const FAVORITES_EVENTS: UtagEvent[] = [
  UTAG_FOR_ADD_FAVORITE_TAG_AVAL,
  UTAG_FOR_ADD_FAVORITE_MOBILE,
  UTAG_FOR_ADD_FAVORITE_FAVORITE_NAME
];

export const DESCRIPTION_TARGET_LABEL = {
  AVAL: 'A celulares AVAL',
  TRANSFIYA: 'A celulares transfiya',
  TAG_AVAL_OR_KEY: 'Tag AVAL/Llave',
  VILLAS: 'A cuentas villas',
  CONTACTS: 'A contactos'
};
