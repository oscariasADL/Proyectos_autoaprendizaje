import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { POCKETS } from '@commons/constants/navigate.constants';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { PocketCreateDescriptionProfitabilityComponent } from '@modules/pockets/pages/pocket-create-description-profitability/pocket-create-description-profitability.component';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { Product } from '@app/commons/entities/product/product.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { mapProductsByFilter } from '@app/modules/product/mappers/product-filter.mapper';

export const PocketGuardCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const facade = inject(PocketsFacade);
  const navCtrl = inject(NavController);
  return facade.completed$.pipe(
    tap((hasPockets: boolean) => {
      if (!hasPockets) {
        void navCtrl.navigateBack(POCKETS);
      }
    })
  );
};

export const DontHasSDA: CanActivateFn = (): boolean => {
  const facade = inject(PocketsFacade);
  const router = inject(NavController);
  const homeProducts = facade.balance$
    .pipe(
      map((balance) =>
        mapProductsByFilter(balance, {
          typeAccountProducts: [TypeAccount.SDA]
        })
      )
    )
    .currentValue();

  const hasSDA = homeProducts.some(
    (product: Product) => product.type === TypeAccount.SDA
  );

  if (!hasSDA) {
    router.navigateForward(['pockets/pocket-has-no-products']);
    return false;
  }
  return true;
};

export const PocketCreateWithReturnsGuardCanActivate: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const modalCtrl = inject(ModalController);
  const secureStorage = inject(AdlSecureStorageService);

  const key = 'pocketCreateDescriptionProfitability';
  const db = await secureStorage.getAll();
  const isHiddenPanel = !!getDBValue(db, key);

  if (isHiddenPanel) {
    return true;
  }

  const modal = await modalCtrl.create({
    id: 'pocket-create-description-profitability-modal',
    component: PocketCreateDescriptionProfitabilityComponent,
    componentProps: {
      buttonActionText: 'ACTIONS.CONTINUE'
    },
    showBackdrop: false,
    mode: 'md',
    cssClass: 'avv-custom-full-modal'
  });

  await modal.present();
  const { data } = await modal.onDidDismiss();
  await secureStorage.put(key, 'notShowAgain', true);
  return Promise.resolve(data);
};
