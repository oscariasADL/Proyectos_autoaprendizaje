import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecureKeys } from '@commons/constants/keys.constants';
import { mapError } from '@commons/helpers/http.helpers';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { ChangePasswordService } from '@modules/change-password/services/change-password.service';
import * as actions from '@modules/change-password/store/change-password.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ChangePasswordEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: ChangePasswordService,
    private secureStorage: AdlSecureStorageService
  ) {}

  changePasswordEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changePasswordAction),
      switchMap(({ payload }) =>
        this.service.changePassword(payload).pipe(
          switchMap(() =>
            defer(async () => {
              const db = await this.secureStorage.getAll();

              const loginData: LoginUserPayload = JSON.parse(
                getDBValue(db, SecureKeys.loginData)
              ) as LoginUserPayload;

              await this.secureStorage.put(
                SecureKeys.loginData,
                JSON.stringify({
                  ...loginData,
                  password: payload.newPassword
                }),
                true
              );

              return actions.changePasswordSuccessAction();
            })
          ),
          catchError((response: HttpErrorResponse) =>
            of(
              actions.changePasswordErrorAction({
                message: mapError(response),
                errorCode: response.error.code
              })
            )
          )
        )
      )
    )
  );
}
