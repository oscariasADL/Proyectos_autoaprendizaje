import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  PayLoanSlide,
  PayLoanStep
} from '@modules/payments/payment-credits/constants/pay-loan.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapPayLoanSlides(form: UntypedFormGroup): GenericStepperData {
  return {
    [PayLoanSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'PAYMENTS.PAY_LOAN.ACCOUNTS_STEP.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'PAYMENTS.PAY_LOAN.ACCOUNTS_STEP.EXCEPTION_TITLE',
          description: 'PAYMENTS.PAY_LOAN.ACCOUNTS_STEP.EXCEPTION_DESCRIPTION'
        },
        control: form.get('fromProduct')
      },
      step: PayLoanStep[PayLoanSlide.from]
    },
    [PayLoanSlide.amount]: {
      type: SlideType.outlet,
      data: {
        outletName: 'amount'
      },
      step: PayLoanStep[PayLoanSlide.amount]
    },
    [PayLoanSlide.type]: {
      type: SlideType.outlet,
      data: {
        outletName: 'paymentType'
      },
      step: PayLoanStep[PayLoanSlide.type]
    },
    [PayLoanSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'PAYMENTS.PAY_LOAN.CONFIRMATION_STEP.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.PAYMENT',
        formData: form.value
      },
      step: PayLoanStep[PayLoanSlide.confirmation]
    }
  };
}
