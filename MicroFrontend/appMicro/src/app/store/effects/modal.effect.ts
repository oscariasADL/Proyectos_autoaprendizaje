import { Injectable } from '@angular/core';
import { AlertService } from '@commons/services/alert.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as actions from '@store/actions/modal.action';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ModalEffect {
  constructor(private actions$: Actions, private alertService: AlertService) {}

  openModalEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.openModalAction),
        tap((action) => this.alertService.create(action.props))
      ),
    { dispatch: false }
  );

  closeModalEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.closeModalAction),
        tap((action) => this.alertService.close())
      ),
    { dispatch: false }
  );

  openModalObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...actions.ModalObserverActionsTypes),
      map(({ props }) => actions.openModalAction({ props }))
    )
  );
}
