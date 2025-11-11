import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { RechargePayload } from '@modules/product-options/recharges/entities/recharges.interface';
import { rechargeAction } from '@modules/product-options/recharges/store/recharges.actions';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

@Injectable()
export class RechargesFacade extends AppFacade {
  public recharge(payload: RechargePayload, data: AlertStepData): void {
    this.store.dispatch(rechargeAction({ payload, data }));
  }
}
