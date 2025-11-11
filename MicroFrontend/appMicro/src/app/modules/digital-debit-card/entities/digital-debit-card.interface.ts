import { FormControl } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';

export interface DigitalDebitCardCreatePayload {
  relativeId: string;
  amount: number;
  nickName: string;
  digitalDebitCardTrnType?: DigitalDebitCardType;
}

export interface DigitalDebitCardEditPayload
  extends Omit<DigitalDebitCardCreatePayload, 'relativeId'> {
  relativeIdParent: string;
}

export enum DigitalDebitCardType {
  NEW = 'NEW',
  CANCELLATION = 'CANCELLATION',
  REISSUE = 'REISSUE'
}

export interface DigitalDebitCard {
  relativeParentId: string;
  numberProductParent: string;
  numberDigitalCard: string;
  name: string;
  isNew?: boolean;
}

export interface DigitalDebitCardDetail {
  numberDigitalCard: string;
  expDate: string;
  cvs: string;
  name: string;
  amount?: number;
}

export interface ActivateDigitalDebitCardForm {
  productOrigin: FormControl<Product>;
  nickName: FormControl<string>;
  amount: FormControl<string>;
  confirmation?: FormControl<any>;
}

export interface ActivateDigitalDebitCardFormValue {
  productOrigin: Product;
  nickName: string;
  amount: string;
  confirmation?: any;
}
