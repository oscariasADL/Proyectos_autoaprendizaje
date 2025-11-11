import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  PocketEditSlide,
  PocketEditStep
} from '@modules/pockets/pages/pocket-edit/constants/pocket-edit.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapPocketEditSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [PocketEditSlide.update]: {
      type: SlideType.outlet,
      data: {
        outletName: 'update'
      },
      step: PocketEditStep[PocketEditSlide.update]
    },
    [PocketEditSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'POCKETS.EDIT.CONFIRM.TITLE',
        control: form.get('confirmation'),
        buttonText: 'POCKETS.EDIT.CONFIRM.BUTTON',
        iconImage: 'illustrations/pocket-money.svg'
      },
      step: PocketEditStep[PocketEditSlide.confirmation]
    }
  };
}
