import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class ActivateTokenFacadeMock extends AppFacadeMock {
  private _isActivatedSubject = new BehaviorSubject<boolean>(false);
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(true);

  public isActivated$: Observable<boolean> =
    this._isActivatedSubject.asObservable();

  public setIsActivated(value: boolean) {
    this._isActivatedSubject.next(value);
  }

  public fetchLastToken(): void {}
}
