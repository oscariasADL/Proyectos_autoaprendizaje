import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { NavController } from '@ionic/angular';
import { ExtractsPeriod } from '@modules/documents/pages/extracts/entities/extracts.interface';
import { ExtractsService } from '@modules/documents/pages/extracts/services/extracts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { mapExtractsDownloadError } from '../mappers/extracts-response.mapper';
import * as actions from './extracts.actions';

@Injectable()
export class ExtractsEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: ExtractsService
  ) {}

  fetchPeriodsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPeriodsAction),
      switchMap((action) =>
        this.service.fetchPeriods(action.id).pipe(
          map((periods: ExtractsPeriod[]) =>
            actions.fetchPeriodsSuccessAction({ periods })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPeriodsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchExtractEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchExtractAction),
      switchMap((action) =>
        this.service.fetchExtract(action.payload).pipe(
          switchMap((response: HttpResponse<string>) =>
            defer(async () => {
              const fileName = response.headers
                .get('content-disposition')
                .split('=')
                .slice(1)[0];

              const { uri } = await Filesystem.writeFile({
                path: fileName,
                data: response.body,
                directory: Directory.Cache
                // encoding: FilesystemEncoding.UTF8
              });
              await FileOpener.openFile({
                path: uri,
                mimeType: 'application/pdf'
              });
              return actions.fetchExtractSuccessAction();
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchExtractErrorAction({
                message:
                  error instanceof HttpErrorResponse
                    ? error.message.toString()
                    : error,
                props: mapExtractsDownloadError(error)
              })
            )
          )
        )
      )
    )
  );
}
