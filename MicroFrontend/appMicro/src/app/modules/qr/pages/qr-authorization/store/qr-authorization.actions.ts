import {
  FA2Payload,
  FA2PayloadResponse
} from '@app/commons/entities/notifications/notification.entities';
import { ToastProperties } from '@app/commons/entities/toast/toast.entities';
import { type } from '@app/commons/utils/util';
import { createAction, props } from '@ngrx/store';

export const setQrData = createAction(
  '[QrAuthorization] Set QR Authorization',
  props<{
    transactionTitle: string;
    decryptedData: Record<string, string>;
    dynamicCode: string;
  }>()
);

export const scanningQr = createAction('[QrAuthorization] Scanning QR');
export const sendToken = createAction(
  '[QrAuthorization] Send 2FA token',
  props<{ payload: FA2Payload }>()
);
export const sendTokenSuccess = createAction(
  '[Data] Send 2FA Success',
  props<{ props: ToastProperties }>()
);
export const sendTokenFailure = createAction(
  '[Data] Send 2FA Failure',
  props<{ props: ToastProperties }>()
);
