import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  TransferUnregisteredAccountsSlide,
  TransferUnregisteredAccountsStep
} from '../constants/transfers-unregistered-accounts.constants';

export function mapTransfersUnregisteredAccountsSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [TransferUnregisteredAccountsSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'TRANSFERS.UNREGISTER_ACCOUNTS.FROM.TITLE',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
        },
        accountException: {
          title: 'TRANSFERS.EXCEPTION.TITLE',
          description: 'TRANSFERS.EXCEPTION.DESCRIPTION'
        },
        informationText: 'TRANSFERS.UNREGISTER_ACCOUNTS.FROM.WHO_IS_IT',
        control: form.get('fromProduct')
      },
      step: TransferUnregisteredAccountsStep[
        TransferUnregisteredAccountsSlide.from
      ]
    },
    [TransferUnregisteredAccountsSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'transfer-amount',
        title: 'TRANSFERS.UNREGISTER_ACCOUNTS.AMOUNT.TITLE',
        type: AvvInputType.currency,
        label: 'TRANSFERS.UNREGISTER_ACCOUNTS.AMOUNT.LABEL',
        buttonText: 'ACTIONS.CONTINUE',
        showAccordionSourceDataStep: true,
        control: form.get('amount'),
        addenda: form.get('addenda')
      },
      step: TransferUnregisteredAccountsStep[
        TransferUnregisteredAccountsSlide.amount
      ]
    },
    [TransferUnregisteredAccountsSlide.to]: {
      type: SlideType.outlet,
      data: {
        outletName: 'to-who'
      },
      step: TransferUnregisteredAccountsStep[
        TransferUnregisteredAccountsSlide.to
      ]
    },
    [TransferUnregisteredAccountsSlide.towardAccount]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward-account'
      },
      step: TransferUnregisteredAccountsStep[
        TransferUnregisteredAccountsSlide.towardAccount
      ]
    },
    [TransferUnregisteredAccountsSlide.towardCellPhone]: {
      type: SlideType.outlet,
      data: {
        outletName: 'toward-cell-phone'
      },
      step: TransferUnregisteredAccountsStep[
        TransferUnregisteredAccountsSlide.towardCellPhone
      ]
    },
    [TransferUnregisteredAccountsSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'TRANSFERS.UNREGISTER_ACCOUNTS.CONFIRM.TITLE',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.TRANSFER'
      },
      step: TransferUnregisteredAccountsStep[
        TransferUnregisteredAccountsSlide.confirmation
      ]
    }
  };
}
