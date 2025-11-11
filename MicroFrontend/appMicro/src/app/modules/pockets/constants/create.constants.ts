import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const REDIRECT_POCKET_RENTABILITY: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'onboarding de creación de bolsillos',
  event_label: 'redirecciona a creación de bolsillo con rentabilidad'
};

export const REDIRECT_POCKET_ORGANIZER: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'onboarding de creación de bolsillos',
  event_label: 'redirecciona a creación de bolsillo organizador'
};

export const RENTABILITY_POCKET_CONTINUE_CONFIG: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'creación de bolsillos con rentabilidad',
  event_label: 'Continuar a configuracion'
};

export const RENTABILITY_POCKET_CONTINUE_CONFIRMATION: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'creación de bolsillos con rentabilidad',
  event_label: 'Continuar a confirmación'
};

export const RENTABILITY_POCKET_CREATE: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'creación de bolsillos con rentabilidad',
  event_label: 'Crear bolsillo'
};

export const ORGANIZER_POCKET_CONTINUE_CONFIG: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'creación de bolsillos organizadores',
  event_label: 'Continuar a configuracion'
};

export const ORGANIZER_POCKET_CONTINUE_CONFIRMATION: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'creación de bolsillos organizadores',
  event_label: 'Continuar a confirmación'
};

export const ORGANIZER_POCKET_CREATE: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'creación de bolsillos organizadores',
  event_label: 'Crear bolsillo'
};
export const POCKETS_CREATE_EVENTS: UtagEvent[] = [
  REDIRECT_POCKET_RENTABILITY,
  REDIRECT_POCKET_ORGANIZER,
  RENTABILITY_POCKET_CONTINUE_CONFIG,
  RENTABILITY_POCKET_CONTINUE_CONFIRMATION,
  RENTABILITY_POCKET_CREATE,
  ORGANIZER_POCKET_CONTINUE_CONFIG,
  ORGANIZER_POCKET_CONTINUE_CONFIRMATION,
  ORGANIZER_POCKET_CREATE
];
