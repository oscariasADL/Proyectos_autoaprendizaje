import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransferContactSlide,
  TransferContactStep
} from '../constants/transfers-contacts.constants';

export function mapTransfersContactsSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransferContactSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.CONTACTS.FROM.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        informationText: 'TRANSFERS.CONTACTS.FROM.WHO_IS_IT',
        control: form.get('fromProduct')
      },
      step: TransferContactStep[TransferContactSlide.from]
    },
    [TransferContactSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'transfer-amount',
        title: 'TRANSFERS.CONTACTS.AMOUNT.TITLE',
        type: AvvInputType.currency,
        label: 'TRANSFERS.CONTACTS.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        showAccordionSourceDataStep: true,
        control: form.get('amount'),
        addenda: form.get('addenda')
      },
      step: TransferContactStep[TransferContactSlide.amount]
    },
    [TransferContactSlide.toward]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward'
      },
      step: TransferContactStep[TransferContactSlide.toward]
    },
    [TransferContactSlide.ownProducts]: {
      type: SlideType.outlet,
      data: {
        outletName: 'own'
      },
      step: TransferContactStep[TransferContactSlide.ownProducts]
    },
    [TransferContactSlide.contactProducts]: {
      type: SlideType.outlet,
      data: {
        outletName: 'contact-products'
      },
      step: TransferContactStep[TransferContactSlide.contactProducts]
    },
    [TransferContactSlide.contactProductType]: {
      type: SlideType.outlet,
      data: {
        outletName: 'contact-product-type'
      },
      step: TransferContactStep[TransferContactSlide.contactProductType]
    },
    [TransferContactSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.CONTACTS.CONFIRMATION.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.TRANSFER'
      },
      step: TransferContactStep[TransferContactSlide.confirmation]
    }
  };
}
