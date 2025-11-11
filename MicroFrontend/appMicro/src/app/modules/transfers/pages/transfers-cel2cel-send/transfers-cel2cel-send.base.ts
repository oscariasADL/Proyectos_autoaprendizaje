import { Inject, Injector } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import {
  TransfersCel2celSlide,
  TRANSFERS_CEL2CEL_INFO_ALERT
} from './constants/transfers-cel2cel-send.constants';
import { DOCUMENT } from '@angular/common';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';

export class TransfersCel2celSendBase extends GenericStepperBase {
  protected facade: TransfersFacade;
  protected cel2celFacade: TransfersCel2celFacade;
  protected informationService: InformationService;
  protected document: any;

  constructor(protected injector: Injector) {
    super(injector);
    this.facade = this.injector.get<TransfersFacade>(TransfersFacade);
    this.cel2celFacade = this.injector.get<TransfersCel2celFacade>(
      TransfersCel2celFacade
    );
    this.document = this.injector.get(DOCUMENT);
    this.informationService =
      this.injector.get<InformationService>(InformationService);
  }

  public async setNextStep(data: any): Promise<void> {
    const { value } = data;
    this.form.updateValueAndValidity();

    if (value === StepperTypes.informationPanel) {
      await this.informationService.showPanel(TRANSFERS_CEL2CEL_INFO_ALERT);
    } else {
      await super.setNextStep(data);
    }
  }

  public slideSelected(slide: string): void {
    this.data[TransfersCel2celSlide.confirmationCel2cel].data.notice = null;
    this.nextStep(slide);
  }
}
