import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';
import { BlockAccountTypeIds } from '@modules/product-options/block-account/constants/block-account.constants';

export const blockAccountFeatureName = 'blockAccountModuleState';

export type BlockAccountState = Readonly<{
  selectedProduct?: ProductDetail;
  productMedias?: ActivationProduct[] | null;
  blockAccountForm?: { relativeId: string; lockId: string };
  working?: boolean;
  completed?: boolean;
  message?: any;
  error?: any;
  response?: any;
}>;

export const initialBlockAccountState: BlockAccountState = {
  selectedProduct: null,
  productMedias: null,
  blockAccountForm: {
    relativeId: null,
    lockId: BlockAccountTypeIds.Stole
  },
  working: false,
  completed: false,
  message: null,
  error: false,
  response: null
};
