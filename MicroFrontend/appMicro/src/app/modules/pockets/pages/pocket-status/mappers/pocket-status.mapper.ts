import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import {
  Pocket,
  PocketStatus
} from '@modules/pockets/entities/pockets.interface';

export function mapPocketStatusPayload(pocket: Pocket): UpdatePocketPayload {
  const {
    numberProduct: id,
    description: name,
    instalmentAmount: quota,
    type,
    goal,
    pocketCategory,
    period,
    productIdParent,
    productTypeParent
  } = pocket;

  return {
    id,
    type,
    name,
    goal,
    quota,
    pocketCategory,
    period: period.toUpperCase(),
    productIdParent,
    productTypeParent,
    status:
      pocket.status === PocketStatus.ACTIVE
        ? PocketStatus.PAUSED
        : PocketStatus.ACTIVE,
    changeStatus: true
  };
}

export function mapPocketStatusAlert(pocket: Pocket): AlertSheetProperties {
  const data = {
    [PocketStatus.ACTIVE]: {
      title: 'POCKETS.STATUS.PAUSE.TITLE',
      description: 'POCKETS.STATUS.PAUSE.DESCRIPTION',
      buttons: [
        'POCKETS.STATUS.PAUSE.BUTTON',
        'POCKETS.STATUS.PAUSE.BUTTON_CANCEL'
      ]
    },
    [PocketStatus.PAUSED]: {
      title: 'POCKETS.STATUS.ACTIVATE.TITLE',
      description: 'POCKETS.STATUS.ACTIVATE.DESCRIPTION',
      buttons: [
        'POCKETS.STATUS.ACTIVATE.BUTTON',
        'POCKETS.STATUS.ACTIVATE.BUTTON_CANCEL'
      ]
    }
  };

  return {
    type: AlertSheetType.question,
    icon: 'illustrations/small-money-pocket.svg',
    id: 'pocket-status-alert',
    ...data[pocket.status]
  };
}
