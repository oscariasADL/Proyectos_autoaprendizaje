import { SideMenuItem } from '@commons/components/side-menu/entities/side-menu.interface';
import {
  CARE_CHANNELS,
  CHANGE_PASSWORD,
  DOCUMENTS,
  ONBOARDING,
  POCKETS,
  SECURITY_HOME,
  SUPPORT
} from '@commons/constants/navigate.constants';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

export const SIDE_MENU_LIST: SideMenuItem[] = [
  /*{
    label: 'Contactos',
    icon: 'icon-grupo',
    url: CONTACTS,
    id: 'side-menu-contacts'
  },*/
  {
    label: 'Bolsillos',
    icon: 'icon-bolsillos',
    url: POCKETS,
    id: 'side-menu-pockets',
    featureFlagKey: FeatureFlagsKey.Pockets
  },
  {
    label: 'Extractos y Certificados',
    icon: 'icon-extractos',
    url: DOCUMENTS,
    id: 'side-menu-extracts',
    featureFlagKey: FeatureFlagsKey.ExtractsAndDocuments
  },
  {
    label: 'Seguridad',
    icon: 'icon-seguridad2',
    url: SECURITY_HOME,
    id: 'side-menu-security',
    featureFlagKey: FeatureFlagsKey.Security
  },
  {
    label: 'Cambio de contraseña',
    icon: 'icon-seguridad',
    url: CHANGE_PASSWORD,
    id: 'side-menu-change-password',
    featureFlagKey: FeatureFlagsKey.ChangePassword
  },
  {
    label: 'Tour AV Villas App',
    icon: 'icon-celular',
    url: ONBOARDING,
    id: 'side-menu-onboarding',
    featureFlagKey: FeatureFlagsKey.OnBoarding
  },
  {
    label: 'Ayuda',
    icon: 'icon-informacion',
    url: SUPPORT,
    id: 'side-menu-onboarding',
    featureFlagKey: FeatureFlagsKey.Support
  },
  {
    label: 'Canales de atención',
    icon: 'icon-callcenter',
    url: CARE_CHANNELS,
    id: 'side-menu-onboarding',
    featureFlagKey: FeatureFlagsKey.CareChannels
  }
];
