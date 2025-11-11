import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransfersCel2celSlide,
  TransfersCel2celStep
} from '../constants/transfers-cel2cel-send.constants';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapTransfersCel2celSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransfersCel2celSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.AVV_PHONE.FROM.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        // informationText: 'TRANSFERS.AVV_PHONE.FROM.WHO_IS_IT',
        control: form.get('fromProduct'),
        utagCategory: 'a un celular'
      },
      step: TransfersCel2celStep[TransfersCel2celSlide.from]
    },
    [TransfersCel2celSlide.amount]: {
      type: SlideType.outlet,
      data: {
        outletName: 'amount'
      },
      step: TransfersCel2celStep[TransfersCel2celSlide.amount]
    },
    [TransfersCel2celSlide.bankToward]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward-bank'
      },
      step: TransfersCel2celStep[TransfersCel2celSlide.bankToward]
    },
    [TransfersCel2celSlide.confirmationCel2cel]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.CEL2CEL.SEND.STEPS.CONFIRMATION_TITLE', // 'TRANSFERS.AVV_PHONE.CONFIRM.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.TRANSFER',
        message: 'TRANSFERS.CEL2CEL.SEND.CONFIRMATION_MESSAGE',
        utag: 'enviar plata - confirma los datos de tu transferencia - transferir'
      },
      step: TransfersCel2celStep[TransfersCel2celSlide.confirmationCel2cel]
    }
  };
}
