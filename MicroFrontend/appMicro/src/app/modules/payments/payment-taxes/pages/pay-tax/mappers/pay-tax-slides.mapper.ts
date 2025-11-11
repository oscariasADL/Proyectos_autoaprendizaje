import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { accountFilters, PaytaxSlide } from '../constants/pay-tax.constants';

export function mapPaytaxSlides(form: UntypedFormGroup): GenericStepperData {
  return {
    [PaytaxSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.TITLE',
        accountFilters,
        accountException: {
          title: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.EXCEPTION_TITLE',
          description: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.EXCEPTION_DESCRIPTION'
        },
        control: form.get('fromProduct')
      },
      step: PaytaxSlide.from
    },
    [PaytaxSlide.city]: {
      type: SlideType.outlet,
      data: {
        outletName: 'city'
      },
      step: PaytaxSlide.city
    },
    [PaytaxSlide.agreement]: {
      type: SlideType.outlet,
      data: {
        outletName: 'agreement'
      },
      step: PaytaxSlide.agreement
    },
    [PaytaxSlide.reference]: {
      type: SlideType.outlet,
      data: {
        outletName: 'reference'
      },
      step: PaytaxSlide.reference
    },
    [PaytaxSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a pagar',
        control: form.get('confirmation'),
        buttonText: 'PAGAR'
      },
      step: PaytaxSlide.confirmation
    }
  };
}
