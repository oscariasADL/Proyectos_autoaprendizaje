import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';

export const fetchTowardProductsByPhoneNumberAction = createAction(
  type('[Global/API] Fetch cel2cel toward products by phone number'),
  props<{ phone: string }>()
);

export const fetchTowardProductsByPhoneNumberSuccessAction = createAction(
  type('[Global/API] Fetch cel2cel toward products by phone number success'),
  props<{ towardProducts: any[] }>()
);

export const fetchTowardProductsByPhoneNumberErrorAction = createAction(
  type('[Global/API] Fetch cel2cel toward products by phone number error'),
  props<{ message: string }>()
);

export const completedToFalseAction = createAction(
  type('[Global/API] cel2cel completed to false')
);

export const setUseTransfiyaAction = createAction(
  type('[Global/API] cel2cel use tansfiya'),
  props<{ useTransfiya: boolean }>()
);
