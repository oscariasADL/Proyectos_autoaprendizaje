import { from, Observable, of, timeout } from 'rxjs';
import { PluginListenerHandle } from '@capacitor/core';
import {
  PushNotifications,
  PermissionStatus
} from '@capacitor/push-notifications';
import { switchMap } from 'rxjs/operators';

export function checkPushNotificationsPermissions$(): Observable<PermissionStatus> {
  return from(PushNotifications.checkPermissions()).pipe(
    switchMap((status) => {
      if (status.receive === 'prompt') {
        return from(PushNotifications.requestPermissions());
      }
      return of(status);
    })
  );
}

export function registerPushNotifications$(): Observable<void> {
  return from(PushNotifications.register());
}

export function generateFirebaseDeviceToken$(
  tokenRequestTimeout: number
): Observable<string> {
  return new Observable<string>((observer) => {
    let listenerOk: PluginListenerHandle | null = null;
    let listenerErr: PluginListenerHandle | null = null;

    PushNotifications.addListener('registration', (token) => {
      observer.next(token.value);
      observer.complete();
    }).then((handle) => {
      listenerOk = handle;
    });

    PushNotifications.addListener('registrationError', (error) => {
      observer.error(error);
    }).then((handle) => {
      listenerErr = handle;
    });

    return () => {
      if (listenerOk) void listenerOk.remove();
      if (listenerErr) void listenerErr.remove();
    };
  }).pipe(timeout(tokenRequestTimeout));
}
