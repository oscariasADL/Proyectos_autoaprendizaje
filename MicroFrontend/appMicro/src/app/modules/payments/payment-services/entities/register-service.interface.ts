export interface RegisterServicePayload {
  nickname: string;
  nie: string;
  orgIdNum: string;
}

export interface ServiceData {
  name: string;
  description: string;
  orgIdNum: string;
  imageUrl: string;
  isBiller: boolean;
  cityInfo: {
    code: string;
    name: string;
  };
}

export interface SearchBillReferencePayload {
  nie: string;
  orgIdNum: string;
}

export interface SearchBillReferenceResponse {
  referenceId: string;
  agreementType: number;
  invoiceNumber: string;
  maxPaymentDate?: string;
  maxPaymentDateComplete: string;
  amount: number;
  amountType: string;
  biller: boolean;
}

export interface SearchBillBarcodePayload {
  barcode: string;
}

export interface SearchBillBarcodeResponse {
  amount: string;
  serviceType: string;
  invoiceNum: string;
  nie: string;
  orgId: {
    orgIdNum: string;
    optOrgIdNum: string;
  };
  biller: boolean;
  amountType: string;
}
