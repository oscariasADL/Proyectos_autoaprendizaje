import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { useQuotaAction } from '@modules/product-options/use-quota/store/use-quota.actions';
import { UseQuotaPayload } from '@modules/product-options/use-quota/entities/use-quota.interface';

@Injectable()
export class UseQuotaFacade extends AppFacade {
  public useQuota(payload: UseQuotaPayload, data: AlertStepData): void {
    this.store.dispatch(useQuotaAction({ payload, data }));
  }
}
