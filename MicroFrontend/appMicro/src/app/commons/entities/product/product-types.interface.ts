import { TypeProduct } from '@commons/entities/product/balance.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

export interface ProductFilterSelector {
  typeProduct?: TypeProduct;
  typeProducts?: TypeProduct[];
  typeAccountProduct?: TypeAccount;
  typeAccountProducts?: TypeAccount[];
  excludeSubtypeAccountProducts?: string[];
}
