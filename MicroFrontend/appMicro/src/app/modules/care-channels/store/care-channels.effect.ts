import { Injectable } from '@angular/core';
import { isValidCellPhone, isValidEmail } from '@commons/utils/util';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Adviser } from '../entities/adviser.interface';
import { CareChannelsService } from '../services/care-channels.service';
import * as actions from './care-channels.action';

@Injectable()
export class CarechannelsEffect {
  constructor(
    private actions$: Actions,
    private service: CareChannelsService
  ) {}

  public fetchAdvisorEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchAdviserAction),
      switchMap(() =>
        this.service.fetchAdvisor().pipe(
          map((adviser: Adviser) => {
            const contactPhone = isValidCellPhone(
              adviser.contactPhone.toString()
            );
            const contactEmail = isValidEmail(adviser.contactEmail.toString());
            return actions.fetchAdviserSuccessAction({
              adviser:
                !!contactPhone || !!contactEmail
                  ? {
                      ...adviser,
                      contactPhone,
                      contactEmail
                    }
                  : null
            });
          }),
          catchError(() => of(actions.fetchAdviserErrorAction()))
        )
      )
    )
  );
}
