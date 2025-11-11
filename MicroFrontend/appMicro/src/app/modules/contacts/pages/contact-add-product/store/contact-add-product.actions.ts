import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import { Contact } from '@modules/contacts/entities/contact.interface';
import { createAction, props } from '@ngrx/store';

export const contactAddProductAction = createAction(
  type('[Global/API] Add product to contact'),
  props<{ payload: Contact; onlyAdd: boolean }>()
);

export const contactAddProductSuccessAction = createAction(
  type('[Global/API] Add product to contact success'),
  props<{ props: AlertSheetProperties }>()
);

export const contactAddProductErrorAction = createAction(
  type('[Global/API] Add product to contact error'),
  props<{ props: AlertSheetProperties }>()
);

export const contactAddProductFinishedAction = createAction(
  type('[Global/API] Add product to contact finished')
);
