import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { POCKETS } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PocketDetailWithReturnsFacade } from '../../pocket-detail-with-returns/pocket-detail-with-returns.facade';

@Injectable()
export class PocketWithReturnsGuard implements CanActivate {
  constructor(
    private facade: PocketDetailWithReturnsFacade,
    private navCtrl: NavController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.facade.completed$.pipe(
      tap((hasPockets: boolean) => {
        if (!hasPockets) {
          this.navCtrl.navigateBack(POCKETS);
        }
      })
    );
  }
}
