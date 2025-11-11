import { registerPlugin } from '@capacitor/core';
import type { StoreRatingPlugin } from './definitions';

const StoreRating = registerPlugin<StoreRatingPlugin>('StoreRating', {
  web: () => import('./web').then((m) => new m.StoreRatingPluginWeb())
});

export * from './definitions';
export { StoreRating };
