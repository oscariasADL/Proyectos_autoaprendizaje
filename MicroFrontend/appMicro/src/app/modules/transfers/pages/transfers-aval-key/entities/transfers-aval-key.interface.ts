import { FormControl } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';
import { TransferType } from '@modules/transfers/entities/transfers.interface';

export interface AccountAvalKey {
  accountId: string;
  accountType: string;
  bankId: string;
  bankName: string;
  name: string;
  identSerialNum: string;
  govIssueIdentType: string;
  key: string;
  type: string;
  fullName: string;
  cameraReference: string;
  receiverCamera: string;
  personType: string;
  personCategory: string;
  merchantId?: string;
}

export interface TowardAccount {
  productId: string;
  productType: string;
  bank: string;
  identSerialNum: string;
  govIssueIdentType: string;
  key: string;
  type: string;
  fullName: string;
  bankName: string;
  cameraReference: string;
  receiverCamera: string;
  personType: string;
  personCategory: string;
  merchantId?: string;
}

export interface TransferAvalKeyForm {
  fromProduct: FormControl<Product>;
  towardAvalKey: FormControl<string>;
  towardProduct: FormControl<TowardAccount>;
  contactName: FormControl<string>;
  amount: FormControl<string>;
  transferType: FormControl<TransferType>;
  note: FormControl<string>;
  fee: FormControl<string>;
  confirmation?: FormControl<any>;
}

export interface TransferAvalKeyFormValue {
  fromProduct: Product;
  towardAvalKey: string;
  towardProduct: TowardAccount;
  contactData: string;
  amount: string;
  transferType: TransferType;
  note: string;
  fee: string;
  confirmation?: any;
}
