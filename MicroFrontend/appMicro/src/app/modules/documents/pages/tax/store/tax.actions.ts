import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';

export const fetchTaxCertificateAction = createAction(
  type('[Global/API] Fetch tax certificate'),
  props<{ year: number }>()
);

export const fetchTaxCertificateSuccessAction = createAction(
  type('[Global/API] Fetch tax certificate success')
);

export const fetchTaxCertificateErrorAction = createAction(
  type('[Global/API] Fetch tax certificate error'),
  props<{ message: string; props: ToastProperties }>()
);
