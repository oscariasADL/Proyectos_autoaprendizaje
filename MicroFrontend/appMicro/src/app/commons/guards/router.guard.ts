import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot
} from '@angular/router';
import { AppFacade } from '@app/app.facade';
import {
  ALERT_COMPLEMENTARY_SERVICE_ERROR,
  ALERT_COMPLEMENTARY_SERVICE_FAILURE_ERROR,
  ALERT_URL_OFF_ERROR
} from '@commons/constants/permission.constants';
import { urlWithCorrelation } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivateChild {
  constructor(private alertService: AlertService, private facade: AppFacade) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const data = this.facade.featureToggleData$.currentValue();

    if (data?.urls && urlWithCorrelation(state.url, data.urls)) {
      const complementaryServicesError =
        this.facade.complementaryServicesError$.currentValue();
      const alertType = complementaryServicesError
        ? ALERT_COMPLEMENTARY_SERVICE_FAILURE_ERROR
        : ALERT_COMPLEMENTARY_SERVICE_ERROR;

      this.alertService.create(alertType);
      return false;
    }

    if (data?.urlsOff && urlWithCorrelation(state.url, data.urlsOff)) {
      this.alertService.create(ALERT_URL_OFF_ERROR);
      return false;
    }

    return true;
  }
}
