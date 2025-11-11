import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaActivationType } from './entities/security-media.interface';
import { SecurityMediaActivationFacade } from './security-media-activation.facade';

@Component({
  selector: 'app-security-media-activation',
  templateUrl: './security-media-activation.page.html',
  styleUrls: ['./security-media-activation.page.sass']
})
export class SecurityMediaActivationPage {
  constructor(private facade: SecurityMediaActivationFacade) {}

  get title$(): Observable<string> {
    return this.securityMediaType$.pipe(
      map((securityMediaType) => {
        switch (securityMediaType) {
          case MediaActivationType.BlockTemporary:
            return 'Bloquear temporalmente';
          case MediaActivationType.BlockCard:
            return 'Bloqueo perdida o robo';
          case MediaActivationType.ConfigurePassword:
            return 'Configurar clave';
          case MediaActivationType.UnlockTemporary:
            return 'Bloqueo temporal';
          case MediaActivationType.UnlockPreventive:
            return 'Bloqueo preventivo';
          case MediaActivationType.Unblock:
            return 'Desbloquear tarjeta';
          default:
            return 'Configurar tarjetas';
        }
      })
    );
  }

  get securityMediaType$(): Observable<MediaActivationType> {
    return this.facade.securityMediaType$;
  }
}
