import { Product } from '@app/commons/entities/product/product.interface';
import { PFMCategoryType } from '@modules/pfm/entities/pfm.interface';

export interface DropdownList {
  index?: string;
  label?: string;
  value?: string;
  grupo?: string;
  icon?: string;
  pfmCategoryColor?: string;
  pfmCategoryType?: PFMCategoryType;
}
export interface ProductsDropdownList {
  label: string;
  value: Product;
}
