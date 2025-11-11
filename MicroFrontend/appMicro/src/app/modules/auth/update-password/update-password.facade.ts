import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { UpdatePasswordPayload } from '@modules/auth/update-password/entities/update-password.interface';
import {
  resetUpdatePasswordAction,
  updatePasswordAction
} from '@modules/auth/update-password/store/update-password.actions';
import { updatePasswordCompletedSelector } from '@modules/auth/update-password/store/update-password.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class UpdatePasswordFacade extends AppFacade {
  public updatePasswordCompleted$: Observable<boolean> = this.store.pipe(
    select(updatePasswordCompletedSelector)
  );

  public resetUpdatePassword(): void {
    this.store.dispatch(resetUpdatePasswordAction());
  }

  public updatePassword(payload: UpdatePasswordPayload): void {
    this.store.dispatch(updatePasswordAction({ payload }));
  }
}
