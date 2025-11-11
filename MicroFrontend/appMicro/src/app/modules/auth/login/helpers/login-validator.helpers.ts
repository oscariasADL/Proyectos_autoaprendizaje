import { inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { LogSeverity } from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { environment } from '@environment';
import { importSPKI, jwtVerify } from 'jose';
import { firstValueFrom } from 'rxjs';

export function loginPasswordValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.value;
  if (!isNullOrUndefined(value)) {
    const _value = value.toString().replace(/null/g, '');
    if (_value.length !== 4) {
      return { error: true };
    }
  }
  return null;
}
export async function validateJwt(
  token: string,
  storedPublickey: string,
  isFeatureEnabled: boolean
): Promise<boolean> {
  try {
    const publicKey = await importSPKI(storedPublickey, 'RS256');

    const { payload } = await jwtVerify(token, publicKey);
    return !!(storedPublickey && publicKey && payload);
  } catch (e) {
    const logService = inject(LogManagerService);
    logService.log({
      severity: LogSeverity.ERROR,
      fileName: 'login-validator.helpers.ts',
      functionName: 'validateJWT',
      customMessage: 'error trying to verify jwt with token '
    });
  }
}
