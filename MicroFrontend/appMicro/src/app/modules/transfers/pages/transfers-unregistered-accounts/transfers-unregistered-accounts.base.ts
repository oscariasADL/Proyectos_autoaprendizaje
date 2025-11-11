import { Injector } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { SlideType, Step } from '@modules/forms-avv/entities/stepper.interface';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import {
  TRANSFERS_UNREGISTERED_ACCOUNTS_INFO_ALERT,
  TransferUnregisteredAccountsSlide,
  TransferUnregisteredAccountsStep
} from './constants/transfers-unregistered-accounts.constants';

export class TransfersUnregisteredAccountsBase extends GenericStepperBase {
  protected facade: TransfersFacade;
  protected informationService: InformationService;

  constructor(protected injector: Injector) {
    super(injector);
    this.facade = this.injector.get<TransfersFacade>(TransfersFacade);
    this.informationService =
      this.injector.get<InformationService>(InformationService);
  }

  public async setNextStep(data: any): Promise<void> {
    const { slide, value } = data;
    this.form.updateValueAndValidity();

    if (value === StepperTypes.informationPanel) {
      await this.informationService.showPanel(
        TRANSFERS_UNREGISTERED_ACCOUNTS_INFO_ALERT
      );
    } else if (
      slide === TransferUnregisteredAccountsSlide.towardAccount ||
      slide === TransferUnregisteredAccountsSlide.towardCellPhone
    ) {
      await this.setConfirmationData(SlideType.confirmation);

      this.data[TransferUnregisteredAccountsSlide.confirmation].data.message =
        this.form.controls.transferType.value === TransferType.SEND_TRANSFIYA
          ? this.translate.instant(
              'TRANSFERS.UNREGISTER_ACCOUNTS.CONFIRM.MESSAGE_SEND_TRANSFIYA'
            ) +
            this.form.get('fee').value +
            ' + IVA.'
          : null;
    } else {
      await super.setNextStep(data);
    }
  }

  public slideSelected(slide: string): void {
    this.data[TransferUnregisteredAccountsSlide.confirmation].data.notice =
      null;
    this.nextStep(slide);
  }

  public stepSelected(step: Step): void {
    this.data[TransferUnregisteredAccountsSlide.confirmation].data.notice =
      null;

    if (
      step.id ===
      TransferUnregisteredAccountsStep[
        TransferUnregisteredAccountsSlide.towardAccount
      ]
    ) {
      this.nextStep(
        this.form.value.transferType === TransferType.FAST_TRANSFER
          ? TransferUnregisteredAccountsSlide.towardAccount
          : TransferUnregisteredAccountsSlide.towardCellPhone
      );
    } else {
      super.stepSelected(step);
    }
  }
}
