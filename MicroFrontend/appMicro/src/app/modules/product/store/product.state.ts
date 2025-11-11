import {
  Balance,
  ProductCategory,
  ProductCategoryItem
} from '@commons/entities/product/balance.interface';
import { FETCH_PRODUCTS_RETRIES } from '@modules/product/constants/product.constants';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';

export const productFeatureName = 'productModuleState';

export type ProductState = Readonly<{
  balance: Balance[];
  balanceWorking: boolean;
  balanceCompleted: boolean;
  balanceCategory: ProductCategory;
  balanceCategories: ProductCategoryItem[];
  nicknames: ProductNickname[];
  spiUserKeys: ProductSpiUserKey[];
  retries: number;
  hiddenBalance: boolean;
  workingHiddenBalance: boolean;
  firstCall: boolean;
  completedTC: boolean;
  workingTC: boolean;
  firstCallTC: boolean;
  workingSpiUserKey: boolean;
  completedSpiUserKey: boolean;
  isSPIAuthorization: boolean;
  spiConsentAccepted: boolean;
}>;

export const initialProductState: ProductState = {
  balance: [],
  balanceWorking: false,
  balanceCompleted: false,
  balanceCategory: ProductCategory.all,
  balanceCategories: [],
  nicknames: [],
  spiUserKeys: [],
  retries: FETCH_PRODUCTS_RETRIES,
  hiddenBalance: false,
  workingHiddenBalance: false,
  firstCall: true,
  completedTC: false,
  workingTC: false,
  firstCallTC: false,
  workingSpiUserKey: false,
  completedSpiUserKey: false,
  isSPIAuthorization: false,
  spiConsentAccepted: false
};
