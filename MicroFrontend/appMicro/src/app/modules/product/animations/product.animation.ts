import { Animation, createAnimation } from '@ionic/core';

export const tourEnterAnimation = (baseEl: HTMLElement): Animation => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const wrapperAnimation = createAnimation();

  backdropAnimation
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .addElement(baseEl.querySelector('ion-backdrop')!)
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
      'pointer-events': 'none'
    })
    .afterClearStyles(['pointer-events']);

  wrapperAnimation
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .addElement(baseEl.querySelector('.modal-wrapper')!)
    .beforeStyles({ transform: 'none' })
    .fromTo('opacity', 0, 1);

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .duration(280)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

export const tourLeaveAnimation = (baseEl: HTMLElement): Animation => {
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const wrapperAnimation = createAnimation();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wrapperEl = baseEl.querySelector('.modal-wrapper')!;

  backdropAnimation
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .addElement(baseEl.querySelector('ion-backdrop')!)
    .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);

  wrapperAnimation
    .addElement(wrapperEl)
    .beforeStyles({ transform: 'none' })
    .fromTo('opacity', 1, 0);

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.47,0,0.745,0.715)')
    .duration(200)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};
