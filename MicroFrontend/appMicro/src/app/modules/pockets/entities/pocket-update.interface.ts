export interface UpdatePocketPayload {
  id: string;
  type: string;
  name: string;
  goal: number;
  period: string;
  quota: number;
  status: number;
  pocketCategory: number;
  productTypeParent: string;
  productIdParent: string;
  changeStatus?: boolean;
}
