import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';

import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  EditPocketWithReturnsSlide,
  EditPocketWithReturnsStep
} from '../constants/edit-pocket-with-returns.constants';

export function mapPocketWithReturnsEditSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [EditPocketWithReturnsSlide.update]: {
      type: SlideType.outlet,
      data: {
        outletName: EditPocketWithReturnsSlide.update
      },
      step: EditPocketWithReturnsStep[EditPocketWithReturnsSlide.update]
    },
    [EditPocketWithReturnsSlide.confirmation]: {
      type: SlideType.outlet,
      data: {
        outletName: EditPocketWithReturnsSlide.confirmation
      },
      step: EditPocketWithReturnsStep[EditPocketWithReturnsSlide.confirmation]
    }
  };
}
