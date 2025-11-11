import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { HOME } from '@commons/constants/navigate.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { NavController } from '@ionic/angular';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import {
  CREDIT_MOVEMENTS_RESTRICTED_ERROR,
  DIRECTED_PAYMENT_RESTRICTED_ERROR
} from '@modules/product-options/credit-movements/pages/directed-payment/constants/directed-payment.constants';
import { Observable, of } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class ThereAreCreditMovementsGuard implements CanActivate {
  constructor(
    private alert: AlertService,
    private navCtrl: NavController,
    private facade: CreditMovementsFacade
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> {
    const product: ProductDetail = this.facade.productSelected$.currentValue();

    if (isNullOrUndefined(product)) {
      this.navCtrl.navigateBack(HOME);
      return of(false);
    }

    if (route?.data?.restricted && product?.minimumPayment > 0) {
      return this.alert
        .create(DIRECTED_PAYMENT_RESTRICTED_ERROR)
        .then(() => Promise.resolve(false));
    } else {
      this.facade.fetchCreditMovements(product.id.toString());

      return this.facade.creditMovementsWorking$.pipe(
        filter((working) => !working),
        withLatestFrom(
          this.facade.creditMovementsCompleted$,
          this.facade.creditMovements$
        ),
        map(([working, completed, movements]) => {
          if (!completed || movements?.length === 0) {
            this.alert
              .create(CREDIT_MOVEMENTS_RESTRICTED_ERROR)
              .then(() => Promise.resolve(false));
          }

          return completed && movements.length > 0;
        })
      );
    }
  }
}
