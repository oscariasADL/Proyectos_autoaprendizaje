import { OnboardingSlide } from '@modules/onboarding/entities/onboarding.entities';

export const INITIAL_ONBOARDING_SLIDER_OPTIONS = {
  initialSlide: 0,
  speed: 500
};

export const ONBOARDING_SLIDERS: OnboardingSlide[] = [
  {
    img: 'onboarding/onboarding-1.webp',
    title: 'ONBOARDING.SLIDE_1.TITLE',
    subtitle: 'ONBOARDING.SLIDE_1.SUBTITLE'
  },
  {
    img: 'onboarding/onboarding-2.webp',
    title: 'ONBOARDING.SLIDE_2.TITLE',
    subtitle: 'ONBOARDING.SLIDE_2.SUBTITLE'
  },
  {
    img: 'onboarding/onboarding-3.webp',
    title: 'ONBOARDING.SLIDE_3.TITLE',
    subtitle: 'ONBOARDING.SLIDE_3.SUBTITLE'
  },
  {
    img: 'onboarding/onboarding-4.webp',
    title: 'ONBOARDING.SLIDE_4.TITLE',
    subtitle: 'ONBOARDING.SLIDE_4.SUBTITLE'
  }
];

export const ONBOARDING_SLIDER_LENGTH = ONBOARDING_SLIDERS.length;
export const CLOSE_ONBOARDING_EVENT = 'close';
export const CONTINUE_ONBOARDING_EVENT = 'continue';
