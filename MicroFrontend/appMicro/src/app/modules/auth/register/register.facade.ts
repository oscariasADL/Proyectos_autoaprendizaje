import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  RegisterPayload,
  RegisterResponse
} from '@modules/auth/register/entities/register.interface';
import { runRegisterAction } from '@modules/auth/register/store/register.actions';
import {
  registerDataSelector,
  registerWorkingSelector
} from '@modules/auth/register/store/register.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterFacade extends AppFacade {
  public registerData$: Observable<RegisterResponse> = this.store.pipe(
    select(registerDataSelector)
  );

  public registerWorking$: Observable<boolean> = this.store.pipe(
    select(registerWorkingSelector)
  );

  public runRegister(payload: RegisterPayload): void {
    this.store.dispatch(runRegisterAction({ payload }));
  }
}
