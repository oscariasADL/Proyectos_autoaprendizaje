import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { mapUpdatePasswordError } from '@modules/auth/update-password/mappers/update-password-response.mapper';
import { UpdatePasswordService } from '@modules/auth/update-password/services/update-password.service';
import * as actions from '@modules/auth/update-password/store/update-password.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class UpdatePasswordEffect {
  constructor(
    private actions$: Actions,
    private service: UpdatePasswordService,
    private secureStorage: AdlSecureStorageService
  ) {}

  updatePasswordEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updatePasswordAction),
      switchMap(({ payload }) =>
        this.service.updatePassword(payload).pipe(
          switchMap(() =>
            defer(async () => {
              const db = await this.secureStorage.getAll();
              const loginData = JSON.parse(
                getDBValue(db, SecureKeys.loginData)
              );

              await this.secureStorage.put(
                SecureKeys.loginData,
                JSON.stringify({
                  ...loginData,
                  password: payload.newPassword
                }),
                true
              );

              return actions.updatePasswordSuccessAction();
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.updatePasswordErrorAction({
                props: mapUpdatePasswordError(error)
              })
            )
          )
        )
      )
    )
  );
}
