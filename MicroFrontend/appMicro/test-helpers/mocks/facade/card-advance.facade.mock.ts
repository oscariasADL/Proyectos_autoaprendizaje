import { Injectable } from '@angular/core';
import { CardAdvancePayload } from '@modules/product-options/card-advance/entities/card-advance.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class CardAdvanceFacadeMock extends AppFacadeMock {
  public cardAdvance(payload: CardAdvancePayload, data: AlertStepData): void {}
}
