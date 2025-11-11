import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as actions from './generic-stepper.actions';
import { GmfService } from '@app/commons/services/gmf/gmf.service';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';

@Injectable()
export class GenericStepperEffect {
  constructor(private actions$: Actions, private service: GmfService) {}

  fetchGMFDataEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchGMFAction),
      switchMap((action) =>
        this.service.fetchGMF(action.payload).pipe(
          map((gmf: GMFData) => actions.fetchGMFSuccessAction({ gmf })),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchGMFErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
