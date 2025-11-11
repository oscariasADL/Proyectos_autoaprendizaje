import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '@modules/contacts/entities/contact.interface';
import * as actions from '@modules/contacts/pages/contact-list/store/contact-list.actions';
import { ContactService } from '@modules/contacts/services/contact.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ContactListEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: ContactService
  ) {}

  fetchContactsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchContactsAction),
      switchMap((action) =>
        this.service.fetchContacts(action.payload).pipe(
          map((contacts: Contact[]) =>
            actions.fetchContactsSuccessAction({ contacts })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchContactsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
