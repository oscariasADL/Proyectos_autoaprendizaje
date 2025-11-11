import { Injector } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import {
  TransferRequestMoneySlide,
  TRANSFERS_REQUEST_MONEY_INFO_ALERT
} from '@modules/transfers/pages/transfers-request-money/constants/transfers-request-money.constants';
import { TransfersFacade } from '@modules/transfers/transfers.facade';

export class TransfersRequestMoneyBase extends GenericStepperBase {
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
      await this.informationService.showPanel(
        TRANSFERS_REQUEST_MONEY_INFO_ALERT
      );
    } else {
      await super.setNextStep(data);
    }
  }

  public stepSelected(step: Step): void {
    this.data[TransferRequestMoneySlide.confirmation].data.notice = null;
    super.stepSelected(step);
  }

  public slideSelected(slide: string): void {
    this.data[TransferRequestMoneySlide.confirmation].data.notice = null;
    super.nextStep(slide);
  }
}
