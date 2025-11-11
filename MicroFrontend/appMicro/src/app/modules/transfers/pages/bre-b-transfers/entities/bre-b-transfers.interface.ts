import { FormControl } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';
import { TransferType } from '@app/modules/transfers/entities/transfers.interface';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';

export interface BreBTransfersForm {
  towardAvalKey: FormControl<string>;
  amount: FormControl<string>;
  fromProduct: FormControl<Product>;
  addenda: FormControl<any>;
  fee: FormControl<string>;
  transferType: FormControl<TransferType>;
  towardProduct: FormControl<TowardAccount>;
  isFavoriteContact: FormControl<boolean>;
  isSavedContact: FormControl<boolean>;
  contactName: FormControl<string>;
  gmfData: FormControl<GMFData>;
}

export interface BreBTransfers {
  amount: string;
  fromProduct: Product;
  towardAvalKey: string;
  addenda?: any;
  fee: string;
  towardProduct: TowardAccount;
  contactName: string;
  gmfData?: GMFData;
}

export interface BreBContactSelectedResponse {
  selectedContactKey: string;
  entityName: string;
  fullName: string;
  isFav: boolean;
}

export interface TowardAccount {
  key: string;
  bankName?: string;
  name?: string;
  fullName?: string;
}

export interface AddSpiContactPayload {
  contactKey: string;
  customName: string;
  fullName: string;
  obfuscatedFullName: string;
  nameBank: string;
  isFav: boolean;
}

export interface SpiContact {
  obfuscatedFullName: string;
  isFav: boolean;
  identNumClient: string;
  timestamp: string;
  nameBank: string;
  updateTimestamp: string;
  fullName: string;
  contactKey: string;
  bankIdContact: string;
  customName: string;
}

export interface UpdateSpiContactPayload {
  contactKey: string;
  isFav: boolean;
  customName?: string;
  fullName?: string;
  obfuscatedFullName?: string;
  nameBank?: string;
}
