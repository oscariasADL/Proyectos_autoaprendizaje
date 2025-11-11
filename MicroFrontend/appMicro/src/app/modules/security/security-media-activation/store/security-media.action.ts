import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';
import {
  ActivationPayloadRequest,
  ActivationProduct,
  MediaActivationType,
  SuspiciousTransaction,
  TemporaryBlockPayload
} from '../entities/security-media.interface';
import { ActivateProductSteps } from './security-media.state';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';

export const resetSecurity = createAction(
  type('[SECURITY_MEDIA_ACTIVATION] RESET_SECURITY')
);

export const fetchProducts = createAction(
  type('[SECURITY_MEDIA_ACTIVATION] FETCH_PRODUCTS')
);

export const fetchProductsSuccess = createAction(
  type('[SECURITY_MEDIA_ACTIVATION] FETCH_ACTIVATIONS_SUCCESS'),
  props<{ payload: ActivationProduct[] }>()
);

export const fetchProductsError = createAction(
  type('[SECURITY_MEDIA_ACTIVATION] FETCH_ACTIVATIONS_ERROR'),
  props<{ payload: string }>()
);

export const activateProduct = createAction(
  type('[SECURITY_MEDIA_ACTIVATION] ACTIVATE_PRODUCT'),
  props<{ payload: ActivationPayloadRequest }>()
);

export const activateProductSetStep = createAction(
  type('[SECURITY_MEDIA_ACTIVATION] ACTIVATE_PRODUCT_SET_STEP'),
  props<{ step: ActivateProductSteps; message?: string }>()
);

export const setMediaActivationType = createAction(
  type('[SECURITY_MEDIA_ACTIVATION] Set Media Activation Type'),
  props<{ mediaType: MediaActivationType }>()
);

export const blockProduct = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Block product',
  props<{ id: string }>()
);

export const temporaryBlockProduct = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Temporary block product',
  props<{ payload: TemporaryBlockPayload }>()
);

export const temporaryBlockProductV2 = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Temporary block product V2',
  props<{ payload: TemporaryBlockPayload }>()
);

export const temporaryBlockProductV2SuccessAction = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Temporary block product V2 success',
  props<{ props: ToastProperties }>()
);

export const temporaryBlockProductV2ErrorAction = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Temporary block product V2 error',
  props<{ props: AlertSheetProperties }>()
);

export const unlockProduct = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Unlock product',
  props<{ product: ActivationProduct }>()
);

export const unlockProductV2Action = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Unlock product V2',
  props<{ product: ActivationProduct }>()
);

export const unlockProductV2SuccessAction = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Unlock product V2 success',
  props<{ props: ToastProperties }>()
);

export const unlockProductV2ErrorAction = createAction(
  '[SECURITY_MEDIA_ACTIVATION] Unlock product V2 error',
  props<{ props: AlertSheetProperties }>()
);

export const suspiciousTransaction = createAction(
  type('[SECURITY_CONFIGURE_CARDS] SUSPICIOUS_TRANSACTION'),
  props<{ product: ActivationProduct }>()
);

export const suspiciousTransactionSuccess = createAction(
  type('[SECURITY_CONFIGURE_CARDS] SUSPICIOUS_TRANSACTION_SUCCESS'),
  props<{ suspiciousTransaction: SuspiciousTransaction }>()
);

export const suspiciousTransactionError = createAction(
  type('[SECURITY_CONFIGURE_CARDS] SUSPICIOUS_TRANSACTION_ERROR'),
  props<{ message: string }>()
);
