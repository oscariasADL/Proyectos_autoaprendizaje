import { DELETE_T_POCKET_TAG } from '@app/modules/pockets/constants/delete.constants';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export function mapPocketDeleteAlert(): AlertSheetProperties {
  return {
    type: AlertSheetType.question,
    icon: 'illustrations/trash.svg',
    id: 'pocket-delete-alert',
    title: 'POCKETS.DELETE.TITLE',
    description: 'POCKETS.DELETE.DESCRIPTION',
    buttons: ['POCKETS.DELETE.BUTTON', 'POCKETS.DELETE.BUTTON_CANCEL'],
    utag: DELETE_T_POCKET_TAG.event_label,
    utagCategory: DELETE_T_POCKET_TAG.event_category
  };
}
