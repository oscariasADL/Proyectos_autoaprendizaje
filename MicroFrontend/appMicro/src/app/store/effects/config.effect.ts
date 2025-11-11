import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigResponse } from '@commons/entities/config/config.entities';
import { ConfigService } from '@commons/services/config.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as actions from '../actions/config.action';

@Injectable()
export class ConfigEffect {
  constructor(private actions$: Actions, private service: ConfigService) {}

  fetchConfigEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchConfigAction),
      switchMap((_) =>
        this.service.fetchConfig().pipe(
          map((config: ConfigResponse) =>
            actions.fetchConfigSuccessAction({ config })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchConfigErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
