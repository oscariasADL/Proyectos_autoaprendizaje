import { Injectable } from '@angular/core';
import { ToastService } from '@commons/services/toast.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as actions from '@store/actions/toast.action';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ToastEffect {
  constructor(private actions$: Actions, private toastService: ToastService) {}

  openToastEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.toastAction),
        tap((action) => this.toastService.create(action.props))
      ),
    { dispatch: false }
  );

  closeToastEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.closeToastsAction),
        tap((action) => this.toastService.clear())
      ),
    { dispatch: false }
  );

  openModalObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...actions.ToastObserverActionsTypes),
      map(({ props }) => actions.toastAction({ props }))
    )
  );
}
