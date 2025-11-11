import {
  CREDITS,
  SERVICES,
  SOCIAL_SECURITY,
  TAXES_PAY
} from '@commons/constants/navigate.constants';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

export const PAYMENT_LIST: AvvIconsBtnList[] = [
  {
    label: 'PAYMENTS.ITEMS.CREDITS_AND_CARDS',
    image: 'illustrationsV2/documento-y-tarjeta-regular.svg',
    url: CREDITS,
    id: 'btn-payments-credits',
    className: 'item-credit',
    featureFlagKey: FeatureFlagsKey.PaymentCreditsAndCards
  },
  {
    label: 'PAYMENTS.ITEMS.SERVICES',
    image: 'illustrationsV2/servicios-regular.svg',
    url: SERVICES,
    id: 'btn-payments-services',
    featureFlagKey: FeatureFlagsKey.PaymentServices
  },
  {
    label: 'PAYMENTS.ITEMS.TAXES',
    image: 'illustrationsV2/certificado-reporte.regular.svg',
    url: TAXES_PAY,
    id: 'btn-payments-taxes',
    featureFlagKey: FeatureFlagsKey.PaymentTaxes
  },
  {
    label: 'PAYMENTS.ITEMS.SOCIAL_SECURITY',
    image: 'illustrationsV2/seguridad-social-regular.svg',
    url: SOCIAL_SECURITY,
    id: 'btn-payments-security',
    featureFlagKey: FeatureFlagsKey.PaymentSocialSecurity
  }
];
