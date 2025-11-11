import { FormControl } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';

export interface VirtualCreditCard {
  numberProductOTCV: string;
  numberProductTCV: string;
  nickname: string;
  franchise?: string;
  amount: number;
  status: 'N' | 'U';
}

export interface VirtualCreditCardDetail {
  numberProductTCV: string;
  cvcTCV: string;
  expDateTCV: string;
  maxAmtTCV: string;
  statusTCV: string;
  typeTCV: string;
  nickname: string;
}

export interface VirtualCreditCardListPayload {
  acctTypeParent: string;
  numberProductParent: string;
}

export interface VirtualCreditCardCreatePayload {
  numberCreditCard: string;
  accType: string;
  amount: string;
}

export interface VirtualCreditCardDetailPayload {
  acctTypeParent: string;
  numberProductParent: string;
  numberProductTCV: string;
}

export interface VirtualCreditCardQuestion {
  question: string;
  answer: string;
}

export interface VirtualCreditCardOperationPayload {
  acctTypeParent: string;
  numberProductParent: string;
  numberCreditCard: string;
  nickName: string;
  amount: string;
}

export interface ActivateVirtualCreditCardForm {
  fromProduct: FormControl<Product>;
  nickName: FormControl<string>;
  amount: FormControl<string>;
  confirmation?: FormControl<any>;
}

export interface ActivateVirtualCreditCardFormValue {
  fromProduct: Product;
  nickName: string;
  amount: number;
  confirmation?: any;
}

export enum VirtualCreditCardActionType {
  NEW = 'NEW',
  EDIT = 'EDIT',
  CANCELLATION = 'CANCELLATION',
  REISSUE = 'REISSUE'
}
