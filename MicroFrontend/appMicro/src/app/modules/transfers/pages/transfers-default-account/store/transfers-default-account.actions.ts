import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { DefaultAccount } from '@modules/transfers/pages/transfers-default-account/entities/transfers-default-account.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const fetchDefaultAccountAction = createAction(
  type('[TRANSFER_DEFAULT_ACCOUNT] Fetch Default Account')
);

export const fetchDefaultAccountSuccessAction = createAction(
  type('[TRANSFER_DEFAULT_ACCOUNT] Fetch Default Account success'),
  props<{ defaultAccount: DefaultAccount }>()
);

export const fetchDefaultAccountErrorAction = createAction(
  type('[TRANSFER_DEFAULT_ACCOUNT] Fetch Default Account error')
);

export const deleteDefaultAccountAction = createAction(
  type('[TRANSFER_DEFAULT_ACCOUNT] Delete Default Account')
);

export const deleteDefaultAccountSuccessAction = createAction(
  type('[TRANSFER_DEFAULT_ACCOUNT] Delete Default Account success'),
  props<{ props: ToastProperties }>()
);

export const deleteDefaultAccountErrorAction = createAction(
  type('[TRANSFER_DEFAULT_ACCOUNT] Delete Default Account error'),
  props<{ props: ToastProperties }>()
);
