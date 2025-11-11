import { AlertProperties } from '@commons/entities/alert/alert.entities';
import { type } from '@commons/utils/util';
import { Balance } from '@commons/entities/product/balance.interface';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import { createAction, props } from '@ngrx/store';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';
import { SPITransactionEvent } from '@app/modules/home/entities/spi-channel.entities';

export const fetchProductsAction = createAction(
  type('[Global/API] Fetch products')
);

export const fetchProductsWithoutReloadAction = createAction(
  type('[Global/API] Fetch products without reloading')
);

export const fetchProductsSuccessAction = createAction(
  type('[Global/API] Fetch products success'),
  props<{ balance: Balance[] }>()
);

export const fetchProductsWithoutReloadSuccessAction = createAction(
  type('[Global/API] Fetch products without reloading success'),
  props<{ balance: Balance[] }>()
);

export const fetchProductsErrorAction = createAction(
  type('[Global/API] Fetch products error'),
  props<{ message: AlertProperties }>()
);

export const fetchProductsFirstCallToggleAction = createAction(
  type('[Global/API] fetch products first call toggle')
);

export const fetchProductsCountRetryAction = createAction(
  type('[Global/API] Fetch products count retry')
);

export const fetchProductsNicknamesAction = createAction(
  type('[Global/API] Fetch products nicknames')
);

export const fetchProductsNicknamesSuccessAction = createAction(
  type('[Global/API] Fetch products nicknames success'),
  props<{ nicknames: ProductNickname[] }>()
);

export const fetchProductsNicknamesErrorAction = createAction(
  type('[Global/API] Fetch products nicknames error')
);

export const fetchProductSpiUserKeysAction = createAction(
  type('[Product] Fetch product spi user keys')
);

export const fetchProductSpiUserKeysSuccessAction = createAction(
  type('[Product] Fetch product spi user keys success'),
  props<{ spiUserKeys: ProductSpiUserKey[] }>()
);

export const userWithConsentAcceptedAction = createAction(
  type('[Product] User with consent accepted')
);

export const fetchProductSpiUserKeysErrorAction = createAction(
  type('[Product] Fetch product spi user keys error')
);

export const setHiddenBalanceAction = createAction(
  type('[Global/API] Set hidden balances'),
  props<{ hiddenBalance: boolean }>()
);

export const setHiddenBalanceSuccessAction = createAction(
  type('[Global/API] Set hidden balances success'),
  props<{ hiddenBalance: boolean }>()
);

export const getHiddenBalanceFromSecureStorageAction = createAction(
  type('[Global/API] Get hidden balances from secure storage')
);

export const resetFirstCallTCAction = createAction(
  type('[Global/API] Reset first call TC')
);

export const fetchSPIAuthorizationAction = createAction(
  type('[Global/API] fetch SPI authorization')
);

export const fetchSPIAuthorizationSuccessAction = createAction(
  type('[Global/API] fetch SPI authorization success'),
  props<{ status: boolean }>()
);

export const fetchSPIAuthorizationErrorAction = createAction(
  type('[Global/API] fetch SPI authorization error')
);

export const acceptSpiConsentAction = createAction(
  type('[Global/API] accept SPI consent')
);

export const acceptSpiConsentSuccessAction = createAction(
  type('[Global/API] accept SPI consent success')
);

export const acceptSpiConsentErrorAction = createAction(
  type('[Global/API] accept SPI consent error')
);
export const TxEvalTriggerAction = createAction(
  type('[Global/API] SPI Tx Trigger'),
  props<{
    payload: SPITransactionEvent;
  }>()
);
export const TxEvalSuccessAction = createAction(
  type('[Global/API] SPI Tx success')
);
export const TxEvalErrorAction = createAction(type('[Global/API] SPI Tx fail'));
