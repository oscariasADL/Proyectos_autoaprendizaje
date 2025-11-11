import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { LoginType } from '@modules/auth/login/constants/login.constants';
import { select } from '@ngrx/store';
import { setLoginWithBiometric } from '@store/actions/global.actions';
import { Observable } from 'rxjs';
import { LoginUserPayload } from './entities/login-user-payload.interface';
import { loginUserAction, setLoginTypeAction } from './store/login.actions';
import {
  loginTypeSelector,
  loginUserData,
  loginUserDataBasicClientDtoSelector,
  workingSelector
} from './store/login.selector';
import { LoginUserResponse } from '@modules/auth/login/entities/login-user-response.interface';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';

@Injectable()
export class LoginFacade extends AppFacade {
  public working$: Observable<boolean> = this.store.pipe(
    select(workingSelector)
  );

  public loginType$: Observable<LoginType> = this.store.pipe(
    select(loginTypeSelector)
  );

  public loginUserData$: Observable<LoginUserResponse> = this.store.pipe(
    select(loginUserData)
  );

  public loginUserDataBasicClientDto$: Observable<DataBasicClientDto> =
    this.store.pipe(select(loginUserDataBasicClientDtoSelector));

  public login(payload: LoginUserPayload): void {
    this.store.dispatch(loginUserAction({ payload }));
  }

  public setLoginWithBiometric(loginWithBiometric: boolean): void {
    this.store.dispatch(setLoginWithBiometric({ loginWithBiometric }));
  }

  public setLoginType(loginType: LoginType): void {
    this.store.dispatch(setLoginTypeAction({ loginType }));
  }
}
