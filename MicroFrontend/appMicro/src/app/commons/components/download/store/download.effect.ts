import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import {
  downloadAction,
  downloadErrorAction,
  downloadSuccessAction
} from '@commons/components/download/store/download.action';
import { AnalyticsService } from '@commons/services/analytics.service';

@Injectable()
export class DownloadEffect {
  constructor(private actions$: Actions, private analytics: AnalyticsService) {}

  downloadEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadAction),
      switchMap((action) =>
        defer(async () => {
          if (!Capacitor.isNativePlatform()) {
            return downloadSuccessAction();
          }
          const path = action.props.name;
          const data = action.props.data;
          const { uri } = await Filesystem.writeFile({
            path,
            data,
            directory: Directory.Cache
            // encoding: FilesystemEncoding.UTF8
          });

          await FileOpener.openFile({
            path: uri,
            mimeType: 'application/pdf'
          });
          return downloadSuccessAction();
        })
      ),
      catchError((error) => {
        this.analytics.sendError('Download file effect', error);
        return of(
          downloadErrorAction({
            message: error
          })
        );
      })
    )
  );
}
