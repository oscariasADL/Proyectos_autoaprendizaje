import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import {
  DigitalDebitCard,
  DigitalDebitCardCreatePayload,
  DigitalDebitCardEditPayload
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { createAction, props } from '@ngrx/store';
import { Product } from '@commons/entities/product/product.interface';

export const fetchDigitalDebitCardsAction = createAction(
  type('[Global/API] Fetch digital debit cards')
);

export const fetchDigitalDebitCardsSuccessAction = createAction(
  type('[Global/API] Fetch digital debit cards success'),
  props<{ cards: DigitalDebitCard[] }>()
);

export const fetchDigitalDebitCardsErrorAction = createAction(
  type('[DigitalDebitCard] Fetch digital debit cards error'),
  props<{ message: string }>()
);

export const fetchDigitalDebitCardDetailAction = createAction(
  type('[DigitalDebitCard] Fetch digital debit cards detail'),
  props<{
    relativeParentId: string;
    alertSuccess: string;
    warningSuccess: string;
  }>()
);

export const fetchDigitalDebitCardDetailSuccessAction = createAction(
  type('[DigitalDebitCard] Fetch digital debit card detail success')
);

export const fetchDigitalDebitCardDetailErrorAction = createAction(
  type('[DigitalDebitCard] Fetch digital debit card detail error'),
  props<{ props: AlertSheetProperties }>()
);

export const showDigitalDebitCardUseAction = createAction(
  type('[DigitalDebitCard] Show digital debit card use')
);

export const showFrequentQuestionsAction = createAction(
  type('[DigitalDebitCard] Show frequent questions')
);

export const createDigitalDebitCardAction = createAction(
  type('[DigitalDebitCard] Create digital debit card'),
  props<{ payload: DigitalDebitCardCreatePayload }>()
);

export const createDigitalDebitCardSuccessAction = createAction(
  type('[DigitalDebitCard] Create digital debit card success'),
  props<{ response: GenericResponse }>()
);

export const createDigitalDebitCardErrorAction = createAction(
  type('[DigitalDebitCard] Create digital debit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const editDigitalDebitCardAction = createAction(
  type('[DigitalDebitCard] Edit digital debit card'),
  props<{ payload: DigitalDebitCardEditPayload }>()
);

export const editDigitalDebitCardSuccessAction = createAction(
  type('[DigitalDebitCard] Edit digital debit card success'),
  props<{ response: GenericResponse }>()
);

export const editDigitalDebitCardErrorAction = createAction(
  type('[DigitalDebitCard] Edit digital debit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const setDigitalDebitCardsViewedAction = createAction(
  type('[Global/UI] Set digital debit cards viewed'),
  props<{ cardsViewed: string }>()
);

export const cancelDigitalDebitCardAction = createAction(
  type('[DigitalDebitCard] Show Cancel card'),
  props<{ payload: DigitalDebitCardCreatePayload }>()
);

export const cancelDigitalDebitCardSuccessAction = createAction(
  type('[DigitalDebitCard] Cancel digital debit card success'),
  props<{ response: GenericResponse }>()
);

export const cancelDigitalDebitCardErrorAction = createAction(
  type('[DigitalDebitCard] Cancel digital debit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const reissueDigitalDebitCardAction = createAction(
  type('[DigitalDebitCard] Reissue digital debit card'),
  props<{ payload: DigitalDebitCardCreatePayload }>()
);

export const reissueDigitalDebitCardSuccessAction = createAction(
  type('[DigitalDebitCard] Reissue digital debit card success'),
  props<{ response: GenericResponse }>()
);

export const reissueDigitalDebitCardErrorAction = createAction(
  type('[DigitalDebitCard] Reissue digital debit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const setProductSelected = createAction(
  type('[DigitalDebitCard] Set Product Selected'),
  props<{ product: Product }>()
);

export const setActivateUrlBackTo = createAction(
  type('[DigitalDebitCard] set Activate Url Back To'),
  props<{ url: string }>()
);
