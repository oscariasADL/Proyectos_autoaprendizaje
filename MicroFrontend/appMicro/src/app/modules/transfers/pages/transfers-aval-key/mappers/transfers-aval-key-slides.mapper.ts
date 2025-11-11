import { FormGroup } from '@angular/forms';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransferAvalKeySlide,
  TransferAvalKeyStep
} from '@modules/transfers/pages/transfers-aval-key/constants/transfers-aval-key.constants';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapTransfersAvalKeySlides(form: FormGroup): GenericStepperData {
  return {
    [TransferAvalKeySlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.AVAL_KEY.STEPS.FROM_TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        informationText: 'TRANSFERS.AVAL_KEY.FROM.WHO_IS_IT',
        control: form.get('fromProduct')
      },
      step: TransferAvalKeyStep[TransferAvalKeySlide.from]
    },
    [TransferAvalKeySlide.towardAvalKey]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward-aval-key'
      },
      step: TransferAvalKeyStep[TransferAvalKeySlide.towardAvalKey]
    },
    [TransferAvalKeySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.AVAL_KEY.STEPS.CONFIRMATION_TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.TRANSFER',
        message: 'TRANSFERS.AVAL_KEY.STEPS.CONFIRMATION_MESSAGE',
        utag: 'enviar plata - confirma los datos de tu transferencia - transferir'
      },
      step: TransferAvalKeyStep[TransferAvalKeySlide.confirmation]
    }
  };
}
