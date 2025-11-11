import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import {
  PayBillPayload,
  PaymentBill,
  PaymentServiceScheduleCreatePayload,
  PaymentServicesResponse
} from '@modules/payments/payment-services/entities/payment-services.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';
import {
  SearchBillReferencePayload,
  SearchBillReferenceResponse,
  ServiceData
} from '../entities/register-service.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { PayBillsMultiplePayload } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';

export const fetchPaymentServicesAction = createAction(
  type('[Global/API] Fetch payment services')
);

export const fetchPaymentServicesSuccessAction = createAction(
  type('[Global/API] Fetch payment services success'),
  props<{ services: PaymentServicesResponse }>()
);

export const fetchPaymentServicesErrorAction = createAction(
  type('[Global/API] Fetch payment services error'),
  props<{ message: string }>()
);

export const payBillAction = createAction(
  type('[Global/API] Pay bill'),
  props<{
    payload: PayBillPayload;
    data: AlertStepData;
    isRegistered: boolean;
  }>()
);

export const payBillSuccessAction = createAction(
  type('[Global/API] Pay bill success'),
  props<{ props: AlertSheetProperties }>()
);

export const payBillErrorAction = createAction(
  type('[Global/API] Pay bill error'),
  props<{ props: AlertSheetProperties }>()
);

export const payBillsMultipleAction = createAction(
  type('[Payments/Services/Multiple] Pay Bills Multiple'),
  props<{ payload: PayBillsMultiplePayload; data: AlertStepData }>()
);

export const payBillsMultipleSuccessAction = createAction(
  type('[Payments/Services/Multiple] Bills Multiple success'),
  props<{ props: AlertSheetProperties }>()
);

export const payBillsMultipleErrorAction = createAction(
  type('[Payments/Services/Multiple] Bills Multiple error'),
  props<{ props: AlertSheetProperties }>()
);

export const setBillAction = createAction(
  type('[Global/UI] Set bill'),
  props<{ bill: PaymentBill }>()
);

export const searchCategory = createAction(
  '[Global/API] SEARCH_CATEGORY',
  props<{ query: string }>()
);

export const searchCategorySuccess = createAction(
  '[Global/API] SEARCH_CATEGORY_SUCCESS',
  props<{ payload: ServiceData[] }>()
);

export const searchCategoryError = createAction(
  '[Global/API] SEARCH_CATEGORY_ERROR',
  props<{ message: string }>()
);

export const searchCategoryClean = createAction(
  '[Global/API] SEARCH_CATEGORY_CLEAN'
);

export const searchBillReference = createAction(
  '[Global/API] SEARCH_BILL_REFERENCE',
  props<{ payload: SearchBillReferencePayload }>()
);

export const searchBillReferenceSuccess = createAction(
  '[Global/API] SEARCH_BILL_REFERENCE_SUCCESS',
  props<{ referenceInfo: SearchBillReferenceResponse }>()
);

export const searchBillReferenceError = createAction(
  '[Global/API] SEARCH_BILL_REFERENCE_ERROR',
  props<{ message: string; hasErrorMessage: boolean }>()
);
export const searchBillReferenceClean = createAction(
  '[Global/API] SEARCH_BILL_REFERENCE_CLEAN'
);

export const setBillSchedulingPayloadAction = createAction(
  type('[PAYMENT/SERVICES] Set Bill Scheduling Payload'),
  props<{ payload: PaymentServiceScheduleCreatePayload }>()
);

export const createBillSchedulingAction = createAction(
  type('[PAYMENT/SERVICES] CREATE_BILL_SCHEDULING'),
  props<{ data: VoucherItem[] }>()
);

export const createBillSchedulingSuccessAction = createAction(
  type('[PAYMENT/SERVICES] Create Bill Scheduling'),
  props<{ props: AlertSheetProperties }>()
);

export const createBillSchedulingErrorAction = createAction(
  type('[PAYMENT/SERVICES] Create Bill Scheduling Error'),
  props<{ props: AlertSheetProperties }>()
);

export const editBillSchedulingAction = createAction(
  type('[PAYMENT/SERVICES] Edit Bill Scheduling'),
  props<{ data: VoucherItem[] }>()
);

export const editBillSchedulingSuccessAction = createAction(
  type('[PAYMENT/SERVICES] Edit Bill Scheduling Success'),
  props<{ props: AlertSheetProperties }>()
);

export const editBillSchedulingErrorAction = createAction(
  type('[PAYMENT/SERVICES] Edit Bill Scheduling Error'),
  props<{ props: AlertSheetProperties }>()
);

export const deleteBillSchedulingAction = createAction(
  type('[PAYMENT/SERVICES] Delete Bill Scheduling'),
  props<{ data: VoucherItem[] }>()
);

export const deleteBillSchedulingSuccessAction = createAction(
  type('[PAYMENT/SERVICES] Delete Bill Scheduling Success'),
  props<{ props: AlertSheetProperties }>()
);

export const deleteBillSchedulingErrorAction = createAction(
  type('[PAYMENT/SERVICES] Delete Bill Scheduling Error'),
  props<{ props: AlertSheetProperties }>()
);
