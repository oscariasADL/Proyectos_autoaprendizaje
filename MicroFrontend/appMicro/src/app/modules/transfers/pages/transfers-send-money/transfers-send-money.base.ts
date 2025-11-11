import { Injector } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { TransfiyaInfoService } from '@commons/services/transfiya-info.service';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { TransferContactSlide } from '@modules/transfers/pages/transfers-contacts/constants/transfers-contacts.constants';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import {
  TRANSFERS_SEND_MONEY_INFO_ALERT,
  TransferSendMoneySlide
} from './constants/transfers-send-money.constants';

export class TransfersSendMoneyBase extends GenericStepperBase {
  protected facade: TransfersFacade;
  protected informationService: InformationService;
  protected transfiyaInfoService: TransfiyaInfoService;

  constructor(protected injector: Injector) {
    super(injector);
    this.facade = this.injector.get<TransfersFacade>(TransfersFacade);
    this.informationService =
      this.injector.get<InformationService>(InformationService);
    this.transfiyaInfoService =
      this.injector.get<TransfiyaInfoService>(TransfiyaInfoService);
  }

  public async setNextStep(data: any): Promise<void> {
    const { slide, value } = data;
    this.form.updateValueAndValidity();

    if (value === StepperTypes.informationPanel) {
      await this.informationService.showPanel({
        ...TRANSFERS_SEND_MONEY_INFO_ALERT,
        linkAction: () => this.transfiyaInfoService.showTransfiyaInfo()
      });
    } else if (slide === TransferSendMoneySlide.towardCellPhone) {
      await this.setConfirmationData(SlideType.confirmation);
      this.data[TransferContactSlide.confirmation].data.message =
        this.form.controls.transferType.value === TransferType.SEND_TRANSFIYA
          ? this.translate.instant('TRANSFERS.SEND_MONEY.CONFIRM.MESSAGE') +
            this.form.get('fee').value +
            ' + IVA.'
          : null;
    } else {
      await super.setNextStep(data);
    }
  }

  public slideSelected(slide: string): void {
    this.data[TransferSendMoneySlide.confirmation].data.notice = null;
    this.nextStep(slide);
  }
}
