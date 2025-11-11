import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum PocketCreateWithReturnsSlide {
  customization = 'customization',
  configuration = 'configuration',
  confirmation = 'confirmation'
}

export const PocketCreateWithReturnsStep = {
  [PocketCreateWithReturnsSlide.customization]: 0,
  [PocketCreateWithReturnsSlide.configuration]: 1,
  [PocketCreateWithReturnsSlide.confirmation]: 2
};

export const POCKET_CREATE_WITH_RETURNS_STEPS: Step[] = [
  {
    id: PocketCreateWithReturnsStep[PocketCreateWithReturnsSlide.customization],
    label: 'POCKET_WITH_RETURNS.CREATE.STEPS.CUSTOMIZATION'
  },
  {
    id: PocketCreateWithReturnsStep[PocketCreateWithReturnsSlide.configuration],
    label: 'POCKET_WITH_RETURNS.CREATE.STEPS.CONFIGURATION'
  },
  {
    id: PocketCreateWithReturnsStep[PocketCreateWithReturnsSlide.confirmation],
    label: 'POCKETS.CREATE.STEPS.CONFIRM'
  }
];

export const POCKET_CREATE_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'pocket-create-confirm-exit-alert',
  title: 'POCKETS.CREATE.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const POCKET_CREATE_AVAILABLE_FIELD = 'availableBalance';
export const RATES_URL =
  'https://www.avvillas.com.co/productos-en-oficina/ahorro-inversion/bolsillos';
