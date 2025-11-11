import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransfersCel2CelRequestSlide {
  from = 'from',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const TransfersCel2celRequestStep = {
  [TransfersCel2CelRequestSlide.from]: 0,
  [TransfersCel2CelRequestSlide.amount]: 1,
  [TransfersCel2CelRequestSlide.confirmation]: 2
};

export const TRANSFERS_CEL2CEL_STEPS_REQUEST: Step[] = [
  {
    id: TransfersCel2celRequestStep[TransfersCel2CelRequestSlide.from],
    label: 'TRANSFERS.CEL2CEL.REQUEST.STEPS.TOWARD_LABEL'
  },
  {
    id: TransfersCel2celRequestStep[TransfersCel2CelRequestSlide.amount],
    label: 'TRANSFERS.CEL2CEL.REQUEST.STEPS.FROM_LABEL'
  },
  {
    id: TransfersCel2celRequestStep[TransfersCel2CelRequestSlide.confirmation],
    label: 'TRANSFERS.CEL2CEL.REQUEST.STEPS.CONFIRMATION_LABEL'
  }
];

export const TRANSFERS_CEL2CEL_REQUEST_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersRequestMoneyInfo,
  id: 'transfers-request-money-alert-info',
  title: 'TRANSFERS.REQUEST_MONEY.INFO_ALERT.TITLE',
  icon: 'illustrationsV2/celular-billete-small.svg',
  description: 'TRANSFERS.REQUEST_MONEY.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const REQUESTS_CEL2CEL_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'transfer-confirm-request-transfiya',
  title: 'TRANSFERS.EXIT_ALERT.TITLE_REQUEST_TRANSFIYA',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION_CEL2CEL',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
