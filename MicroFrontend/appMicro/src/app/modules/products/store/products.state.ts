export const productsFeatureName = 'productsModuleState';

export type ProductsState = Readonly<{
  productFilter: number;
}>;

export const initialProductsState: ProductsState = {
  productFilter: 0
};
