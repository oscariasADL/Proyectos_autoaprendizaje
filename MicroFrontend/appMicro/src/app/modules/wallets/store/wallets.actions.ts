import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import {
  CardDetail,
  DigitalCardStructureExt
} from '@modules/wallets/entities/wallets.interface';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const fetchCardListAction = createAction(
  type('[WALLETS] Fetch card list')
);

export const fetchCardListSuccessAction = createAction(
  type('[WALLETS] Fetch card list success'),
  props<{ cardList: CardDetail[] }>()
);

export const fetchCardListErrorAction = createAction(
  type('[WALLETS] Fetch card list error'),
  props<{ error: string }>()
);

export const cardEnrollmentProcessAction = createAction(
  type('[WALLETS] Card enrollment process')
);

export const cardEnrollmentProcessSuccessAction = createAction(
  type('[WALLETS] Card enrollment process success')
);

export const enrollCardRequestedAction = createAction(
  type('[WALLETS] Enroll card requested'),
  props<{ card: CardDetail }>()
);

export const enrollCardFinishedAction = createAction(
  type('[WALLETS] Enroll card finished'),
  props<{ cardId: string }>()
);

export const setWalletIdAction = createAction(
  type('[WALLETS] Set wallet id'),
  props<{ walletId: string }>()
);

export const prepareCardsAction = createAction(type('[WALLETS] Prepare cards'));

export const prepareCardsSuccessAction = createAction(
  type('[WALLETS] Prepare cards success'),
  props<{ walletCardList: DigitalCardStructureExt[] }>()
);

export const prepareCardsErrorAction = createAction(
  type('[WALLETS] Prepare cards error')
);

export const setCustomCardDisplayAction = createAction(
  type('[WALLETS] Set Custom Card Display'),
  props<{ cardId: string }>()
);

export const validateAndPushCardAction = createAction(
  type('[WALLETS] Validate and push card'),
  props<{ digitalCardId: string }>()
);

export const validateAndPushCardSuccessAction = createAction(
  type('[WALLETS] Validate and push card success'),
  props<{ props: ToastProperties }>()
);

export const validateAndPushCardErrorAction = createAction(
  type('[WALLETS] Validate and push card error'),
  props<{ props: AlertSheetProperties }>()
);
