import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  sendToken,
  sendTokenFailure,
  sendTokenSuccess
} from './qr-authorization.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FA2AuthService } from '@app/commons/services/fa2-auth.service';
import {
  mapQRServiceReject,
  mapQRServiceResponse
} from '../mappers/qr-authorization.mapper';

@Injectable()
export class QrAuthorizationEffect {
  constructor(
    private actions$: Actions,
    private fA2AuthService: FA2AuthService
  ) {}
  sendToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendToken),
      mergeMap((action) =>
        this.fA2AuthService.call2FAAuth(action.payload).pipe(
          map((response) =>
            sendTokenSuccess({ props: mapQRServiceResponse() })
          ),
          catchError((error) =>
            of(sendTokenFailure({ props: mapQRServiceReject() }))
          )
        )
      )
    )
  );
}
