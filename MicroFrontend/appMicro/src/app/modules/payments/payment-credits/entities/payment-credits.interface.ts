import { ContactId } from '@modules/contacts/entities/contact.interface';

export interface PaymentCredit {
  loanName?: string;
  productType?: string;
  productTypeDesc?: string;
  numberProduct?: string;
  minPaymentAmount?: number;
  minPaymentReducedAmount?: number;
  franchise?: string;
  cardType?: string;
  bankName?: string;
  maxPaymentDate?: string;
  contactName?: string;
  relativeId?: string;
  nickname?: string;
  bankCode?: string;
  totalPaymentAmount?: number;
  owner?: {
    idType?: string;
    id?: string;
  };
  typePayment?: DetailTypePayment;
  accountType?: string;
  accountId?: string;
  bankId?: string;
  identificationData?: ContactId;
}

export interface PaymentCredits {
  loansVillas: PaymentCredit[];
  loansOtherBanks: PaymentCredit[];
  loansContacts: PaymentCredit[];
}

export enum DetailTypePayment {
  CREDIT_CARD_VILLAS = 'tarjeta-villas',
  CREDIT_CARD_OTHERS = 'tarjeta-otros',
  CREDIT_CARD_CONTACTS = 'tarjeta-contactos',
  AVAL_CREDITS_VILLAS = 'credito-villas',
  AVAL_CREDITS_OTHERS = 'credito-otros',
  AVAL_CREDITS_CONTACTS = 'credito-contactos'
}

export enum PaymentFetchFilter {
  OWN = 'true',
  CONTACTS = 'false'
}

export interface PaymentCreditsOwn {
  creditCardsVillas: PaymentCredit[];
  creditCardsOtherBanks: PaymentCredit[];
  creditsVillas: PaymentCredit[];
  creditsOtherBanks: PaymentCredit[];
}

export interface PaymentCreditsContacts {
  creditCardsContacts: PaymentCredit[];
  creditsContacts: PaymentCredit[];
}

export interface PaymentCreditsList {
  own: PaymentCreditsOwn;
  contacts: PaymentCreditsContacts;
}
