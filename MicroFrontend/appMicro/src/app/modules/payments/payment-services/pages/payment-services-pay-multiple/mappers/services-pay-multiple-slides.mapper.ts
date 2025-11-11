import { FormGroup } from '@angular/forms';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  SERVICES_PAY_MULTIPLE_AVAILABLE_FIELD,
  ServicesPayMultipleSlide,
  ServicesPayMultipleStep
} from '@modules/payments/payment-services/pages/payment-services-pay-multiple/constants/services-pay-multiple.constants';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  ServicesPaySlide,
  ServicesPayStep
} from '@modules/payments/payment-services/pages/payment-services-pay/constants/services-pay.constants';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapServicesPayMultipleSlides(
  form: FormGroup
): GenericStepperData {
  return {
    [ServicesPayMultipleSlide.service]: {
      type: SlideType.outlet,
      data: {
        outletName: 'services'
      },
      step: ServicesPayMultipleStep[ServicesPayMultipleSlide.service]
    },
    [ServicesPayMultipleSlide.from]: {
      type: SlideType.accounts,
      data: {
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.EXCEPTION_TITLE',
          description: 'PAYMENTS.SERVICES.ACCOUNTS_STEP.EXCEPTION_DESCRIPTION'
        },
        control: form.get('fromProduct'),
        disabledField: SERVICES_PAY_MULTIPLE_AVAILABLE_FIELD
      },
      step: ServicesPayMultipleStep[ServicesPayMultipleSlide.from]
    },
    [ServicesPaySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'PAYMENTS.SERVICES.CONFIRMATION_STEP.TITLE_MULTIPLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.PAYMENT'
      },
      step: ServicesPayStep[ServicesPaySlide.confirmation]
    }
  };
}
