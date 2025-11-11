import { Injectable } from '@angular/core';
import {
  ComplementaryServicesStep,
  ToggleComplementaryServicesPayload
} from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SecurityComplementaryServicesFacadeMock extends AppFacadeMock {
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public step$: Observable<ComplementaryServicesStep> = new BehaviorSubject(
    null
  );

  public errorMessage$: Observable<string> = new BehaviorSubject(null);

  public setComplementaryServicesStep(step: ComplementaryServicesStep): void {}

  public toggleComplementaryServices(
    payload: ToggleComplementaryServicesPayload
  ): void {}
}
