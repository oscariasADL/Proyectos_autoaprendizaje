import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { UpdateInstallmentsSlide } from '@modules/product-options/credit-movements/pages/update-installments/constants/update-installments.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapUpdateInstallmentsSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [UpdateInstallmentsSlide.movement]: {
      type: SlideType.outlet,
      data: {
        outletName: 'movements'
      },
      step: UpdateInstallmentsSlide.movement
    },
    [UpdateInstallmentsSlide.installments]: {
      type: SlideType.outlet,
      data: {
        outletName: 'installments'
      },
      step: UpdateInstallmentsSlide.installments
    },
    [UpdateInstallmentsSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'UPDATE_INSTALLMENTS.CONFIRMATION_STEP.TITLE',
        control: form.get('confirmation'),
        buttonText: 'UPDATE_INSTALLMENTS.CONFIRMATION_STEP.BUTTON',
        message: 'UPDATE_INSTALLMENTS.CONFIRMATION_STEP.MESSAGE'
      },
      step: UpdateInstallmentsSlide.confirmation
    }
  };
}
