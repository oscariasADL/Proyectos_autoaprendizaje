import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';

export const parameterFeatureName = 'parameter';

export enum ParameterType {
  documents = 'documents',
  codeBanks = 'codeBanks',
  bounds = 'bounds',
  links = 'links',
  categoriesPockets = 'categoriesPockets',
  withdrawalChannels = 'withdrawalChannels',
  typeProducts = 'typeProducts',
  mobileOperator = 'mobileOperator',
  socialSecurityOperator = 'socialSecurityOperator',
  digitalDebitCardQuestions = 'digitalDebitCardQuestions',
  appVersions = 'appVersions',
  complementaryServices = 'complementaryServices',
  featureToggles = 'featureToggles',
  financialConsumerAdvocate = 'financialConsumerAdvocate',
  helpSitesBm = 'helpSitesBm',
  brebFrequentQuestionsBm = 'brebFrequentQuestionsBm',
  marketingCampaignsBm = 'marketingCampaignsBm',
  securityCampaignsBm = 'securityCampaignsBm',
  storiesCampaignBm = 'storiesCampaignBm',
  termsAndConditions = 'termsAndConditions',
  cardCromalinesMap = 'cardCromalinesMap',
  virtualCreditCardQuestions = 'virtualCreditCardQuestions'
}

export const ParameterTypeExtension = {
  [ParameterType.documents]: 'csv',
  [ParameterType.codeBanks]: 'csv',
  [ParameterType.bounds]: 'csv',
  [ParameterType.links]: 'csv',
  [ParameterType.categoriesPockets]: 'csv',
  [ParameterType.withdrawalChannels]: 'csv',
  [ParameterType.mobileOperator]: 'csv',
  [ParameterType.socialSecurityOperator]: 'csv',
  [ParameterType.digitalDebitCardQuestions]: 'csv',
  [ParameterType.appVersions]: 'csv',
  [ParameterType.complementaryServices]: 'csv',
  [ParameterType.featureToggles]: 'csv',
  [ParameterType.financialConsumerAdvocate]: 'csv',
  [ParameterType.helpSitesBm]: 'json',
  [ParameterType.marketingCampaignsBm]: 'json',
  [ParameterType.securityCampaignsBm]: 'json',
  [ParameterType.storiesCampaignBm]: 'json',
  [ParameterType.termsAndConditions]: 'csv',
  [ParameterType.cardCromalinesMap]: 'json',
  [ParameterType.virtualCreditCardQuestions]: 'csv',
  [ParameterType.brebFrequentQuestionsBm]: 'json'
};

export interface ParameterList {
  documents: DropdownList[];
  codeBanks: DropdownList[];
  bounds: DropdownList[];
  links: DropdownList[];
  categoriesPockets: DropdownList[];
  withdrawalChannels: DropdownList[];
  typeProducts: DropdownList[];
  mobileOperator: DropdownList[];
  digitalDebitCardQuestions: any[];
  socialSecurityOperator?: DropdownList[];
  appVersions: any[];
  complementaryServices?: any[];
  featureToggles?: any[];
  financialConsumerAdvocate?: any[];
  featureFlagsBm?: FeatureFlagsBm[];
  helpSitesBm: any;
  marketingCampaignsBm: any;
  securityCampaignsBm: any;
  storiesCampaignBm: any;
  cardCromalinesMap: any;
  brebFrequentQuestionsBm: any;
  virtualCreditCardQuestions: any[];
}

export interface FeatureFlagsBm {
  featureName: string;
  value: any;
  availabilityDates?: string;
}

export interface TermsAndConditions {
  id: string;
  title: string;
  content: string;
}

export interface CardCromalineMap {
  bin: string;
  franchisee: string;
  description: string;
  cromalineUrl: string;
}

export type ParameterState = Readonly<{
  catalogue: ParameterList;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialParameterState: ParameterState = {
  catalogue: null,
  working: false,
  completed: false,
  message: ''
};
