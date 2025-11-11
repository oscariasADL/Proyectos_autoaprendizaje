import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  PocketTransferSlide,
  PocketTransferStep
} from '../constants/pocket-transfer.constants';

export function mapPocketTransferSlides(
  form: UntypedFormGroup
): GenericStepperData {
  const isPocketProfitability =
    form.get('isPocketProfitability')?.value ?? false;
  return {
    [PocketTransferSlide.transfer]: {
      type: SlideType.outlet,
      data: {
        outletName: 'transfer'
      },
      step: PocketTransferStep[PocketTransferSlide.transfer]
    },
    [PocketTransferSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'POCKETS.TRANSFER.CONFIRM',
        control: form.get('confirmation'),
        buttonText: 'POCKETS.TRANSFER.BUTTON',
        iconImage: 'illustrations/transfer-money.svg',
        ...(isPocketProfitability && {
          noticeWarning: 'POCKETS.TRANSFER.WARNING_MESSAGE'
        })
      },
      step: PocketTransferStep[PocketTransferSlide.confirmation]
    }
  };
}
