import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { movementsDetailWorkingSelector } from '@modules/movement/store/movement.selector';
import {
  ComplementaryServicesStep,
  ToggleComplementaryServicesPayload
} from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import {
  setComplementaryServicesStepAction,
  toggleComplementaryServicesAction
} from '@modules/security/security-complementary-services/store/complementary-services.actions';
import {
  complementaryServicesStepSelector,
  errorMessageSelector,
  toggleAutomaticValidationSelector,
  toggleErrorSelector,
  toggleProcessIdSelector
} from '@modules/security/security-complementary-services/store/complementary-services.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityComplementaryServicesFacade extends AppFacade {
  public working$: Observable<boolean> = this.store.pipe(
    select(movementsDetailWorkingSelector)
  );

  public step$: Observable<ComplementaryServicesStep> = this.store.pipe(
    select(complementaryServicesStepSelector)
  );

  public toggleProcessId$: Observable<string> = this.store.pipe(
    select(toggleProcessIdSelector)
  );

  public toggleAutomaticValidation$: Observable<boolean> = this.store.pipe(
    select(toggleAutomaticValidationSelector)
  );

  public toggleError$: Observable<boolean> = this.store.pipe(
    select(toggleErrorSelector)
  );

  public errorMessage$: Observable<string> = this.store.pipe(
    select(errorMessageSelector)
  );

  public setComplementaryServicesStep(step: ComplementaryServicesStep): void {
    this.store.dispatch(setComplementaryServicesStepAction({ step }));
  }

  public toggleComplementaryServices(
    payload: ToggleComplementaryServicesPayload
  ): void {
    this.store.dispatch(toggleComplementaryServicesAction({ payload }));
  }
}
