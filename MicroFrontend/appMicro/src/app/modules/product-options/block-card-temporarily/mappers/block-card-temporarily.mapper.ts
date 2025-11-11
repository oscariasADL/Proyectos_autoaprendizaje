import { FormGroup } from '@angular/forms';
import { BlockCardTemporarilyForm } from '@modules/product-options/block-card-temporarily/entities/block-card-temporarily.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  BLOCK_CARD_TEMPORARILY_SLIDE,
  BlockCardTemporarilySlide
} from '@modules/product-options/block-card-temporarily/constants/block-card-temporarily.constants';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';

export function mapBlockCardTemporarilySlides(
  form: FormGroup<BlockCardTemporarilyForm>
): GenericStepperData {
  return {
    [BlockCardTemporarilySlide.from]: {
      type: SlideType.outlet,
      data: {
        title: 'Tarjetas',
        outletName: BlockCardTemporarilySlide.from
      },
      step: BLOCK_CARD_TEMPORARILY_SLIDE[BlockCardTemporarilySlide.from]
    },
    [BlockCardTemporarilySlide.date]: {
      type: SlideType.outlet,
      data: {
        title: 'Fechas',
        outletName: BlockCardTemporarilySlide.date
      },
      step: BLOCK_CARD_TEMPORARILY_SLIDE[BlockCardTemporarilySlide.date]
    },
    [BlockCardTemporarilySlide.confirm]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a realizar un bloqueo temporal',
        control: form.controls.confirmation,
        buttonText: 'Bloquear Temporalmente',
        formData: form.value,
        noticeWarning: 'BLOCK_CARD_TEMPORARILY.CONFIRMATION.WARNING_MESSAGE'
      },
      step: BLOCK_CARD_TEMPORARILY_SLIDE[BlockCardTemporarilySlide.confirm]
    }
  };
}
