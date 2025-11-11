import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductActionType } from '@modules/product/entities/product-action.interface';

export interface Campaign {
  id: string;
  place: string[];
  title: string;
  description: string;
  linkKnowMore: {
    url: string;
    text: string;
    isExternal: boolean;
    action?: ProductActionType;
  };
  image: {
    url: string;
    urlAlt: string;
    alt: string;
  };
  backgroundColor: string;
  isActive: boolean;
  accountTypesAllowed?: TypeAccount[];
}

export interface MarketingCampaigns {
  campaigns: Campaign[];
}

export enum CampaignPlaces {
  PRODUCT_DETAIL = 'product-detail',
  ALERT_SHEET = 'alert-sheet'
}
