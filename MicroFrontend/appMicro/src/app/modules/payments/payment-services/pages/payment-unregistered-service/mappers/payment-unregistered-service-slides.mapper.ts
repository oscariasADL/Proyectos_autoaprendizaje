import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { PaymentUnregisteredServiceSlide } from '../constants/payment-unregistered-service.constants';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapPaymentUnregisteredServiceSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [PaymentUnregisteredServiceSlide.from]: {
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
      step: PaymentUnregisteredServiceSlide.from
    },
    [PaymentUnregisteredServiceSlide.service]: {
      type: SlideType.outlet,
      data: {
        outletName: 'service'
      },
      step: PaymentUnregisteredServiceSlide.service
    },
    [PaymentUnregisteredServiceSlide.reference]: {
      type: SlideType.outlet,
      data: {
        outletName: 'reference'
      },
      step: PaymentUnregisteredServiceSlide.reference
    },
    [PaymentUnregisteredServiceSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a pagar',
        control: form.get('confirmation'),
        buttonText: 'PAGAR'
      },
      step: PaymentUnregisteredServiceSlide.confirmation
    }
  };
}
