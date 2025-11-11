import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { HOME } from '@commons/constants/navigate.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { NavController } from '@ionic/angular';
import { AuthStepType } from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { Observable } from 'rxjs';
import { SilentEnrollmentResponse } from '../entities/silent-enrollment.interface';
import { SilentEnrollmentFacade } from '../silent-enrollment.facade';

@Injectable()
export class SilentEnrollmentResolver implements Resolve<any> {
  constructor(
    private navCtrl: NavController,
    private facade: SilentEnrollmentFacade
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const data: SilentEnrollmentResponse =
      this.facade.silentEnrollmentData$.currentValue();
    if (isNullOrUndefined(data)) {
      this.navCtrl.navigateBack(HOME);
    }
    return {
      data,
      type: AuthStepType.silentEnrollment,
      title: 'AUTH.REGISTER.TITLE',
      method: (payload) => this.facade.runSilentEnrollment(payload)
    };
  }
}
