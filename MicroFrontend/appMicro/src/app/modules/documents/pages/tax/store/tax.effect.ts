import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { mapTaxCertificateDownloadError } from '../mappers/tax-response.mapper';
import * as actions from './tax.actions';
import { TaxService } from '../services/tax.service';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { LogSeverity } from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';

@Injectable()
export class TaxEffect {
  constructor(
    private actions$: Actions,
    private service: TaxService,
    private logManagerService: LogManagerService
  ) {}

  fetchTaxCertificateEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTaxCertificateAction),
      switchMap(({ year }) =>
        this.service.fetchTaxCertificate(year).pipe(
          switchMap((response: HttpResponse<string>) =>
            defer(async () => {
              try {
                const body: { result: string } =
                  typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;

                const fileName = response.headers
                  .get('content-disposition')
                  ?.split('=')[1];

                if (!fileName) {
                  this.logManagerService.log({
                    severity: LogSeverity.ERROR,
                    fileName: 'tax.effects.ts',
                    functionName: 'tax effect - name',
                    customMessage:
                      'No se pudo obtener el nombre del archivo desde las cabeceras'
                  });
                  throw new Error(
                    'No se pudo obtener el nombre del archivo desde las cabeceras'
                  );
                }
                this.logManagerService.log({
                  severity: LogSeverity.INFO,
                  fileName: 'tax.effects.ts',
                  functionName: 'tax effect - basic info',
                  customMessage: `response body basic info ${body.result.slice(
                    0,
                    50
                  )}`
                });
                const { uri } = await Filesystem.writeFile({
                  path: fileName,
                  data: body.result,
                  directory: Directory.Cache
                });

                await FileOpener.openFile({
                  path: uri,
                  mimeType: 'application/pdf'
                });

                return actions.fetchTaxCertificateSuccessAction();
              } catch (error) {
                this.logManagerService.log({
                  severity: LogSeverity.ERROR,
                  fileName: 'tax.effects.ts',
                  functionName: 'fetch tax certificate - create/open',
                  customMessage:
                    error instanceof Error
                      ? error.message
                      : String(error) ?? 'Error creando o abriendo el PDF'
                });

                return actions.fetchTaxCertificateErrorAction({
                  message:
                    error instanceof Error ? error.message : String(error),
                  props: mapTaxCertificateDownloadError(error)
                });
              }
            })
          ),
          catchError((error: HttpErrorResponse) => {
            const errorMessage =
              `${error.message} ${error.error.description}` ??
              'Error al crear pdf';
            this.logManagerService.log({
              severity: LogSeverity.ERROR,
              fileName: 'tax.effects.ts',
              functionName: 'fetch tax certificate failed',
              customMessage: errorMessage
            });

            return of(
              actions.fetchTaxCertificateErrorAction({
                message: error.message.toString(),
                props: mapTaxCertificateDownloadError(error)
              })
            );
          })
        )
      )
    )
  );
}
