import { FormControl } from '@angular/forms';
import { Product } from '@app/commons/entities/product/product.interface';

export interface PocketCustomizationFormGroup {
  pocketName: FormControl<string | null>;
  category: FormControl<string | null>;
  originAccount: FormControl<Product | null>;
}

export interface PocketConfigurationFormGroup {
  goal: FormControl<number | null>;
  openAmount: FormControl<number | null>;
  period: FormControl<number | null>;
  periodicity: FormControl<string | null>;
  quota: FormControl<number | null>;
  renewPocket: FormControl<boolean | null>;
  renewWithProfits: FormControl<boolean | null>;
  product: FormControl<any | null>;
}

export interface ConfirmationFormGroup {
  terms: FormControl<boolean | null>;
}

export interface SavePocketCustomizationPayload {
  name: string;
  pocketCategory: string;
  productIdParent: string;
  productNumberParent: string;
  productTypeParent: string;
  pocketType: string;
}

export interface SavePocketConfigPayload {
  openAmount: number;
  goal: string;
  period: string;
  quota: number;
  renewPocket: boolean;
  renewWithProfits: boolean;
}

export interface PocketConfirmationForm extends SavePocketConfigPayload {
  account: FormControl;
  accounts: FormControl[];
  category: FormControl;
}

export interface CreatePocketWithReturnsPayload {
  period: string;
  openAmount: string;
  name: string;
  goal: number;
  quota: number;
  productIdParent: string;
  productNumberParent: string;
  productTypeParent: string;
  pocketCategory: string;
  pocketType: string;
  renewAutomatically: boolean;
  renewProfits: boolean;
  termOfPermanenceInDays: number;
}
