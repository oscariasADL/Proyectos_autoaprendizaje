import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AlertService } from '@commons/services/alert.service';
import { CUSTOMIZE_AVAL_TAG_ALERT_INFO } from '@modules/product-options/customize-aval-tag/constants/customize-aval-tag.constants';

export const CustomizeAvalTagCanActivateGuard: CanActivateFn = async () => {
  const alertService = inject(AlertService);
  const ok = await alertService.create(CUSTOMIZE_AVAL_TAG_ALERT_INFO);
  return !!ok;
};
