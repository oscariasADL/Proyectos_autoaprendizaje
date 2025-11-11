export interface QrData {
  emvIndicator: string;
  qrType: string;
  crc: string;
  securityHashCode: string;
  terminal: string;
  acquirerCode: string;
  merchantCode: string;
  ivaValue: string;
  incValue: string;
  merchantAggregatorCode: string;
  merchantCategoryCode: string;
  countryCode: string;
  merchantName: string;
  merchantCity: string;
  postalCode: string;
  channelCode: string;
  ivaConditionCode: string;
  ivaDomain: string;
  ivaBaseValue: string;
  incConditionCode: string;
  currencyCode: string;
  transactionAmount: string;
  trnConsecutiveCode: string;
  tipIndicator: string;
  tipValue: string;
  tipPercentage: string;
  totalTrxAmount: string;
  netTrxAmount: string;
  languagePreference: string;
  billingNumber: string;
  mobileNumber: string;
  storeLabel: string;
  loyaltyNumber: string;
  referenceLabel: string;
  customerLabel: string;
  trxPurpose: TrxPurpose;
  additionalConsumerData: string;
  merchantLanguageName: string;
  merchantLanguageCity: string;
  acquirerDomain: string;
  securityHashDomain: string;
  merchantDomain: string;
  channelDomain: string;
  ivaConditionDomain: string;
  ivaBaseDomain: string;
  incConditionDomain: string;
  trnConsecutiveDomain: string;
  incDomain: string;
}

export enum TrxPurpose {
  pay = '00',
  cancel = '02'
}

export enum QRType {
  static = 11, // QR Dale
  dynamic = 12
}
