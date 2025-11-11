import { TypeAccount } from '@commons/entities/product/type-account';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';

export interface RequestProductSlide {
  img: string;
  isImageSourceOnline?: boolean; // TODO: Temporary until file migration
  btn: string;
  url: LinkKey | string;
  isExternal: boolean;
  id?: string;
  class?: string;
  title?: string;
  content?: string;
  accountTypesAllowed?: TypeAccount[]; // TODO temporal para pasar a parametros
  featureFlagKey?: FeatureFlagsKey;
}
