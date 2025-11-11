import { UntypedFormGroup } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { SocialSecuritySlide } from '@modules/payments/payment-social-security/constants/social-security.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';

export function mapSocialSecuritySlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [SocialSecuritySlide.from]: {
      type: SlideType.accounts,
      data: {
        title: 'Elige la cuenta de origen',
        accountFilters: {
          typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
          excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
        },
        accountException: {
          title:
            'No tienes productos disponibles en el banco para realizar pagos.',
          description:
            'Te invitamos a abrir una cuenta desde nuestra Banca Virtual u oficina.'
        },
        control: form.get('productOrigin')
      },
      step: SocialSecuritySlide.from
    },
    [SocialSecuritySlide.contributor]: {
      type: SlideType.outlet,
      data: {
        outletName: 'contributor'
      },
      step: SocialSecuritySlide.contributor
    },
    [SocialSecuritySlide.workSheet]: {
      type: SlideType.outlet,
      data: {
        outletName: 'workSheet'
      },
      step: SocialSecuritySlide.workSheet
    },
    [SocialSecuritySlide.value]: {
      type: SlideType.outlet,
      data: {
        outletName: 'value'
      },
      step: SocialSecuritySlide.value
    },
    [SocialSecuritySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a pagar',
        control: form.get('confirmation'),
        buttonText: 'Pagar'
      },
      step: SocialSecuritySlide.confirmation
    }
  };
}
