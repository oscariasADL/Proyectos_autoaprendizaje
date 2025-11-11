import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export interface DigitalDebitCardQuestion {
  question: string;
  answer: string;
}

export const DIGITAL_DEBIT_CARD_ALERT = {
  id: 'digital-debit-card-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'change-password.svg',
  title: 'DIGITAL_DEBIT_CARD.ALERT.TITLE',
  description: 'DIGITAL_DEBIT_CARD.ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};
