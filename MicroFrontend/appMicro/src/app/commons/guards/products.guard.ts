import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { NavController } from '@ionic/angular';
import { mapProductsByFilter } from '@modules/product/mappers/product-filter.mapper';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { HOME } from '../constants/navigate.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsGuard implements CanActivate {
  constructor(private navCtrl: NavController, private facade: AppFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.facade.hasProducts$.pipe(
      withLatestFrom(this.facade.balance$),
      map(
        ([hasProducts, balance]) =>
          hasProducts && mapProductsByFilter(balance, route.data).length > 0
      ),
      tap((hasProducts: boolean) => {
        if (!hasProducts) {
          this.navCtrl.navigateRoot(HOME);
        }
      })
    );
  }
}
