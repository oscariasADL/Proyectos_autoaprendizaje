import { CUSTOMIZA_AVAL_TAG_EVENTS } from '@app/modules/product-options/customize-aval-tag/constants/customize-aval-tag.constants';
import { TAG_AVAL_EVENTS } from '@app/modules/product/constants/product.constants';
import { UtagEvent } from './utag.entities';
import { POCKETS_MODULE_EVENTS } from '@app/modules/pockets/constants/utag.constants';
import { FAVORITES_EVENTS } from '@app/modules/favorites/pages/constants/add-to-favorites.constants';
import { BRE_B_EVENTS } from '@app/modules/transfers/pages/bre-b-transfers/constants/bre-b-transfers.constants';
import { UTAG_FOR_SECURITY_MEDIA_ACTIVATION } from '@app/modules/security/security-media-activation/constants/security-media-activation.constants';
export const UTAG_MARK: UtagEvent[] = [
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'transferencias',
    event_label: 'a contactos inscritos'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'transferencias',
    event_label: 'a cuentas av villas'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'transferencias',
    event_label: 'a un celular'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: '¿que es transferir a un celular?'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: '¿que es transferir a un celular? - entendido'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - elige la cuenta de origen - cuenta'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - elige la cuenta de origen - cuenta bloqueada'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - elige la cuenta de origen - cuenta bloqueada - abrir nueva cuenta'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - elige la cuenta de origen - cuenta bloqueada - salir del proceso'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - ingresa los datos de tu contacto - numero de celular'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - ingresa los datos de tu contacto - elegir de mis contactos de celular'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - ingresa los datos de tu contacto - valor a transferir'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - ingresa los datos de tu contacto - mensaje'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - ingresa los datos de tu contacto - continuar'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - ingresa los datos de tu contacto - eliminar contacto'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - ingresa los datos de tu contacto - contactos - buscar contacto'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - ingresa los datos de tu contacto - contactos - seleccionar contacto'
  },
  {
    track: 'link',
    tealium_event: 'modal',
    event_category: 'a un celular',
    event_label:
      'enviar plata - tu contacto no puede recibir esta transferencia - abrir'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - tu contacto no puede recibir esta transferencia - ¿que es transfiya?'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - tu contacto no puede recibir esta transferencia - cambiar numero'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - tu contacto no puede recibir esta transferencia - usar transfiya'
  },
  {
    track: 'link',
    tealium_event: 'modal',
    event_category: 'a un celular',
    event_label: 'enviar plata - ¿que es transfiya? - abrir'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - ¿que es transfiya? - conoce los bancos aliados a transfiya'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - ¿que es transfiya? - cambiar numero'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - ¿que es transfiya? - usar transfiya'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'bancos aliados - transfiya - regresar a la transferencia'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - confirmar numero - si, confirmar'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - confirmar numero - no, cambiar el numero'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - elige la entidad destino de tu contacto - banco de bogota'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - elige la entidad destino de tu contacto - banco de occidente'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - elige la entidad destino de tu contacto - banco popular'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - elige la entidad destino de tu contacto - banco av villas'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - elige la entidad destino de tu contacto - dale'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - elige la entidad destino de tu contacto - otras entidades'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - confirma los datos de tu transferencia - modificar valor'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - confirma los datos de tu transferencia - modificar hacia'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - confirma los datos de tu transferencia - modificar desde'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - confirma los datos de tu transferencia - modificar mensaje'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - confirma los datos de tu transferencia - transferir'
  },
  {
    track: 'link',
    tealium_event: 'modal',
    event_category: 'a un celular',
    event_label: 'enviar plata - no fue posible transferir - abrir'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - no fue posible transferir - cerrar'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label: 'enviar plata - no fue posible transferir - entendido'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - la transferencia fue realizada exitosamente - descargar comprobante'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un celular',
    event_label:
      'enviar plata - la transferencia fue realizada exitosamente - compartir'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un Tag AVAL',
    event_label: 'enviar plata - elige la cuenta'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un Tag AVAL',
    event_label: 'enviar plata - ingresa los datos de tu contacto - tag aval'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un Tag AVAL',
    event_label:
      'enviar plata - ingresa los datos para transferir - valor a transferir'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un Tag AVAL',
    event_label: 'enviar plata - ingresa los datos para transferir - mensaje'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un Tag AVAL',
    event_label: 'enviar plata - ingresa los datos para transferir - continuar'
  },
  {
    track: 'link',
    tealium_event: 'click',
    event_category: 'a un Tag AVAL',
    event_label:
      'enviar plata - confirma los datos de tu transferencia - transferir'
  },
  ...TAG_AVAL_EVENTS,
  ...CUSTOMIZA_AVAL_TAG_EVENTS,
  ...POCKETS_MODULE_EVENTS,
  ...FAVORITES_EVENTS,
  ...BRE_B_EVENTS,
  UTAG_FOR_SECURITY_MEDIA_ACTIVATION
];
