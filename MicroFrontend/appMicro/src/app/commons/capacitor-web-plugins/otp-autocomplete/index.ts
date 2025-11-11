import { registerPlugin } from '@capacitor/core';
import type { OtpAutocompletePlugin } from './definitions';

const OtpAutocomplete = registerPlugin<OtpAutocompletePlugin>(
  'OtpAutocomplete',
  {
    web: () => import('./web').then((m) => new m.OtpAutocompletePluginWeb())
  }
);

export * from './definitions';
export { OtpAutocomplete };
