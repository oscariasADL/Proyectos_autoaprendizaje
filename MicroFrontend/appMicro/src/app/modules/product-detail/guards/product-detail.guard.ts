import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  CanDeactivateFn
} from '@angular/router';
import { parseISO, format, subMonths, subWeeks } from 'date-fns';
import { take, map } from 'rxjs/operators';
import { TypeAccount } from '@commons/entities/product/type-account';
import { DEFAULT_MOVEMENTS_FILTERS } from '@modules/movement/constants/movement.constants';
import { MovementFacade } from '@modules/movement/movement.facade';
import { ProductDetailFacade } from '@modules/product-detail/product-detail.facade';
import { PRODUCT_HAS_MOVEMENTS } from '@modules/product/constants/product.constants';
import { ModalController } from '@commons/controllers/modal.controller';
import { WALLET_CARD_LIST } from '@commons/constants/navigate.constants';
import { VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID } from '@modules/virtual-credit-card/constants/virtual-credit-card.constants';

export const ProductDetailGuardCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const productDetailFacade = inject(ProductDetailFacade);
  const movementFacade = inject(MovementFacade);
  productDetailFacade.fetchProductDetail(route.params.type, route.params.id);

  if (PRODUCT_HAS_MOVEMENTS.includes(route.params.type)) {
    productDetailFacade.date$
      .pipe(
        take(1),
        map((dateStr: string) => parseISO(dateStr))
      )
      .subscribe((date: Date) => {
        const startDate = [TypeAccount.DLA, TypeAccount.CH].includes(
          route.params.type
        )
          ? format(subMonths(date, 6), 'yyyy-MM-dd')
          : format(subWeeks(date, 1), 'yyyy-MM-dd');
        movementFacade.fetchMovementsDetail({
          id: route.params.id,
          params: {
            ...DEFAULT_MOVEMENTS_FILTERS,
            endDate: format(date, 'yyyy-MM-dd'),
            startDate
          }
        });
      });
  }
  return true;
};

export const ProductDetailGuardCanDeactivate: CanDeactivateFn<any> = async (
  component,
  currentRoute,
  currentState,
  nextState
): Promise<boolean> => {
  const modalCtrl = inject(ModalController);
  const [walletUrl] = WALLET_CARD_LIST;

  if (nextState.url.includes(walletUrl)) {
    const topModal = await modalCtrl.getTop();
    if (topModal && topModal.id === VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID)
      void modalCtrl.dismiss(null, null, VIRTUAL_CREDIT_CARD_DETAIL_MODAL_ID);
  }

  return true;
};
