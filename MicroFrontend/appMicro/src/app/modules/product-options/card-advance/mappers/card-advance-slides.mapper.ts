import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  CardAdvanceSlide,
  CardAdvanceStep
} from '@modules/product-options/card-advance/constants/card-advance.constants';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapCardAdvanceSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [CardAdvanceSlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'Elige la tarjeta',
        accountFilters: {
          typeAccountProduct: TypeAccount.CCA
        },
        accountType: ProductStyleType.creditCardForAdvance,
        control: form.get('fromProduct'),
        accountException: {
          title: 'No tienes una cuenta de ahorros o corriente disponible',
          description:
            'Te invitamos a abrir una cuenta desde nuestra Banca Virtual u oficina.'
        }
      },
      step: CardAdvanceStep[CardAdvanceSlide.from]
    },
    [CardAdvanceSlide.toward]: {
      type: SlideType.accounts,
      data: {
        title: 'Elige la cuenta destino',
        description:
          'Utiliza el cupo disponible para avances, enviándolo a tu cuenta AV Villas',
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
      step: CardAdvanceStep[CardAdvanceSlide.toward]
    },
    [CardAdvanceSlide.amount]: {
      type: SlideType.outlet,
      data: {
        outletName: 'amount'
      },
      step: CardAdvanceStep[CardAdvanceSlide.amount]
    },
    [CardAdvanceSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a hacer un avance',
        control: form.get('confirmation'),
        buttonText: 'ACTIONS.CARD_ADVANCE'
      },
      step: CardAdvanceStep[CardAdvanceSlide.confirmation]
    }
  };
}
