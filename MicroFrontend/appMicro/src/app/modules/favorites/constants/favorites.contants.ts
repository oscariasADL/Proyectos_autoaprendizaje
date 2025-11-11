import { OnboardingSlide } from '@app/modules/onboarding/entities/onboarding.entities';
import {
  FavoriteUIConfig,
  IdentificationFavoriteType
} from '@modules/favorites/entities/favorites.interface';

export const FAVORITE_UI_CONFIG: Partial<
  Record<IdentificationFavoriteType, FavoriteUIConfig>
> = {
  [IdentificationFavoriteType.TRANSFER]: {
    title: 'FAVORITES.FAVORITES_TYPES.TRANSFER',
    icon: 'icon-giros_y_transferencias',
    bgColor: '#E2F9EF',
    textColor: '#00C783'
  },
  [IdentificationFavoriteType.RECHARGE]: {
    title: 'FAVORITES.FAVORITES_TYPES.RECHARGE',
    icon: 'icon-transferencia_celular',
    bgColor: '#D8A5F2',
    textColor: '#7F00C0'
  },
  [IdentificationFavoriteType.PAYMENT]: {
    title: 'FAVORITES.FAVORITES_TYPES.PAYMENT',
    icon: 'icon-credito_rotativo',
    bgColor: '#FFF1C6',
    textColor: '#FFB038'
  },
  [IdentificationFavoriteType.MONEY_ORDER]: {
    title: 'FAVORITES.FAVORITES_TYPES.MONEY_ORDER',
    icon: 'icon-credito_rotativo',
    bgColor: '#FDCED0',
    textColor: '#F04454'
  }
};

export const FAVORITE_TYPES_LABELS: Record<IdentificationFavoriteType, string> =
  {
    [IdentificationFavoriteType.TRANSFER]: 'FAVORITES.FAVORITES_TYPES.TRANSFER',
    [IdentificationFavoriteType.RECHARGE]: 'FAVORITES.FAVORITES_TYPES.RECHARGE',
    [IdentificationFavoriteType.PAYMENT]: 'FAVORITES.FAVORITES_TYPES.PAYMENT',
    [IdentificationFavoriteType.MONEY_ORDER]:
      'FAVORITES.FAVORITES_TYPES.MONEY_ORDER'
  };

export const FAVORITE_ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'favorite-slide-1',
    title: 'FAVORITES.ONBOARDING.SLIDES.SLIDE1.TITLE',
    img: '/assets/images/favorites/onboarding/favorite-slider-1.png',
    subtitle: 'FAVORITES.ONBOARDING.SLIDES.SLIDE1.DESCRIPTION'
  },
  {
    id: 'favorite-slide-2',
    title: 'FAVORITES.ONBOARDING.SLIDES.SLIDE2.TITLE',
    img: '/assets/images/favorites/onboarding/favorite-slider-2.png',
    subtitle: 'FAVORITES.ONBOARDING.SLIDES.SLIDE2.DESCRIPTION'
  }
];

export const FAVORITY_PHONE_PATH =
  '/assets/images/illustrations/favorites/favorite-phone.svg';
