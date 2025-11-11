import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import {
  SSLCertificateChecker,
  SSLCertificateCheckerResult
} from '@ankitp5/capacitor-ssl-pinning';
import { CertificateConfig } from './types/ssl-pinning.types';
import { ALLOWED_CERTIFICATE_CONFIG } from './constants/ssl-pinning.constants';

@Injectable()
export class SSLPinningInterceptor implements HttpInterceptor {
  constructor(
    @Inject(ALLOWED_CERTIFICATE_CONFIG)
    private _allowedCertificateConfig: CertificateConfig[]
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (Capacitor.getPlatform() === 'web') {
      return next.handle(request);
    }

    const host = this._allowedCertificateConfig.find((host) =>
      request.url.startsWith(host.hostname)
    );
    if (!host) {
      return next.handle(request);
    }

    const checks: Promise<SSLCertificateCheckerResult>[] =
      host.fingerprints.map((fingerprint) =>
        SSLCertificateChecker.checkCertificate({
          url: host.hostname,
          fingerprint: this._formatFingerprint(fingerprint)
        })
      );

    return from(Promise.all(checks)).pipe(
      switchMap((checkerResults: SSLCertificateCheckerResult[]) => {
        if (
          checkerResults.some(
            (result: SSLCertificateCheckerResult) => result.fingerprintMatched
          )
        ) {
          return next.handle(
            request.clone({
              setHeaders: {
                'Content-Language':
                  '440f3041c89adee0f2ad780704bcc0efae1bdb30f8d77dc455a2f6c823b87ca0'
              }
            })
          );
        }

        return throwError(() => new Error('Fingerprint not matched ;('));
      })
    );
  }

  private _formatFingerprint(fingerprint: string): string {
    return fingerprint
      .replace(/:/g, '')
      .replace(/(.{2})(?=.)/g, '$1:')
      .toLowerCase();
  }
}
