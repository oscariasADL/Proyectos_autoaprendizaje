import { Product } from '@commons/entities/product/product.interface';

export interface ExtractsPeriod {
  period: string;
  startDate: string;
  endDate: string;
  fileId: string;
  fileName: string;
  fileDesc: string;
}

export interface ExtractPayload {
  productId: string;
  periodInfo: ExtractsPeriod;
}

export interface GroupedProducts {
  typeProduct: string | Product;
  values: (string | Product)[];
}
