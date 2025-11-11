import { TypeAccount } from '@commons/entities/product/type-account';
import { Product } from '@commons/entities/product/product.interface';
import { ProductSpiUserKey } from './product-spi-user-key';
import { TypeProduct } from '@app/commons/entities/product/balance.interface';

export interface ProductCard {
  icon?: string;
  title?: string;
  description?: string;
  value?: number;
  valueIsText?: boolean;
  rightIcon?: string;
  toggleValue?: boolean;
  iconImage?: string;
  cardImage?: string;
  isNew?: boolean;
  type?: TypeAccount;
  typeDetail?: string;
  currency?: string;
  avalTagKey?: ProductSpiUserKey[];
  breBUserKeys?: ProductSpiUserKey[];
  product?: Product;
  balanceTypeProduct?: TypeProduct;
}
