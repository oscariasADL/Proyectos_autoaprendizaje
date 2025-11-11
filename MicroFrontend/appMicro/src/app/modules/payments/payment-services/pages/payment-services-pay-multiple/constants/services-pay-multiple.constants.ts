import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SecureKeys } from '@commons/constants/keys.constants';

export enum ServicesPayMultipleSlide {
  service = 'service',
  from = 'from',
  confirmation = 'confirmation'
}

export const ServicesPayMultipleStep = {
  [ServicesPayMultipleSlide.service]: 0,
  [ServicesPayMultipleSlide.from]: 1,
  [ServicesPayMultipleSlide.confirmation]: 2
};

export const SERVICES_PAY_MULTIPLE_STEPS: Step[] = [
  {
    id: ServicesPayMultipleStep[ServicesPayMultipleSlide.service],
    label: 'PAYMENTS.SERVICES.STEPS.SERVICE'
  },
  {
    id: ServicesPayMultipleStep[ServicesPayMultipleSlide.from],
    label: 'PAYMENTS.SERVICES.STEPS.FROM'
  },
  {
    id: ServicesPayMultipleStep[ServicesPayMultipleSlide.confirmation],
    label: 'PAYMENTS.SERVICES.STEPS.CONFIRM'
  }
];

export const SERVICES_PAY_MULTIPLE_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'services-pay-confirm-exit-alert',
  title: 'PAYMENTS.SERVICES.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const SERVICES_PAY_MULTIPLE_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenPaymentServiceMultiple,
  id: 'services-pay-multiple-alert-info',
  title: 'PAYMENTS.SERVICES.SERVICE_STEP.INFO_ALERT.TITLE',
  icon: 'illustrationsV2/menu-bolsa-de-dinero-small.svg',
  description: 'PAYMENTS.SERVICES.SERVICE_STEP.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const MAX_SELECTION_SERVICES = 5;

export const SERVICES_PAY_MULTIPLE_AVAILABLE_FIELD = 'availableBalance';
