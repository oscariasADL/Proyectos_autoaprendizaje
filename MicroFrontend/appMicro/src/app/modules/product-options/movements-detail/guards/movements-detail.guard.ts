import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { PRODUCT_DETAIL } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import { MovementFacade } from '@modules/movement/movement.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MovementsDetailGuard implements CanActivate {
  constructor(private navCtrl: NavController, private facade: MovementFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.facade.movementsHistoryCompleted$.pipe(
      map((completed: boolean) => {
        if (!completed) {
          this.navCtrl.navigateBack(
            `${PRODUCT_DETAIL.toString()}/${route.params.type}/${
              route.params.id
            }`
          );
        }
        return completed;
      })
    );
  }
}
