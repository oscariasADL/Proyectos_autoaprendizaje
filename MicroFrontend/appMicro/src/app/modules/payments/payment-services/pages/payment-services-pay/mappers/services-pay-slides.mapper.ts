import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  ServicesPaySlide,
  ServicesPayStep
} from '@modules/payments/payment-services/pages/payment-services-pay/constants/services-pay.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapServicesPaySlides(
  form: UntypedFormGroup,
  hasBillAmount: boolean
): GenericStepperData {
  return {
    [ServicesPaySlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.EXCEPTION_TITLE',
          description: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.EXCEPTION_DESCRIPTION'
        },
        control: form.get('fromProduct')
      },
      step: ServicesPayStep[ServicesPaySlide.from]
    },
    ...(hasBillAmount
      ? {}
      : {
          [ServicesPaySlide.amount]: {
            type: SlideType.field,
            data: {
              id: 'services-pay-amount',
              title: 'PAYMENTS.SERVICES.AMOUNT_STEP.TITLE',
              type: AvvInputType.currency,
              label: 'PAYMENTS.SERVICES.AMOUNT_STEP.LABEL',
              buttonText: 'ACTIONS.CONTINUE',
              control: form.get('amount')
            },
            step: ServicesPayStep[ServicesPaySlide.amount]
          }
        }),
    [ServicesPaySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'PAYMENTS.SERVICES.CONFIRMATION_STEP.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.PAYMENT',
        message:
          'El pago de tu servicio se verá reflejado\n' +
          'el siguiente día hábil.'
      },
      step:
        ServicesPayStep[ServicesPaySlide.confirmation] - (hasBillAmount ? 0 : 1)
    }
  };
}
