import { Injectable } from '@angular/core';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { WithdrawPayload } from '@modules/withdraw/entities/withdraw.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class WithdrawFacadeMock extends AppFacadeMock {
  public withdraw(payload: WithdrawPayload, data: AlertStepData): void {}
}
