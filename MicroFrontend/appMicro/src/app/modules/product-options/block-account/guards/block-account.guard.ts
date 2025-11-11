import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailFacade } from '@modules/product-detail/product-detail.facade';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BlockAccountGuard implements CanActivate, CanActivateChild {
  constructor(
    private productDetailFacade: ProductDetailFacade,
    private navCtrl: NavController
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const canActivate = !isNullOrUndefinedOrEmpty(
      this.productDetailFacade.productDetail$.currentValue()
    );
    if (!canActivate) {
      this.navCtrl.navigateForward('/');
    }

    return canActivate;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const canActivate = !isNullOrUndefinedOrEmpty(
      this.productDetailFacade.productDetail$.currentValue()
    );
    if (!canActivate) {
      this.navCtrl.navigateForward('/');
    }

    return canActivate;
  }
}
