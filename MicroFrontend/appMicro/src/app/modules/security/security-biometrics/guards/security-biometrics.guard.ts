import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { SECURITY_HOME } from '@commons/constants/navigate.constants';
import { BiometricService } from '@commons/services/biometric.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SecurityBiometricsGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private biometric: BiometricService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.biometric.hasBiometric$.pipe(
      map((hasBiometric: boolean) => {
        if (!hasBiometric) {
          this.navCtrl.navigateBack(SECURITY_HOME);
        }
        return hasBiometric;
      })
    );
  }
}
