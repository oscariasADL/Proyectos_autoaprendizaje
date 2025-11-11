import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoadingService } from '@commons/services/loading.service';
import {
  disableLoadingAction,
  DisableLoadingObserverActionsTypes,
  enableLoadingAction,
  EnableLoadingObserverActionsTypes
} from '../actions/loading.action';

@Injectable()
export class LoadingEffect {
  constructor(private actions$: Actions, private service: LoadingService) {}

  enableLoadingEffect: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(enableLoadingAction),
        tap((action) => this.service.enableLoading())
      ),
    { dispatch: false }
  );

  disableLoadingEffect: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(disableLoadingAction),
        tap((action) => this.service.disableLoading())
      ),
    { dispatch: false }
  );

  enableLoadingObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...EnableLoadingObserverActionsTypes),
      map(() => enableLoadingAction({ payload: {} }))
    )
  );

  disableLoadingObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...DisableLoadingObserverActionsTypes),
      map(() => disableLoadingAction())
    )
  );
}
