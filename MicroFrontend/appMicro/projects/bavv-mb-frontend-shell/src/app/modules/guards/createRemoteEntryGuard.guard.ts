import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MF_FALLBACK } from '@app/commons/constants/navigate.constants';
import { LinkKey } from '@app/commons/entities/parameters/links.entities';

export function createRemoteEntryGuard(
  remoteEntryUrl: string,
  label: string,
  retryUrl: string,
  externalUrl?: LinkKey
): CanMatchFn {
  return () =>
    new Promise<boolean>((resolve) => {
      const navCtrl = inject(NavController);

      const script = document.createElement('script');
      script.src = remoteEntryUrl;
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        document.head.removeChild(script);
        resolve(true);
      };

      script.onerror = (error) => {
        console.error('Error al cargar el remoteEntry.js');
        document.head.removeChild(script);

        navCtrl.navigateForward(MF_FALLBACK, {
          queryParams: {
            label,
            retryUrl,
            externalUrl,
            error
          }
        });

        resolve(false);
      };

      document.head.appendChild(script);
    });
}
