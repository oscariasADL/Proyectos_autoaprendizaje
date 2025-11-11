import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  DebitPurchaseRotatingStep,
  DebitPurchaseSlide,
  DebitPurchaseStep
} from '../constants/debit-purchase.constants';

export function mapDebitPurchaseSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [DebitPurchaseSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'Elige la tarjeta',
        accountFilters: {
          typeAccountProduct: TypeAccount.CCA
        },
        accountType: ProductStyleType.creditCardForDebitPurchase,
        control: form.get('fromProduct')
      },
      step: DebitPurchaseStep[DebitPurchaseSlide.from]
    },
    [DebitPurchaseSlide.toward]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward'
      },
      step: DebitPurchaseStep[DebitPurchaseSlide.toward]
    },
    [DebitPurchaseSlide.amount]: {
      type: SlideType.form,
      data: {
        title: 'Ingresa el valor a comprar',
        id: 'debit-purchase-amount',
        form: [
          {
            id: 'debit-purchase-amount',
            type: AvvInputType.currency,
            label: 'Valor',
            name: 'amount',
            control: form.get('amount')
          },
          {
            id: 'debit-purchase-installments',
            type: AvvInputType.number,
            label: 'No. de cuotas',
            name: 'installments',
            control: form.get('installments'),
            message: 'DEBT_PURCHASE.INSTALLMENTS_STEP.MESSAGE'
          }
        ],
        buttonText: 'ACTIONS.CONTINUE'
      },
      step: DebitPurchaseStep[DebitPurchaseSlide.amount]
    },
    [DebitPurchaseSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a comprar cartera',
        control: form.get('confirmation'),
        buttonText: 'DEBT_PURCHASE.DEBT_PURCHASE'
      },
      step: DebitPurchaseStep[DebitPurchaseSlide.confirmation]
    }
  };
}

export function mapDebitPurchaseRotatingSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [DebitPurchaseSlide.toward]: {
      type: SlideType.form,
      data: {
        title: 'Ingresa los datos del producto a comprar',
        description: 'Unifica tus deudas en un solo Banco a una mejor tasa.',
        id: 'debit-purchase-toward',
        form: [
          {
            id: 'debit-purchase-bank',
            type: AvvInputType.text,
            label: 'Banco destino',
            name: 'bank',
            items: form.get('banksList').value,
            control: form.get('bank')
          },
          {
            id: 'debit-purchase-productNumber',
            type: AvvInputType.creditCard,
            label: 'No. de producto',
            name: 'account',
            franchiseIcon: true,
            control: form.get('account')
          }
        ],
        buttonText: 'ACTIONS.CONTINUE'
      },
      step: DebitPurchaseRotatingStep[DebitPurchaseSlide.toward]
    },
    [DebitPurchaseSlide.amount]: {
      type: SlideType.form,
      data: {
        title: 'Ingresa el valor a comprar',
        id: 'debit-purchase-amount',
        form: [
          {
            id: 'debit-purchase-amount',
            type: AvvInputType.currency,
            label: 'Valor',
            name: 'amount',
            control: form.get('amount')
          }
        ],
        message:
          'Al finalizar la compra de cartera podrás consultar el número de cuotas en tus movimientos',
        buttonText: 'ACTIONS.CONTINUE'
      },
      step: DebitPurchaseRotatingStep[DebitPurchaseSlide.amount]
    },
    [DebitPurchaseSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a comprar cartera',
        control: form.get('confirmation'),
        buttonText: 'DEBT_PURCHASE.DEBT_PURCHASE'
      },
      step: DebitPurchaseRotatingStep[DebitPurchaseSlide.confirmation]
    }
  };
}
