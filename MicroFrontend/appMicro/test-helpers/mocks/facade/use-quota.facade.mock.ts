import { Injectable } from '@angular/core';
import { UseQuotaPayload } from '@modules/product-options/use-quota/entities/use-quota.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class UseQuotaFacadeMock extends AppFacadeMock {
  public useQuota(payload: UseQuotaPayload, data: AlertStepData): void {}
}
