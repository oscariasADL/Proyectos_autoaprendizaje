import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransferContactStep } from '@modules/transfers/pages/transfers-contacts/constants/transfers-contacts.constants';
import {
  TransferRequestMoneySlide,
  TransferRequestMoneyStep
} from '../constants/transfers-request-money.constants';

export function mapTransfersForRequestMoneySlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransferRequestMoneySlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.REQUEST_MONEY.FROM.TITLE',
        description: 'TRANSFERS.REQUEST_MONEY.FROM.DESCRIPTION',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        informationText: 'TRANSFERS.REQUEST_MONEY.FROM.WHO_IS_IT',
        control: form.get('fromProduct')
      },
      step: TransferRequestMoneyStep[TransferRequestMoneySlide.from]
    },
    [TransferRequestMoneySlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'transfer-amount',
        title: 'TRANSFERS.REQUEST_MONEY.AMOUNT.TITLE',
        type: AvvInputType.currency,
        label: 'TRANSFERS.REQUEST_MONEY.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        showAccordionSourceDataStep: true,
        control: form.get('amount'),
        addenda: form.get('addenda')
      },
      step: TransferContactStep[TransferRequestMoneySlide.amount]
    },
    [TransferRequestMoneySlide.toward]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward'
      },
      step: TransferContactStep[TransferRequestMoneySlide.toward]
    },
    [TransferRequestMoneySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.REQUEST_MONEY.CONFIRM.TITLE',
        control: form.get('confirmation'),
        message: 'TRANSFERS.REQUEST_MONEY.CONFIRM.MESSAGE',
        buttonText: 'TRANSFERS.REQUEST_MONEY.CONFIRM.BUTTON'
      },
      step: TransferRequestMoneyStep[TransferRequestMoneySlide.confirmation]
    }
  };
}
