import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse
} from '@modules/auth/forgot-password/entities/forgot-password.interface';
import { runForgotPasswordAction } from '@modules/auth/forgot-password/store/forgot-password.actions';
import {
  forgotPasswordDataSelector,
  forgotPasswordWorkingSelector
} from '@modules/auth/forgot-password/store/forgot-password.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ForgotPasswordFacade extends AppFacade {
  public forgotPasswordData$: Observable<ForgotPasswordResponse> =
    this.store.pipe(select(forgotPasswordDataSelector));

  public forgotPasswordWorking$: Observable<boolean> = this.store.pipe(
    select(forgotPasswordWorkingSelector)
  );

  public runForgotPassword(payload: ForgotPasswordPayload): void {
    this.store.dispatch(runForgotPasswordAction({ payload }));
  }
}
