import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  DIRECTED_PAYMENT_AVAILABLE_FIELD,
  DirectedPaymentSlide
} from '@modules/product-options/credit-movements/pages/directed-payment/constants/directed-payment.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapDirectedPaymentSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    /*[DirectedPaymentSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'DIRECTED_PAYMENTS.ACCOUNTS_STEP.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
        },
        accountException: {
          title: 'DIRECTED_PAYMENTS.ACCOUNTS_STEP.EXCEPTION_TITLE',
          description: 'DIRECTED_PAYMENTS.ACCOUNTS_STEP.EXCEPTION_DESCRIPTION'
        },
        disabledField: DIRECTED_PAYMENT_AVAILABLE_FIELD,
        control: form.get('fromProduct')
      },
      step: DirectedPaymentSlide.from
    },*/
    [DirectedPaymentSlide.movement]: {
      type: SlideType.outlet,
      data: {
        outletName: 'movements'
      },
      step: DirectedPaymentSlide.movement
    },
    [DirectedPaymentSlide.amount]: {
      type: SlideType.outlet,
      data: {
        outletName: 'amount'
      },
      step: DirectedPaymentSlide.amount
    },
    [DirectedPaymentSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'DIRECTED_PAYMENTS.CONFIRMATION_STEP.TITLE',
        control: form.get('confirmation'),
        buttonText: 'DIRECTED_PAYMENTS.CONFIRMATION_STEP.BUTTON'
      },
      step: DirectedPaymentSlide.confirmation
    }
  };
}
