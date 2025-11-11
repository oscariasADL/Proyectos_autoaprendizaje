export interface GMFPayload {
  productNumber: string;
  productType: string;
  amountTransaction: number;
  availableBalance: number;
}
export interface GMFData {
  limitIndicator: string;
  isExempt: string;
  allowTransaction: string;
  costGmf: number;
  totalTransaction: number;
  amountTransaction: number;
  availableBalance: number;
  currentBalance: number;
  rateGmf: number;
}
