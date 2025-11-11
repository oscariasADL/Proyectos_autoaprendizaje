import { Injectable } from '@angular/core';
import { UpdatePasswordPayload } from '@modules/auth/update-password/entities/update-password.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UpdatePasswordFacadeMock extends AppFacadeMock {
  public updatePasswordCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public resetUpdatePassword(): void {}

  public updatePassword(payload: UpdatePasswordPayload): void {}
}
