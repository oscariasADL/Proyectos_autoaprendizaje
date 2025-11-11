import { Injector } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { SlideType, Step } from '@modules/forms-avv/entities/stepper.interface';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import {
  TransferContactSlide,
  TransferContactStep,
  TRANSFERS_CONTACTS_INFO_ALERT
} from '@modules/transfers/pages/transfers-contacts/constants/transfers-contacts.constants';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { BANK_GROUP } from '@commons/constants/card.constants';

export class TransfersContactsBase extends GenericStepperBase {
  protected facade: TransfersContactsFacade;
  protected informationService: InformationService;

  constructor(protected injector: Injector) {
    super(injector);
    this.facade = this.injector.get<TransfersContactsFacade>(
      TransfersContactsFacade
    );
    this.informationService =
      this.injector.get<InformationService>(InformationService);
  }

  public async setNextStep(data: any): Promise<void> {
    const { slide, value } = data;
    this.form.updateValueAndValidity();

    if (value === StepperTypes.informationPanel) {
      await this.informationService.showPanel(TRANSFERS_CONTACTS_INFO_ALERT);
    } else if (
      slide === TransferContactSlide.ownProducts ||
      slide === TransferContactSlide.contactProducts ||
      slide === TransferContactSlide.contactProductType
    ) {
      await this.setConfirmationData(SlideType.confirmation);
      this.data[TransferContactSlide.confirmation].data.message =
        this.form.controls.transferType.value === TransferType.SEND_TRANSFIYA
          ? this.translate.instant('TRANSFERS.CONTACTS.CONFIRMATION.MESSAGE') +
            this.form.get('fee').value +
            ' + IVA.'
          : null;
      this.data[TransferContactSlide.confirmation].data.noticeWarning =
        this.form.controls.contactProduct.value?.bank?.id !==
          BANK_GROUP.VILLAS_CODE &&
        ![TransferType.SEND_AVV_PHONE, TransferType.SEND_TRANSFIYA].includes(
          this.form.controls.transferType.value
        )
          ? this.translate.instant('TRANSFERS.RESPONSE.SUCCESS.MESSAGE_CONTACT')
          : null;
    } else {
      await super.setNextStep(data);
    }
  }

  public stepSelected(step: Step): void {
    this.data[TransferContactSlide.confirmation].data.notice = null;

    if (step.id === TransferContactStep[TransferContactSlide.ownProducts]) {
      this.nextStep(
        this.form.value.transferType === TransferType.MY_ACCOUNTS_AVV
          ? TransferContactSlide.ownProducts
          : TransferContactSlide.contactProducts
      );
    } else {
      super.stepSelected(step);
    }
  }

  public slideSelected(slide: string): void {
    this.data[TransferContactSlide.confirmation].data.notice = null;
    this.nextStep(slide);
  }
}
