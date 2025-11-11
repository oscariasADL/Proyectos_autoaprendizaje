import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { getDBValue } from '@commons/helpers/text.helpers';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { datadogRum } from '@datadog/browser-rum';
import { enabledDatadog } from '@commons/constants/events.constants';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;
    let err = false;
    let message: string;
    let status: number;

    const ccs = [
      '1019100203',
      '7708170',
      '1019100204',
      '1019100205',
      '111',
      '222',
      '333',
      '444'
    ];

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          ok = event instanceof HttpResponse ? 'succeeded' : '';
          err = false;
          status = 200;
        },
        error: async (error: HttpErrorResponse) => {
          if (enabledDatadog) {
            datadogRum.addError(
              error,
              { url: request.urlWithParams },
              'custom'
            );
          }
          err = true;
          const basicData = JSON.parse(await this.getUserBasicData());
          const body = request.body ? `${JSON.stringify(request.body)}` : '';
          status = error.status ? error.status : 0;
          message = `${request.method}<br>${request.urlWithParams}<br>${body}`;

          if (
            basicData?.documentNumber &&
            ccs.includes(basicData.documentNumber) &&
            error.error instanceof ErrorEvent
          ) {
            // this.showAlert('FrontEnd', error.status ?? 0, message);
          } else if (
            basicData?.documentNumber &&
            ccs.includes(basicData.documentNumber) &&
            !(error.error instanceof ErrorEvent)
          ) {
            // this.showAlert('BackEnd', error.status ?? 0, message);
          }
        }
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
      })
    );
  }

  private async getUserBasicData() {
    const db = await this.secureStorage.getAll();
    return getDBValue(db, SecureKeys.basicData);
  }

  private showAlert(title, status, message) {
    this.alertService.create({
      ...ERROR_HANDLER_ALERT,
      title: `ERROR ${title} ${status}`,
      description: message
    });
  }
}

export const ERROR_HANDLER_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.error,
  id: 'error-handler',
  title: 'Error',
  icon: null,
  description: 'Error Handler'
};
