import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { ChangePasswordPayload } from '@modules/change-password/entities/change-password.entities';
import { changePasswordAction } from '@modules/change-password/store/change-password.actions';
import { changePasswordSelector } from '@modules/change-password/store/change-password.selector';
import { ChangePasswordState } from '@modules/change-password/store/change-password.state';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ChangePasswordFacade extends AppFacade {
  public changePassword$: Observable<ChangePasswordState> = this.store.pipe(
    select(changePasswordSelector)
  );

  public changePassword(payload: ChangePasswordPayload): void {
    this.store.dispatch(changePasswordAction({ payload }));
  }
}
