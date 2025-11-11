import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

export interface SideMenuItem {
  label: string;
  icon: string;
  url: string[];
  id: string;
  featureFlagKey?: FeatureFlagsKey;
}
