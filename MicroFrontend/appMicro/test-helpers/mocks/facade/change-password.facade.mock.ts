import { Injectable } from '@angular/core';
import { ChangePasswordPayload } from '@modules/change-password/entities/change-password.entities';
import { ChangePasswordState } from '@modules/change-password/store/change-password.state';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class ChangePasswordFacadeMock extends AppFacadeMock {
  public changePassword$: Observable<ChangePasswordState> = new BehaviorSubject(
    {
      working: false,
      completed: true,
      message: 'tales',
      errorCode: ''
    }
  );

  public changePassword(payload: ChangePasswordPayload): void {}
}
