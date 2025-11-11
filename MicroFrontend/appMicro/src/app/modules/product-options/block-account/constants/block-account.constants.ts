import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const BLOCK_ACCOUNT_CONFIRM = {
  id: 'alert-block-account-confirm',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'account-security.svg',
  title: 'BLOCK_ACCOUNT.BLOCK_ACCOUNT_CONFIRM_TITLE',
  description: 'BLOCK_ACCOUNT.BLOCK_ACCOUNT_CONFIRM_DESCRIPTION',
  buttons: [
    'BLOCK_ACCOUNT.BLOCK_ACCOUNT_CONFIRM_BTN_1',
    'BLOCK_ACCOUNT.BLOCK_ACCOUNT_CONFIRM_BTN_2'
  ]
};

export enum BlockAccountTypeIds {
  LostNotebook = '01',
  Stole = '04'
}
