import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransfersCel2CelRequestSlide,
  TransfersCel2celRequestStep
} from '../constants/transfers-cel2cel-request.constants';

export function mapTransfersCel2celForRequestSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransfersCel2CelRequestSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.CEL2CEL.REQUEST.STEPS.ACCOUNTS_DATA_TITLE',
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
      step: TransfersCel2celRequestStep[TransfersCel2CelRequestSlide.from]
    },
    [TransfersCel2CelRequestSlide.amount]: {
      type: SlideType.outlet,
      data: {
        outletName: 'amount'
      },
      step: TransfersCel2celRequestStep[TransfersCel2CelRequestSlide.amount]
    },
    [TransfersCel2CelRequestSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.CEL2CEL.REQUEST.STEPS.CONFIRMATION_DATA_TITLE',
        control: form.get('confirmation'),
        message: 'TRANSFERS.REQUEST_MONEY.CONFIRM.MESSAGE',
        buttonText: 'TRANSFERS.REQUEST_MONEY.CONFIRM.BUTTON'
      },
      step: TransfersCel2celRequestStep[
        TransfersCel2CelRequestSlide.confirmation
      ]
    }
  };
}
