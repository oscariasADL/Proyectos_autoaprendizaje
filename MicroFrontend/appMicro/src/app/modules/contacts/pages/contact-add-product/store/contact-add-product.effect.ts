import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericResponse } from '@commons/entities/response/response.interface';
import {
  mapContactAddProductError,
  mapContactAddProductResponse
} from '@modules/contacts/pages/contact-add-product/mappers/contact-add-product-response.mapper';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ContactService } from '../../../services/contact.service';
import * as actions from './contact-add-product.actions';

@Injectable()
export class ContactAddProductEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: ContactService
  ) {}

  contactAddProductEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.contactAddProductAction),
      switchMap((action) =>
        this.service.addProductToContact(action.payload).pipe(
          map((response: GenericResponse) =>
            action.onlyAdd
              ? actions.contactAddProductFinishedAction()
              : actions.contactAddProductSuccessAction({
                  props: mapContactAddProductResponse(response)
                })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.contactAddProductErrorAction({
                props: mapContactAddProductError(error)
              })
            )
          )
        )
      )
    )
  );
}
