import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  mergeMap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import * as actions from '@modules/wallets/pages/activate-token/store/activate-token.actions';
import { ActivateTokenService } from '@modules/wallets/pages/activate-token/services/activate-token.service';
import { ActivateTokenFacade } from '@modules/wallets/pages/activate-token/activate-token.facade';
import { mapActivateTokenPayload } from '@modules/wallets/pages/activate-token/mappers/activate-token.mapper';
import { HttpErrorResponse } from '@angular/common/http';
import { mapError } from '@commons/helpers/http.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';

@Injectable()
export class ActivateTokenEffect {
  constructor(
    private actions$: Actions,
    private secureStorage: AdlSecureStorageService,
    private service: ActivateTokenService,
    private facade: ActivateTokenFacade
  ) {}

  fetchLastTokenEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchLastTokenAction),
      switchMap(() =>
        this.service.fetchLastToken().pipe(
          mergeMap(({ token }) => [
            actions.fetchLastTokenSuccessAction({ token }),
            actions.activateTokenAction({ token })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchLastTokenErrorAction({
                error: mapError(error)
              })
            )
          )
        )
      )
    )
  );

  activateTokenEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.activateTokenAction),
      withLatestFrom(this.facade.basicData$),
      switchMap(([action, userData]) =>
        this.service
          .activateToken(mapActivateTokenPayload(action.token, userData))
          .pipe(
            map(() => actions.activateTokenSuccessAction()),
            catchError((error) =>
              of(
                actions.fetchLastTokenErrorAction({
                  error: mapError(error)
                })
              )
            ),
            finalize(() => {
              void this.secureStorage.remove(SecureKeys.openFromDeepLink, true);
            })
          )
      )
    )
  );
}
