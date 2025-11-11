import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransferAvvAccountSlide,
  TransferAvvAccountStep
} from '../constants/transfers-avv-account.constants';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapTransfersAvvAccountSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransferAvvAccountSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.AVV_ACCOUNT.FROM.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        informationText: 'TRANSFERS.AVV_ACCOUNT.FROM.WHO_IS_IT',
        control: form.get('fromProduct')
      },
      step: TransferAvvAccountStep[TransferAvvAccountSlide.from]
    },
    [TransferAvvAccountSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'transfer-amount',
        title: 'TRANSFERS.AVV_ACCOUNT.AMOUNT.TITLE',
        type: AvvInputType.currency,
        label: 'TRANSFERS.AVV_ACCOUNT.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        showAccordionSourceDataStep: true,
        control: form.get('amount'),
        addenda: form.get('addenda')
      },
      step: TransferAvvAccountStep[TransferAvvAccountSlide.amount]
    },
    [TransferAvvAccountSlide.towardAccount]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward-account'
      },
      step: TransferAvvAccountStep[TransferAvvAccountSlide.towardAccount]
    },
    [TransferAvvAccountSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.AVV_ACCOUNT.CONFIRM.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.TRANSFER'
      },
      step: TransferAvvAccountStep[TransferAvvAccountSlide.confirmation]
    }
  };
}
