import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  RechargesSlide,
  RechargesStep
} from '@modules/product-options/recharges/constants/recharges.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapRechargesSlides(form: UntypedFormGroup): GenericStepperData {
  return {
    [RechargesSlide.productOrigin]: {
      type: SlideType.accounts,
      data: {
        title: 'RECHARGES.ACCOUNTS_STEP.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'RECHARGES.ACCOUNTS_STEP.EXCEPTION_TITLE',
          description: 'RECHARGES.ACCOUNTS_STEP.EXCEPTION_DESCRIPTION'
        },
        control: form.get('productOrigin')
      },
      step: RechargesStep[RechargesSlide.productOrigin]
    },
    [RechargesSlide.operator]: {
      type: SlideType.telephoneCompanies,
      data: {
        title: 'RECHARGES.OPERATOR_STEP.TITLE',
        control: form.get('mobileOperator')
      },
      step: RechargesStep[RechargesSlide.operator]
    },
    [RechargesSlide.phoneNumber]: {
      type: SlideType.field,
      data: {
        id: 'recharges-phone-number',
        title: 'RECHARGES.PHONE_NUMBER_STEP.TITLE',
        type: AvvInputType.phone,
        label: 'RECHARGES.PHONE_NUMBER_STEP.FIELD',
        buttonText: 'ACTIONS.CONTINUE',
        allowInputOperations: true,
        control: form.get('phoneNumber'),
        selectCellPhoneContacts: true,
        displayName: form.get('displayName')
      },
      step: RechargesStep[RechargesSlide.phoneNumber]
    },
    [RechargesSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'recharges-amount',
        title: 'RECHARGES.AMOUNT_STEP.TITLE',
        description: 'RECHARGES.AMOUNT_STEP.DESCRIPTION',
        type: AvvInputType.currency,
        label: 'RECHARGES.AMOUNT_STEP.FIELD',
        buttonText: 'ACTIONS.CONTINUE',
        control: form.get('amount'),
        phoneNumber: form.get('phoneNumber'),
        displayName: form.get('displayName')
      },
      step: RechargesStep[RechargesSlide.amount]
    },
    [RechargesSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'RECHARGES.CONFIRMATION_STEP.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.RECHARGE'
      },
      step: RechargesStep[RechargesSlide.confirmation]
    }
  };
}
