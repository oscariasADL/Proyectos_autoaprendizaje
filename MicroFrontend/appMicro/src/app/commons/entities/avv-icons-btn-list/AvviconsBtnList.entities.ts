import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { TypeDocument } from '../product/type-document';
import { NavController } from '@ionic/angular';

export interface AvvIconsBtnList {
  label: string;
  image: string;
  className?: string;
  action?: (navCtrl: NavController) => Promise<boolean> | void;
  id?: string;
  disabled?: boolean;
  url?: string[];
  utag?: string;
  utagCategory?: string;
  featureFlagKey?: FeatureFlagsKey;
  isNew?: boolean;
  denyDocumentTypes?: TypeDocument[];
}
