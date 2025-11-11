import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import * as actions from '@commons/components/share/store/share.action';

@Injectable()
export class ShareEffect {
  constructor(private actions$: Actions) {}

  shareEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.shareAction),
      switchMap((action) =>
        defer(async () => {
          const { uri: url } = await Filesystem.writeFile({
            path: action.props.name,
            data: action.props.data,
            directory: Directory.Cache
          });

          await Share.share({
            title: action.props.name,
            url
          });

          return actions.shareSuccessAction();
        }).pipe(
          catchError((error) =>
            of(
              actions.shareErrorAction({
                message: error
              })
            )
          )
        )
      )
    )
  );
}
