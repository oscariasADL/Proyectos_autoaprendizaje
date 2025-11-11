import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  SilentEnrollmentPayload,
  SilentEnrollmentResponse
} from './entities/silent-enrollment.interface';
import {
  runSilentEnrollmentAction,
  silentEnrollmentCompletedAction
} from './store/silent-enrollment.actions';
import {
  silentEnrollmentDataSelector,
  silentEnrollmentWorkingSelector
} from './store/silent-enrollment.selector';

@Injectable()
export class SilentEnrollmentFacade extends AppFacade {
  public silentEnrollmentData$: Observable<SilentEnrollmentResponse> =
    this.store.pipe(select(silentEnrollmentDataSelector));

  public silentEnrollmentWorking$: Observable<boolean> = this.store.pipe(
    select(silentEnrollmentWorkingSelector)
  );

  public runSilentEnrollment(payload: SilentEnrollmentPayload): void {
    this.store.dispatch(runSilentEnrollmentAction({ payload }));
  }

  public silentEnrollmentCompleted(): void {
    this.store.dispatch(silentEnrollmentCompletedAction());
  }
}
