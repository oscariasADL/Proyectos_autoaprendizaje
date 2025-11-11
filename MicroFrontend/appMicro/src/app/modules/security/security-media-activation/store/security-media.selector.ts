import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { TypeAccount } from '@commons/entities/product/type-account';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ActivationProduct,
  ActivationStatusDescription
} from '../entities/security-media.interface';
import { featureName, SecurityState } from './security-media.state';

const securityState = createFeatureSelector<SecurityState>(featureName);

export const productList = createSelector(
  securityState,
  (state: SecurityState) => state?.products
);

export const productsToActivate = createSelector(
  securityState,
  (state: SecurityState) => state.productsToActivate
);

export const productsOtherProducts = createSelector(
  securityState,
  (state: SecurityState) => state.productsOtherProducts
);

export const workingSelector = createSelector(
  securityState,
  (state: SecurityState) => state.working
);

export const currentStep = createSelector(
  securityState,
  (state: SecurityState) => state.step
);

export const securityMediaMessage = createSelector(
  securityState,
  (state: SecurityState) => state.message
);

export const securityMediaType = createSelector(
  securityState,
  (state: SecurityState) => state.mediaType
);

export const suspiciousTransactionWorkingSelector = createSelector(
  securityState,
  (state: SecurityState) => state.suspiciousTransaction.working
);

export const suspiciousTransactionDataSelector = createSelector(
  securityState,
  (state: SecurityState) => state.suspiciousTransaction.data
);

function _findProductById(
  data: ActivationProduct[],
  id: string
): ActivationProduct {
  if (isNullOrUndefined(data)) {
    return null;
  }
  return data
    .filter((item) => !!item)
    .find((act) => act.id.toString() === id.toString());
}

export function findProductToActivate(
  data: ActivationProduct[]
): ActivationProduct[] {
  if (isNullOrUndefined(data)) {
    return [];
  }
  return data
    .filter((item) => !!item)
    .filter(
      (act) =>
        act.status.toLowerCase() ===
        ActivationStatusDescription.TO_ACTIVATE.toLowerCase()
    );
}

export function findProductsBlocked(
  data: ActivationProduct[]
): ActivationProduct[] {
  if (isNullOrUndefined(data)) {
    return [];
  }
  return data
    .filter((item) => !!item)
    .filter(
      (act) =>
        act.status.toLowerCase() ===
          ActivationStatusDescription.BLOCKED.toLowerCase() &&
        act.parentType === TypeAccount.SDA
    );
}

export function findOtherProducts(
  data: ActivationProduct[]
): ActivationProduct[] {
  if (isNullOrUndefined(data)) {
    return [];
  }
  return data
    .filter((item) => !!item)
    .filter(
      (act) =>
        !(
          act.status.toLowerCase() ===
          ActivationStatusDescription.TO_ACTIVATE.toLowerCase()
        )
    )
    .sort(
      (a, b) =>
        Object.values(ActivationStatusDescription).indexOf(
          a.status as ActivationStatusDescription
        ) -
        Object.values(ActivationStatusDescription).indexOf(
          b.status as ActivationStatusDescription
        )
    );
}

export const findProductById = () =>
  createSelector(productList, _findProductById);
