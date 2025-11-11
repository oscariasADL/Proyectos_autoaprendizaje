import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

export interface MenuList {
  label: string;
  icon: string;
  title: string;
  url: string[];
  id: string;
  position: 'left' | 'right' | 'center';
  queryParams?: any;
  subMenuList?: SubMenuList[];
  featureFlagKey?: FeatureFlagsKey;
}

export interface SubMenuList
  extends Omit<MenuList, 'position' | 'subMenuList'> {
  titleDetail?: string;
  descriptionDetail?: string;
}
