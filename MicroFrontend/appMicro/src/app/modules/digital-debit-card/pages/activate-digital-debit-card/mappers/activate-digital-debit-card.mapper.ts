import { FormGroup } from '@angular/forms';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  ACTIVATE_DIGITAL_DEBIT_CARD_STEP,
  ActivateDigitalDebitCardSlide
} from '@modules/digital-debit-card/pages/activate-digital-debit-card/constants/activate-digital-debit-card.constants';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';

export function mapActivateDigitalDebitCardSlides(
  form: FormGroup
): GenericStepperData {
  return {
    [ActivateDigitalDebitCardSlide.info]: {
      type: SlideType.outlet,
      data: {
        title: 'Activar',
        outletName: ActivateDigitalDebitCardSlide.info
      },
      step: ACTIVATE_DIGITAL_DEBIT_CARD_STEP[ActivateDigitalDebitCardSlide.info]
    },
    [ActivateDigitalDebitCardSlide.config]: {
      type: SlideType.outlet,
      data: {
        title: 'Configurar',
        outletName: ActivateDigitalDebitCardSlide.config
      },
      step: ACTIVATE_DIGITAL_DEBIT_CARD_STEP[
        ActivateDigitalDebitCardSlide.config
      ]
    }
  };
}
