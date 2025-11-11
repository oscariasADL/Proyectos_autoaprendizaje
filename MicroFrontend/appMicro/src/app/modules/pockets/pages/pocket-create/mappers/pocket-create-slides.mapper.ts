import { UntypedFormGroup } from '@angular/forms';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  PocketCreateSlide,
  PocketCreateStep
} from '@modules/pockets/pages/pocket-create/constants/pocket-create.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapPocketCreateSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [PocketCreateSlide.data]: {
      type: SlideType.outlet,
      data: {
        outletName: 'customization'
      },
      step: PocketCreateStep[PocketCreateSlide.data]
    },
    [PocketCreateSlide.settings]: {
      type: SlideType.form,
      data: {
        title: 'POCKETS.CREATE.SETTINGS_STEP.TITLE',
        id: 'pocket-settings',
        form: [
          {
            id: 'pocket-create-goal',
            type: AvvInputType.currency,
            label: 'POCKETS.FIELDS.GOAL',
            name: 'goal',
            control: form.get('goal')
          },
          {
            id: 'pocket-create-quota',
            type: AvvInputType.currency,
            label: 'POCKETS.FIELDS.QUOTA',
            name: 'quota',
            control: form.get('quota'),
            hint: 'POCKETS.CREATE.HINT_QUOTA'
          },
          {
            id: 'pocket-create-period-installments',
            type: AvvInputType.text,
            label: 'POCKETS.FIELDS.PERIOD_INSTALLMENTS',
            name: 'period',
            items: form.get('periodicity').value,
            control: form.get('period')
          },
          {
            id: 'pocket-create-open-amount',
            type: AvvInputType.currency,
            label: 'POCKETS.FIELDS.OPEN_AMOUNT_OPTIONAL',
            name: 'openAmount',
            control: form.get('openAmount')
          }
        ],
        asyncMessage: form.get('installments'),
        buttonText: 'ACTIONS.CONTINUE'
      },
      step: PocketCreateStep[PocketCreateSlide.settings]
    },
    [PocketCreateSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'POCKETS.CREATE.CONFIRMATION_STEP.TITLE',
        control: form.get('confirmation'),
        buttonText: 'POCKETS.CREATE.CONFIRMATION_STEP.BUTTON',
        iconImage: 'illustrations/pocket-money.svg'
      },
      step: PocketCreateStep[PocketCreateSlide.confirmation]
    }
  };
}
