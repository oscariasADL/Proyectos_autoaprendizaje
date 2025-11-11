import { Injector } from '@angular/core';

import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { InformationService } from '@commons/services/information.service';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TRANSFERS_AVAL_KEY_INFO_ALERT } from '@modules/transfers/pages/transfers-aval-key/constants/transfers-aval-key.constants';

export class TransfersAvalKeyBase extends GenericStepperBase {
  protected facade: TransfersFacade;
  protected informationService: InformationService;

  constructor(protected injector: Injector) {
    super(injector);
    this.facade = this.injector.get<TransfersFacade>(TransfersFacade);
    this.informationService =
      this.injector.get<InformationService>(InformationService);
  }

  public async setNextStep(data: any): Promise<void> {
    const { value } = data;
    this.form.updateValueAndValidity();

    if (value === StepperTypes.informationPanel) {
      await this.informationService.showPanel(TRANSFERS_AVAL_KEY_INFO_ALERT);
    } else {
      await super.setNextStep(data);
    }
  }
}
