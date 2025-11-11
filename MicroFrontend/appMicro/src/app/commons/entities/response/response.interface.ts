export interface SuccessResponse {
  approvalId: string;
  transactionDate?: string;
  paymentDate?: string;
  name: string;
  otp?: string;
  hasComplementaryServices?: boolean;
}

export interface ErrorResponse {
  code: string;
  description: string;
}

export interface GenericResponse extends SuccessResponse, ErrorResponse {
  approvalId: string;
  transactionDate: string;
  name: string;
  code: string;
  description: string;
  otp?: string;
}
