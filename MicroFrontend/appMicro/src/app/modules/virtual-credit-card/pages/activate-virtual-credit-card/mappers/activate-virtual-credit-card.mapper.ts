import { FormGroup } from '@angular/forms';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  ACTIVATE_VIRTUAL_CREDIT_CARD_STEP,
  ActivateVirtualCreditCardSlide
} from '@modules/virtual-credit-card/pages/activate-virtual-credit-card/constants/activate-virtual-credit-card.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  ActivateVirtualCreditCardForm,
  ActivateVirtualCreditCardFormValue,
  VirtualCreditCardCreatePayload
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';

export function mapActivateDigitalDebitCardSlides(
  form: FormGroup
): GenericStepperData {
  return {
    [ActivateVirtualCreditCardSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'Productos',
        accountFilters: {
          typeAccountProducts: [TypeAccount.CCA]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        control: form.get('fromProduct')
      },
      step: ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[
        ActivateVirtualCreditCardSlide.from
      ]
    },
    [ActivateVirtualCreditCardSlide.config]: {
      type: SlideType.outlet,
      data: {
        title: 'Configurar',
        outletName: ActivateVirtualCreditCardSlide.config
      },
      step: ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[
        ActivateVirtualCreditCardSlide.config
      ]
    },
    [ActivateVirtualCreditCardSlide.confirm]: {
      type: SlideType.outlet,
      data: {
        title: 'Activar',
        outletName: ActivateVirtualCreditCardSlide.confirm
      },
      step: ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[
        ActivateVirtualCreditCardSlide.confirm
      ]
    }
  };
}

export function mapVirtualCreditCardCreatePayload(
  form: FormGroup<ActivateVirtualCreditCardForm>
): VirtualCreditCardCreatePayload {
  const { fromProduct } = form.value;
  const amount = form.get('amount');
  return {
    numberCreditCard: fromProduct.numberProduct,
    accType: fromProduct.type,
    amount: amount.currencyValue().toString()
  };
}
