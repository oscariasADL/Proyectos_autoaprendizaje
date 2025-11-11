import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { WithdrawPayload } from '@modules/withdraw/entities/withdraw.interface';
import { withdrawAction } from '@modules/withdraw/store/withdraw.actions';

@Injectable()
export class WithdrawFacade extends AppFacade {
  public withdraw(payload: WithdrawPayload, data: AlertStepData): void {
    this.store.dispatch(withdrawAction({ payload, data }));
  }
}
