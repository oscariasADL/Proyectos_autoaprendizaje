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
import { RegisterFacade } from '@modules/auth/register/register.facade';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterResolver implements Resolve<any> {
  constructor(private navCtrl: NavController, private facade: RegisterFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const data = this.facade.registerData$.currentValue();
    if (isNullOrUndefined(data)) {
      this.navCtrl.navigateBack(HOME);
    }
    return {
      data,
      title: 'AUTH.REGISTER.TITLE',
      type: AuthStepType.register,
      method: (payload) => this.facade.runRegister(payload)
    };
  }
}
