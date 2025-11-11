import {
  PaymentBill,
  PaymentServiceScheduleCreatePayload,
  PaymentServicesResponse
} from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  SearchBillReferenceResponse,
  ServiceData
} from '@modules/payments/payment-services/entities/register-service.interface';

export const paymentServicesFeatureName = 'paymentServicesModuleState';

export interface SearchBillsState {
  data: ServiceData[];
  referenceInfo: SearchBillReferenceResponse;
  working: boolean;
  workingCategory: boolean;
  completed: boolean;
  completedCategory: boolean;
  message: string;
  notFound: boolean;
  hasErrorMessage: boolean;
}

export interface PaymentServicesState {
  services: PaymentServicesResponse;
  billSelected: PaymentBill;
  billSchedulePayload: PaymentServiceScheduleCreatePayload;
  working: boolean;
  completed: boolean;
  message: string;
  searchBills: SearchBillsState;
}

export const initialSearchBillState: SearchBillsState = {
  data: [],
  referenceInfo: null,
  working: false,
  workingCategory: false,
  completed: null,
  completedCategory: null,
  message: '',
  notFound: false,
  hasErrorMessage: false
};

export const initialPaymentServicesState: PaymentServicesState = {
  services: null,
  billSelected: null,
  billSchedulePayload: null,
  working: true,
  completed: false,
  message: '',
  searchBills: initialSearchBillState
};
