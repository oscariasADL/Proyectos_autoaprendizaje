export interface CreatePocketPayload {
  openAmount: number;
  goal: number;
  name: string;
  period: string;
  quota: number;
  pocketCategory: number;
  productIdParent: string;
  productTypeParent: string;
  productNumberParent: string;
}
