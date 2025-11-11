export const FRANCHISE_IMAGES = {
  VISA: 'visa-symbol.svg',
  MASTERCARD: 'mc-symbol.webp',
  MASTERDEBIT: 'md-symbol.webp',
  DEBIT: 'maestro-symbol.svg'
};

export const FRANCHISE_ICONS = {
  VISA: 'card-franchise-icons/visa.svg',
  MASTERCARD: 'card-franchise-icons/mastercard.svg',
  MASTERDEBIT: 'card-franchise-icons/masterdebit.svg'
};

export const BANK_GROUP = {
  AVAL: 'aval',
  OTHER_BANKS: 'otros_bancos',
  VISA_CODE: '0998',
  MASTERCARD_CODE: '0999',
  VILLAS_CODE: '0052',
  OCCIDENTE_CODE: '0023',
  BOGOTA_CODE: '0001',
  POPULAR_CODE: '0002',
  PORVENIR_CODE: '0098',
  FACILPASS_CODE: '0160',
  DALE: '0097'
};

export const FRANCHISE_TYPE = {
  VISA: '4',
  MASTERCARD: '5'
};

export const FRANCHISE_TYPE_NAME = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD'
};

export const AVAL_BANKS = [
  BANK_GROUP.VILLAS_CODE,
  BANK_GROUP.POPULAR_CODE,
  BANK_GROUP.BOGOTA_CODE,
  BANK_GROUP.OCCIDENTE_CODE
];

export enum BankListDecision {
  YES = 'si',
  NO = 'no'
}
