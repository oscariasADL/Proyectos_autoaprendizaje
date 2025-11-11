import { Injectable } from '@angular/core';
import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
import { Util } from '@app/commons/utils/util';
import { LogMessageDetails } from './entities/log-manager-service.interface';

@Injectable({
  providedIn: 'root'
})
export class LogManagerService {
  public async log(logMessageDetails: LogMessageDetails): Promise<void> {
    const { severity, fileName, functionName, customMessage, userId, error } =
      logMessageDetails;

    if (!Util.isNative()) {
      return;
    }

    if (userId) {
      await FirebaseCrashlytics.setUserId({ userId });
    }

    const stacktrace = error?.stack
      ? [{ fileName, functionName }, error.stack]
      : [{ fileName, functionName }];

    await FirebaseCrashlytics.recordException({
      message: `[UserID]:${userId} [${severity}]: ${customMessage}`,
      stacktrace
    });
  }
}
