import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  PocketCreateWithReturnsSlide,
  PocketCreateWithReturnsStep
} from '../constants/pocket-create-with-returns.constants';

export function mapPocketWithReturnsCreateSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [PocketCreateWithReturnsSlide.customization]: {
      type: SlideType.outlet,
      data: {
        outletName: 'customization'
      },
      step: PocketCreateWithReturnsStep[
        PocketCreateWithReturnsSlide.customization
      ]
    },
    [PocketCreateWithReturnsSlide.configuration]: {
      type: SlideType.outlet,
      data: {
        outletName: 'configuration',
        form: []
      },
      step: PocketCreateWithReturnsStep[
        PocketCreateWithReturnsSlide.configuration
      ]
    },

    [PocketCreateWithReturnsSlide.confirmation]: {
      type: SlideType.outlet,
      data: {
        outletName: 'confirmation'
      },
      step: PocketCreateWithReturnsStep[
        PocketCreateWithReturnsSlide.confirmation
      ]
    }
  };
}
