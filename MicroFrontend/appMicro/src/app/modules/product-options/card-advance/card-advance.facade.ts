import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { CardAdvancePayload } from '@modules/product-options/card-advance/entities/card-advance.interface';
import { cardAdvanceAction } from '@modules/product-options/card-advance/store/card-advance.actions';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

@Injectable()
export class CardAdvanceFacade extends AppFacade {
  public cardAdvance(payload: CardAdvancePayload, data: AlertStepData): void {
    this.store.dispatch(cardAdvanceAction({ payload, data }));
  }
}
