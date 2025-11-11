import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  CashWithdrawalsSlide,
  CashWithdrawalsStep
} from '@modules/withdraw/pages/cash-withdrawals/constants/cash-withdrawals.constants';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapCashWithdrawalsSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [CashWithdrawalsSlide.productOrigin]: {
      type: SlideType.accounts,
      data: {
        title: 'WITHDRAW.WITHOUT_CARD.SLIDE.PRODUCT_ORIGIN.TITLE',
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
      step: CashWithdrawalsStep[CashWithdrawalsSlide.productOrigin]
    },
    [CashWithdrawalsSlide.cashWithdrawalChannel]: {
      type: SlideType.withdrawalChannels,
      data: {
        title: 'WITHDRAW.WITHOUT_CARD.SLIDE.CASH_WITHDRAWAL_CHANNEL.TITLE',
        control: form.get('cashWithdrawalChannel')
      },
      step: CashWithdrawalsStep[CashWithdrawalsSlide.cashWithdrawalChannel]
    },
    [CashWithdrawalsSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'cash-withdrawals-amount',
        title: 'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.TITLE',
        description: 'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.DESCRIPTION',
        type: AvvInputType.currency,
        label: 'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        control: form.get('amount')
      },
      step: CashWithdrawalsStep[CashWithdrawalsSlide.amount]
    },
    [CashWithdrawalsSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        id: 'cash-withdrawals-confirmation',
        messageType: 'list',
        messages: [
          '<b>En la confirmación verás la clave de retiro</b> que debes ingresar en el cajero junto con tu número de cédula.',
          'El retiro debes hacerlo antes de <b>60 MINUTOS</b>.'
        ],
        title: 'WITHDRAW.WITHOUT_CARD.SLIDE.CONFIRMATION.TITLE',
        message: 'WITHDRAW.WITHOUT_CARD.SLIDE.CONFIRMATION.MESSAGE',
        buttonText: 'ACTIONS.CONTINUE',
        control: form.get('confirmation')
      },
      step: CashWithdrawalsStep[CashWithdrawalsSlide.confirmation]
    }
  };
}
