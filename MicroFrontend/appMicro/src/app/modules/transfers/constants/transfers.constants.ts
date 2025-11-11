import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  TransferType,
  UtagTransferData
} from '@modules/transfers/entities/transfers.interface';

export enum TransferSlide {
  from = 'from',
  amount = 'amount',
  toward = 'toward',
  contactProducts = 'contactProducts',
  contactAddProduct = 'contactAddProduct',
  newAccount = 'newAccount',
  ownProducts = 'ownProducts',
  transferPhonenumber = 'transferPhonenumber',
  to = 'to',
  transferPhonenumberSelected = 'transferPhonenumberSelected',
  confirmation = 'confirmation'
}

export const TRANSFER_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'transfer-confirm-exit-alert',
  title: 'TRANSFERS.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION_CEL2CEL',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const TRANSFERS_AVAILABLE_FIELD = 'availableBalance';

export const TRANSFERS_TRANSFIYA_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersTransfiyaInfo,
  id: 'transfers-contacts-alert-info',
  title: 'TRANSFERS.TRANSFIYA.INFO_ALERT.TITLE',
  icon: 'illustrationsV2/mano-cuenta.svg',
  description: 'TRANSFERS.TRANSFIYA.INFO_ALERT.DESCRIPTION',
  itemList: [
    'TRANSFERS.TRANSFIYA.INFO_ALERT.LIST.ITEM_1',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.LIST.ITEM_2'
  ],
  sublist: [
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_1',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_2',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_3',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_4',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_5',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_6'
  ],
  sublist2: [
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_7',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_8',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_9',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_10',
    'TRANSFERS.TRANSFIYA.INFO_ALERT.SUBLIST.ITEM_11'
  ],
  buttons: ['ACTIONS.COPY_THAT'],
  cssClass: 'transfer-transfiya-info-alert'
};

export const TYPE_ACCOUNT_TRANSFER_ACCOUNTS: TypeAccount[] = [
  TypeAccount.SDA,
  TypeAccount.DDA
];

export const UTAG_TRANSFERS_DATA: Partial<
  Record<TransferType, UtagTransferData>
> = {
  [TransferType.SEND_CEL2CEL]: {
    utagCategory: 'a un celular',
    utag: 'enviar plata - la transferencia fue realizada exitosamente - '
  }
};

export const BANK_GROUP = {
  VILLAS_CODE: '0052',
  OCCIDENTE_CODE: '0023',
  BOGOTA_CODE: '0001',
  POPULAR_CODE: '0002',
  DALE: '0097'
};

export const AVAL_BANK_LABELS = {
  [BANK_GROUP.VILLAS_CODE]: 'Banco AV Villas',
  [BANK_GROUP.BOGOTA_CODE]: 'Banco de Bogotá',
  [BANK_GROUP.OCCIDENTE_CODE]: 'Banco de Occidente',
  [BANK_GROUP.POPULAR_CODE]: 'Banco Popular',
  [BANK_GROUP.DALE]: 'dale!'
};

export const BANKS_CODES_RBM = {
  VILLAS_CODE: '0052',
  OCCIDENTE_CODE: '0023',
  BOGOTA_CODE: '0001',
  POPULAR_CODE: '0002',
  DALE: '0097',
  NEQUI: '0977',
  DAVIPLATA: '0860',
  DAVIVIENDA: '0051',
  BANCOLOMBIA: '0807'
};
