import { Injectable } from '@angular/core';
import { AlertProperties } from '@commons/entities/alert/alert.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  alertAction,
  AlertObserverActionsTypes
} from '../actions/alert.action';

@Injectable()
export class AlertEffect {
  constructor(
    private actions$: Actions,
    public alertController: AlertController
  ) {}

  alertEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(alertAction),
        tap((action) => this.alertWithOptions(action.payload))
      ),
    { dispatch: false }
  );

  alertObserverEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(...AlertObserverActionsTypes),
      map((action) => alertAction(action))
    )
  );

  public async alertWithOptions(properties: AlertProperties): Promise<void> {
    const alertActive = await this.alertController.getTop();
    if (isNullOrUndefined(alertActive)) {
      const alert = await this.alertController.create(properties);
      alert.present();
    }
  }
}
