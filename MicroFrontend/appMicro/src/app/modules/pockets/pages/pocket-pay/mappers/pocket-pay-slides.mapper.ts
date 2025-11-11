import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  PocketPaySlide,
  PocketPayStep
} from '@modules/pockets/pages/pocket-pay/constants/pocket-pay.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapPocketPaySlides(form: UntypedFormGroup): GenericStepperData {
  return {
    [PocketPaySlide.pay]: {
      type: SlideType.outlet,
      data: {
        outletName: 'pay'
      },
      step: PocketPayStep[PocketPaySlide.pay]
    },
    [PocketPaySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'POCKETS.PAY.CONFIRM',
        control: form.get('confirmation'),
        buttonText: 'POCKETS.PAY.BUTTON',
        iconImage: 'illustrations/hand-with-money-bag.svg'
      },
      step: PocketPayStep[PocketPaySlide.confirmation]
    }
  };
}
