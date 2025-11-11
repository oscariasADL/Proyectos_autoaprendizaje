import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ContactProduct } from '../../../entities/contact.interface';
import { ContactService } from '../../../services/contact.service';
import * as actions from './contact-detail.actions';

@Injectable()
export class ContactDetailEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: ContactService
  ) {}

  fetchContactProductsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchContactProductsAction),
      switchMap((action) =>
        this.service.fetchContactProducts(action.payload).pipe(
          map((products: ContactProduct[]) =>
            actions.fetchContactProductsSuccessAction({ products })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchContactProductsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
