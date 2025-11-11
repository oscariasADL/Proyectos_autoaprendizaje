import { createAction, props } from '@ngrx/store';
import { type } from '@app/commons/utils/util';
import {
  VirtualCreditCard,
  VirtualCreditCardCreatePayload,
  VirtualCreditCardDetailPayload,
  VirtualCreditCardListPayload,
  VirtualCreditCardOperationPayload
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';

export const fetchVirtualCreditCardsAction = createAction(
  type('[VirtualCreditCard] Fetch virtual credit cards'),
  props<{ payload: VirtualCreditCardListPayload }>()
);

export const fetchVirtualCreditCardsSuccessAction = createAction(
  type('[VirtualCreditCard] Fetch virtual credit cards success'),
  props<{ cards: VirtualCreditCard[]; maxCardsLimit: number }>()
);

export const fetchVirtualCreditCardsErrorAction = createAction(
  type('[VirtualCreditCard] Fetch virtual credit cards error'),
  props<{ message: string }>()
);

export const fetchVirtualCreditCardDetailAction = createAction(
  type('[VirtualCreditCard] Fetch virtual credit cards detail'),
  props<{ payload: VirtualCreditCardDetailPayload; alertSuccess: string }>()
);

export const fetchVirtualCreditCardDetailSuccessAction = createAction(
  type('[VirtualCreditCard] Fetch virtual credit card detail success')
);

export const fetchVirtualCreditCardDetailErrorAction = createAction(
  type('[VirtualCreditCard] Fetch virtual credit card detail error'),
  props<{ props: AlertSheetProperties }>()
);

export const showVirtualCreditCardUseAction = createAction(
  type('[VirtualCreditCard] Show virtual credit card use')
);

export const showFrequentQuestionsAction = createAction(
  type('[VirtualCreditCard] Show frequent questions')
);

export const createVirtualCreditCardAction = createAction(
  type('[VirtualCreditCard] Create virtual credit card'),
  props<{ payload: VirtualCreditCardCreatePayload }>()
);

export const createVirtualCreditCardSuccessAction = createAction(
  type('[VirtualCreditCard] Create virtual credit card success'),
  props<{ response: GenericResponse }>()
);

export const createVirtualCreditCardErrorAction = createAction(
  type('[VirtualCreditCard] Create virtual credit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const editVirtualCreditCardAction = createAction(
  type('[VirtualCreditCard] Edit virtual credit card'),
  props<{ payload: VirtualCreditCardOperationPayload }>()
);

export const editVirtualCreditCardSuccessAction = createAction(
  type('[VirtualCreditCard] Edit virtual credit card success'),
  props<{ response: GenericResponse }>()
);

export const editVirtualCreditCardErrorAction = createAction(
  type('[VirtualCreditCard] Edit virtual credit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const setVirtualCreditCardsViewedAction = createAction(
  type('[Global/UI] Set virtual credit cards viewed'),
  props<{ cardsViewed: string }>()
);

export const cancelVirtualCreditCardAction = createAction(
  type('[VirtualCreditCard] Show Cancel card'),
  props<{ payload: VirtualCreditCardOperationPayload }>()
);

export const cancelVirtualCreditCardSuccessAction = createAction(
  type('[VirtualCreditCard] Cancel virtual credit card success'),
  props<{ props: AlertSheetProperties }>()
);

export const cancelVirtualCreditCardErrorAction = createAction(
  type('[VirtualCreditCard] Cancel virtual credit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const reissueVirtualCreditCardAction = createAction(
  type('[VirtualCreditCard] Reissue virtual credit card'),
  props<{ payload: VirtualCreditCardOperationPayload }>()
);

export const reissueVirtualCreditCardSuccessAction = createAction(
  type('[VirtualCreditCard] Reissue virtual credit card success'),
  props<{
    response: GenericResponse;
    numberProductTCV: string;
  }>()
);

export const reissueVirtualCreditCardErrorAction = createAction(
  type('[VirtualCreditCard] Reissue virtual credit card error'),
  props<{ props: AlertSheetProperties }>()
);

export const setProductSelected = createAction(
  type('[VirtualCreditCard] Set Product Selected'),
  props<{ product: ProductDetail }>()
);

export const setActivateUrlBackTo = createAction(
  type('[VirtualCreditCard] set Activate Url Back To'),
  props<{ url: string }>()
);

export const setCreditLimitAction = createAction(
  type('[VirtualCreditCard] Set Credit Limit'),
  props<{ creditLimit: number }>()
);

export const resetVirtualCreditCardsAction = createAction(
  type('[VirtualCreditCard] Reset Virtual Credit Cards')
);
