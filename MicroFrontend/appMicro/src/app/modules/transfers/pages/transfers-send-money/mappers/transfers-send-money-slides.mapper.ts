import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransferSendMoneySlide,
  TransferSendMoneyStep
} from '../constants/transfers-send-money.constants';

export function mapTransfersSendMoneySlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransferSendMoneySlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.SEND_MONEY.FROM.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        informationText: 'TRANSFERS.SEND_MONEY.FROM.WHO_IS_IT',
        control: form.get('fromProduct')
      },
      step: TransferSendMoneyStep[TransferSendMoneySlide.from]
    },
    [TransferSendMoneySlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'transfer-amount',
        title: 'TRANSFERS.SEND_MONEY.AMOUNT.TITLE',
        type: AvvInputType.currency,
        label: 'TRANSFERS.SEND_MONEY.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        showAccordionSourceDataStep: true,
        control: form.get('amount'),
        addenda: form.get('addenda')
      },
      step: TransferSendMoneyStep[TransferSendMoneySlide.amount]
    },
    [TransferSendMoneySlide.towardCellPhone]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward-cell-phone'
      },
      step: TransferSendMoneyStep[TransferSendMoneySlide.towardCellPhone]
    },
    [TransferSendMoneySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.SEND_MONEY.CONFIRM.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.TRANSFER',
        message: 'TRANSFERS.SEND_MONEY.CONFIRM.MESSAGE_SEND_TRANSFIYA'
      },
      step: TransferSendMoneyStep[TransferSendMoneySlide.confirmation]
    }
  };
}
