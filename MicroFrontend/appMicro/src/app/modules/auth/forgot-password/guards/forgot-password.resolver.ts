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
import { ForgotPasswordResponse } from '@modules/auth/forgot-password/entities/forgot-password.interface';
import { ForgotPasswordFacade } from '@modules/auth/forgot-password/forgot-password.facade';
import { Observable } from 'rxjs';

@Injectable()
export class ForgotPasswordResolver implements Resolve<any> {
  constructor(
    private navCtrl: NavController,
    private facade: ForgotPasswordFacade
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const data: ForgotPasswordResponse =
      this.facade.forgotPasswordData$.currentValue();
    if (isNullOrUndefined(data)) {
      this.navCtrl.navigateBack(HOME);
    }
    return {
      data,
      type: AuthStepType.forgotPassword,
      title: 'AUTH.FORGOT_PASSWORD.TITLE',
      method: (payload) => this.facade.runForgotPassword(payload)
    };
  }
}
