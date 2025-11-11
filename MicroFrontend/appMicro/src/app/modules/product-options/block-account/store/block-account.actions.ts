import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';
import { GenericResponse } from '@commons/entities/response/response.interface';

export const fetchBlockAccountProductMediasAction = createAction(
  type('[Global/API] Fetch block account product medias')
);
export const fetchBlockAccountProductMediasSuccessAction = createAction(
  type('[Global/API] Fetch block account product medias success'),
  props<{ medias: ActivationProduct[] }>()
);
export const fetchBlockAccountProductMediasErrorAction = createAction(
  type('[Global/API] Fetch block account product medias error'),
  props<{ message: string }>()
);
export const sendBlockAccountAction = createAction(
  type('[Global/API] Send block account'),
  props<{ payload: { relativeId: string; lockId: string } }>()
);
export const sendBlockAccountSuccessAction = createAction(
  type('[Global/API] Send block account success'),
  props<{ props: any }>()
);
export const sendBlockAccountErrorAction = createAction(
  type('[Global/API] Send block account error'),
  props<{ props: any }>()
);
export const setBlockAccountSelectedProductAction = createAction(
  type('[BlockAccount] Set block account selected product'),
  props<{ product: ProductDetail }>()
);
export const setBlockAccountProductMediasAction = createAction(
  type('[BlockAccount] Set block account product medias'),
  props<{ productMedias: ActivationProduct[] }>()
);
export const setBlockAccountWorkingAction = createAction(
  type('[BlockAccount] Set block account working'),
  props<{ working: boolean }>()
);
export const setBlockAccountCompletedAction = createAction(
  type('[BlockAccount] Set block account completed'),
  props<{ working: boolean }>()
);
export const setBlockAccountErrorAction = createAction(
  type('[BlockAccount] Set block account error'),
  props<{ error: boolean }>()
);
export const setBlockAccountResponseAction = createAction(
  type('[BlockAccount] Set block account response'),
  props<{ response: GenericResponse }>()
);
export const setBlockAccountFormAction = createAction(
  type('[BlockAccount] Set block account form'),
  props<{ relativeId: string; lockId: string }>()
);
