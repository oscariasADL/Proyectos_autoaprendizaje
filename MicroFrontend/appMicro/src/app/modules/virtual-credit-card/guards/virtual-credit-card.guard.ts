import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanDeactivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export const VirtualCreditCardGuardCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const facade = inject(VirtualCreditCardFacade);
  return facade.productSelectedDetail$.pipe(
    map((product) => {
      if (!isNullOrUndefined(product)) {
        facade.setProductSelected(product);
        facade.setActivateUrlBackTo(
          `/product-detail/${product.type}/${product.id}`
        );
        return true;
      }
      return false;
    })
  );
};

export const VirtualCreditCardGuardCanDeactivate: CanDeactivateFn<any> = (
  component,
  currentRoute,
  currentState,
  nextState
): boolean => {
  const facade = inject(VirtualCreditCardFacade);
  if (nextState.url !== '/virtual-credit-card/activate') {
    facade.setProductSelectedDetail(null);
    facade.setProductSelected(null);
  }
  return true;
};
