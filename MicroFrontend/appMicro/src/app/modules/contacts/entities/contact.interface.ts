import { TypeAccount } from '@app/commons/entities/product/type-account';
import { ContactProductActionType } from '@modules/contacts/entities/contact-product.interface';

export interface Contact {
  name?: string;
  nickname?: string;
  phoneNumber?: string;
  email?: string;
  status?: StatusType;
  identificationData?: ContactId;
  products?: ContactProduct[];
  product?: ContactProduct;
  urlDetail?: string;
  urlEdit?: string;
  isFake?: boolean;
}

export enum StatusType {
  ACTIVE = 'A',
  BLOCK = 'B'
}

export interface ContactId {
  idType: string;
  id: string;
  filter?: ContactProductFilter;
}

export interface ContactProduct {
  alias: string;
  type: Type;
  number: string;
  bank: Bank;
  relativeId?: string;
  franchise?: string;
  status?: StatusTypeProduct;
  isNewNickname?: boolean;
  action?: ContactProductActionType;
  actionLabel?: string;
  id?: string;
}

export enum StatusTypeProduct {
  ACTIVE = 'A',
  BLOCK = 'B'
}

export interface Type {
  id: TypeAccount;
  name: string;
}

export interface ContactParams {
  getProducts?: boolean;
  filterBy?: ContactProductFilter;
}

export interface Bank {
  id: string;
  name: string;
  grupo?: string;
}

export interface CreditType {
  id: string;
  bankId: string;
  name: string;
}

export enum ContactProductFilter {
  ALL = 'ALL',
  ACCOUNTS = 'ACCOUNTS',
  PORTFOLIO_W_CC = 'PORTFOLIO_W_CC',
  PORTFOLIO_WO_CC = 'PORTFOLIO_WO_CC',
  CREDIT_CARDS = 'CREDIT_CARDS'
}

export enum ContactFormProductType {
  ACCOUNT = 'ACCOUNT',
  CREDIT_CARD = 'CREDIT_CARD',
  CREDIT = 'CREDIT'
}

export enum ContactProductType {
  SDA = 'SDA',
  DDA = 'DDA'
}

export const DEFAULT_CONTACT_INIT_PAGE = 1;
export const DEFAULT_CONTACT_PAGE_SIZE = 10;
export const CONTACT_PRODUCT_TYPES = [
  ContactProductType.SDA,
  ContactProductType.DDA
];
