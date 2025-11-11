import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { silentEnrollmentCompletedAction } from '../silent-enrollment/store/silent-enrollment.actions';

@Injectable()
export class AuthStepsFacade extends AppFacade {
  public silentEnrollmentCompleted(): void {
    this.store.dispatch(silentEnrollmentCompletedAction());
  }
}
