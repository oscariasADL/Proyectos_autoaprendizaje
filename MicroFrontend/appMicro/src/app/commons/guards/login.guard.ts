import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { SecureKeys } from '@commons/constants/keys.constants';
import { HOME } from '@commons/constants/navigate.constants';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { NavController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private secureStorage: AdlSecureStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.secureStorage.getAll()).pipe(
      filter((db) => !isNullOrUndefined(db)),
      map((db) => {
        const hasToken = !isNullOrUndefined(getDBValue(db, SecureKeys.token));

        if (hasToken) {
          this.navCtrl.navigateRoot(HOME);
        }
        return true;
      })
    );
  }
}
