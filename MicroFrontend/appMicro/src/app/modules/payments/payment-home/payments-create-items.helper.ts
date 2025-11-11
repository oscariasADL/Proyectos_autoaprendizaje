import { NavController } from '@ionic/angular';
import {
  CREDITS,
  SERVICES,
  TAXES_PAY,
  SOCIAL_SECURITY,
  RECHARGES
} from '@commons/constants/navigate.constants';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { BaseButtonHelper } from '@app/commons/helpers/create-buttons-base.helper';

export class PaymentsCreateButtonHelper extends BaseButtonHelper {
  protected readonly BASE_BUTTONS: AvvIconsBtnList[] = [
    {
      label: 'PAYMENTS.ITEMS.CREDITS_AND_CARDS',
      image: 'illustrationsV2/documento-y-tarjeta-regular.svg',
      id: 'btn-payments-credits',
      featureFlagKey: FeatureFlagsKey.PaymentCreditsAndCards,
      url: CREDITS
    },
    {
      label: 'PAYMENTS.ITEMS.SERVICES',
      image: 'illustrationsV2/servicios-regular.svg',
      id: 'btn-payments-services',
      featureFlagKey: FeatureFlagsKey.PaymentServices,
      url: SERVICES
    },
    {
      label: 'PAYMENTS.ITEMS.TAXES',
      image: 'illustrationsV2/certificado-reporte.regular.svg',
      id: 'btn-payments-taxes',
      featureFlagKey: FeatureFlagsKey.PaymentTaxes,
      url: TAXES_PAY
    },
    {
      label: 'PAYMENTS.ITEMS.SOCIAL_SECURITY',
      image: 'illustrationsV2/seguridad-social-regular.svg',
      id: 'btn-payments-security',
      featureFlagKey: FeatureFlagsKey.PaymentSocialSecurity,
      url: SOCIAL_SECURITY
    }
  ];

  protected readonly ADDITIONAL_BUTTONS: AvvIconsBtnList[] = [
    {
      label: 'Recargas a celular',
      image: 'illustrationsV2/celular-dinero-regular.svg',
      featureFlagKey: FeatureFlagsKey.Recharges,
      id: 'btn-recharges-service',
      url: RECHARGES
    }
  ];
}
