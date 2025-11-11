import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  MoneyOrdersSlide,
  MoneyOrdersStep
} from '@modules/withdraw/pages/money-orders/constants/money-orders.constants';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapMoneyOrdersSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [MoneyOrdersSlide.productOrigin]: {
      type: SlideType.accounts,
      data: {
        title: 'WITHDRAW.MONEY_ORDERS.SLIDE.PRODUCT_ORIGIN.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'No tienes una cuenta de ahorros o corriente disponible',
          description:
            'Te invitamos a abrir una cuenta desde nuestra Banca Virtual u oficina.'
        },
        control: form.get('productOrigin')
      },
      step: MoneyOrdersStep[MoneyOrdersSlide.productOrigin]
    },

    [MoneyOrdersSlide.who]: {
      type: SlideType.field,
      data: {
        id: 'money-orders-who',
        title: 'WITHDRAW.MONEY_ORDERS.SLIDE.WHO.TITLE',
        description: '',
        type: AvvInputType.document,
        label: 'WITHDRAW.MONEY_ORDERS.SLIDE.WHO.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        control: form.get('who')
      },
      step: MoneyOrdersStep[MoneyOrdersSlide.who]
    },

    [MoneyOrdersSlide.moneyOrderChannel]: {
      type: SlideType.withdrawalChannels,
      data: {
        title: 'WITHDRAW.MONEY_ORDERS.SLIDE.MONEY_ORDER_CHANNEL.TITLE',
        control: form.get('moneyOrderChannel')
      },
      step: MoneyOrdersStep[MoneyOrdersSlide.moneyOrderChannel]
    },
    [MoneyOrdersSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'money-orders-amount',
        title: 'WITHDRAW.MONEY_ORDERS.SLIDE.AMOUNT.TITLE',
        description: 'WITHDRAW.MONEY_ORDERS.SLIDE.AMOUNT.DESCRIPTION',
        type: AvvInputType.currency,
        label: 'WITHDRAW.MONEY_ORDERS.SLIDE.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        control: form.get('amount')
      },
      step: MoneyOrdersStep[MoneyOrdersSlide.amount]
    },
    [MoneyOrdersSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        id: 'money-orders-amount-confirmation',
        messageType: 'list',
        messages: [
          'WITHDRAW.MONEY_ORDERS.SLIDE.CONFIRMATION.MESSAGES_1',
          'WITHDRAW.MONEY_ORDERS.SLIDE.CONFIRMATION.MESSAGES_2'
        ],
        title: 'WITHDRAW.MONEY_ORDERS.SLIDE.CONFIRMATION.TITLE',
        message: 'WITHDRAW.MONEY_ORDERS.SLIDE.CONFIRMATION.MESSAGE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.ORDER'
      },
      step: MoneyOrdersStep[MoneyOrdersSlide.confirmation]
    }
  };
}
