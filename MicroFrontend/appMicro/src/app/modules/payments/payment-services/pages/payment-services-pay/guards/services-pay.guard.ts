import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { SERVICES } from '@commons/constants/navigate.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { NavController } from '@ionic/angular';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ServicesPayGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private facade: PaymentServicesFacade
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.facade.billSelected$.pipe(
      map((bill: PaymentBill) => {
        if (isNullOrUndefined(bill)) {
          this.navCtrl.navigateBack(SERVICES);
        }
        return !isNullOrUndefined(bill);
      })
    );
  }
}
