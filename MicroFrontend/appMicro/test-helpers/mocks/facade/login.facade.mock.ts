import { Injectable } from '@angular/core';
import { LoginType } from '@modules/auth/login/constants/login.constants';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoginFacadeMock extends AppFacadeMock {
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public loginType$: Observable<LoginType> = new BehaviorSubject(
    LoginType.Document
  );

  public login(payload: LoginUserPayload): void {}

  public setLoginWithBiometric(loginWithBiometric: boolean): void {}

  public setLoginType(loginType: LoginType): void {}
}
