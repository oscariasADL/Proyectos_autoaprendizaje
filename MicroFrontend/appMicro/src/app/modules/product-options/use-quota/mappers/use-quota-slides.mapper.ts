import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  UseQuotaSlide,
  UseQuotaStep
} from '@modules/product-options/use-quota/constants/use-quota.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapUseQuotaSlides(form: UntypedFormGroup): GenericStepperData {
  return {
    [UseQuotaSlide.toward]: {
      type: SlideType.accounts,
      data: {
        title: 'Elige la cuenta destino',
        description:
          'Utiliza el cupo disponible de tu Crédito Rotativo, enviándolo a tu cuenta AV Villas',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
        },
        accountException: {
          title: 'No tienes una cuenta de ahorros o corriente disponible',
          description:
            'Te invitamos a abrir una cuenta desde nuestra Banca Virtual u oficina.'
        },
        control: form.get('towardProduct')
      },
      step: UseQuotaStep[UseQuotaSlide.toward]
    },
    [UseQuotaSlide.amount]: {
      type: SlideType.field,
      data: {
        id: 'use-quota-amount',
        title: 'Ingresa el valor a transferir',
        type: AvvInputType.currency,
        label: 'Valor',
        buttonText: 'ACTIONS.CONTINUE',
        control: form.get('amount')
      },
      step: UseQuotaStep[UseQuotaSlide.amount]
    },
    [UseQuotaSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a usar el cupo',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.USE_QUOTA'
      },
      step: UseQuotaStep[UseQuotaSlide.confirmation]
    }
  };
}
