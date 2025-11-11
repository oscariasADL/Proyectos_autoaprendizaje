import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';

export const documentsFeatureName = 'documentsModuleState';

export type DocumentsState = Readonly<{
  selected: ProductDetail;
}>;

export const initialDocumentsState: DocumentsState = {
  selected: null
};
