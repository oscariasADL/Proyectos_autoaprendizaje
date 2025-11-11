import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { POCKETS_ADD_EVENTS } from './add.constants';
import { POCKETS_CREATE_EVENTS } from './create.constants';
import { POCKETS_DELETE_EVENTS } from './delete.constants';
import { POCKETS_TRANSFER_EVENTS } from './transfers.constants';
import { POCKETS_RESUME_EVENTS } from './resume.constants';

export const POCKETS_MODULE_EVENTS: UtagEvent[] = [
  ...POCKETS_ADD_EVENTS,
  ...POCKETS_CREATE_EVENTS,
  ...POCKETS_DELETE_EVENTS,
  ...POCKETS_TRANSFER_EVENTS,
  ...POCKETS_RESUME_EVENTS
];
