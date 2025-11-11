import { TypeAccount } from '@commons/entities/product/type-account';

export interface PaymentsAgreementsResponse {
  agreements: AgreementTaxes[];
}

export interface PaymentsCitiesResponse {
  agreementCities: CityPaymentTaxes[];
}

export interface PaymentsReferenceValueRequest {
  agreement: string;
  reference: string;
}

export interface PaymentTaxesRequest {
  productOrigin: {
    accountType: TypeAccount;
    accountId: string;
  };
  cityId: string;
  referenceId: string;
  invoiceNumber: string;
  amount: string;
  organizationId: string;
  amountType: string;
}

export interface CityPaymentTaxes {
  code: string;
  name: string;
}

export interface AgreementTaxes {
  code: string;
  name: string;
  expectedReferenceDescription: string;
  additionalInfo?: string[];
  cityInfo?: CityPaymentTaxes;
}

export interface AgreementDetail {
  invoiceNumber: string;
  amount: string;
  currency: string;
  maxPaymentDate: string;
  organizationId: string;
  referenceId: string;
  amountType: string;
}
