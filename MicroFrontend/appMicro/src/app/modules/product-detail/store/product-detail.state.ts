import { ProductDetail } from '../entities/product-detail.entity';

export const productDetailFeatureName = 'productDetailModuleState';

export type ProductDetailState = Readonly<{
  data: ProductDetail;
  working: boolean;
  completed: boolean;
  hasMovements: boolean;
  message: string;
  selected: ProductDetail;
}>;

export const initialProductDetailState: ProductDetailState = {
  data: null,
  working: false,
  completed: false,
  hasMovements: false,
  message: '',
  selected: null
};
