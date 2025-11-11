import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransferAvvPhoneSlide,
  TransferAvvPhoneStep
} from '../constants/transfers-avv-phone.constants';

export function mapTransfersAvvPhoneSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransferAvvPhoneSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.AVV_PHONE.FROM.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        informationText: 'TRANSFERS.AVV_PHONE.FROM.WHO_IS_IT',
        control: form.get('fromProduct')
      },
      step: TransferAvvPhoneStep[TransferAvvPhoneSlide.from]
    },
    [TransferAvvPhoneSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'transfer-amount',
        title: 'TRANSFERS.AVV_PHONE.AMOUNT.TITLE',
        type: AvvInputType.currency,
        label: 'TRANSFERS.AVV_PHONE.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        showAccordionSourceDataStep: true,
        control: form.get('amount'),
        addenda: form.get('addenda')
      },
      step: TransferAvvPhoneStep[TransferAvvPhoneSlide.amount]
    },
    [TransferAvvPhoneSlide.towardCellPhone]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward-cell-phone'
      },
      step: TransferAvvPhoneStep[TransferAvvPhoneSlide.towardCellPhone]
    },
    [TransferAvvPhoneSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.AVV_PHONE.CONFIRM.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.TRANSFER',
        message: 'TRANSFERS.AVV_PHONE.CONFIRM.MESSAGE_SEND_TRANSFIYA'
      },
      step: TransferAvvPhoneStep[TransferAvvPhoneSlide.confirmation]
    }
  };
}
