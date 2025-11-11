import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AlertService } from '@commons/services/alert.service';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { TRANSFERS_REMITTANCES_INFO_ALERT } from '../constants/alerts';

export const RemittancesCanActivateGuard: CanActivateFn = async () => {
  const alertService = inject(AlertService);
  const secureStorage = inject(AdlSecureStorageService);

  const key = SecureKeys.hiddenTransfersRemittancesInfo;
  const db = await secureStorage.getAll();
  const isHiddenPanel = !!getDBValue(db, key);
  if (isHiddenPanel) {
    return true;
  }
  const ok = await alertService.create(TRANSFERS_REMITTANCES_INFO_ALERT);
  if (ok) {
    await secureStorage.put(key, 'notShowAgain', ok.notShowAgain);
  }
  return !!ok;
};
