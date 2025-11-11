import { FormControl } from '@angular/forms';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';

export interface CustomizeAvalTagPayload {
  currentKeyId: string;
  newKeyId: string;
  accountId: string;
  accountType: string;
  preferredIndicator: string;
  statusDesc: string;
  effDt: string;
}

export interface CustomizeAvalTagResponse {
  newKeyId: string;
  accountId: string;
  accountType: string;
  approvalId: string;
  keyType: string;
  date: string;
  ipAddress: string;
  status: string;
}

export interface CustomizeAvalTagForm {
  newKeyId: FormControl<string>;
  currentSpiUserKey: FormControl<ProductSpiUserKey>;
}

export interface CustomizeAvalTagFormValue {
  newKeyId: string;
  currentSpiUserKey: ProductSpiUserKey;
}
export interface RandomKeyPayload {
  accountType: TypeAccount;
  accountId: string;
}
export interface RandomKeyResponse {
  keySuggestions: KeySuggestion[];
}

export interface KeySuggestion {
  key: string;
  keyType: string;
}
