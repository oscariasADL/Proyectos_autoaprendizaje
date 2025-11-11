import { Injectable } from '@angular/core';
import { RechargePayload } from '@modules/product-options/recharges/entities/recharges.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class RechargesFacadeMock extends AppFacadeMock {
  public recharge(payload: RechargePayload, data: AlertStepData): void {}
}
