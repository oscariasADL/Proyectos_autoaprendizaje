import {
  ALTERNATIVE_CCA_TEXT,
  MEDIA_ACTIVATION_PASSWORD_SUCCESS,
  MEDIA_TEXT_INFO
} from '@modules/security/security-media-activation/constants/security-media-activation.constants';
import {
  ActivationProduct,
  MediaActivationData,
  MediaActivationType,
  ProductTypeActivation
} from '@modules/security/security-media-activation/entities/security-media.interface';

export function mapMediaTextInfo(product: ActivationProduct): string {
  switch (ProductTypeActivation[product.activationType]) {
    case ProductTypeActivation.R:
      return MEDIA_TEXT_INFO[ProductTypeActivation.R];
    case ProductTypeActivation.D:
    case ProductTypeActivation.M:
      return MEDIA_TEXT_INFO[ProductTypeActivation.M];
    case ProductTypeActivation.T:
    case ProductTypeActivation.V:
      return MEDIA_TEXT_INFO[ProductTypeActivation.T];
    default:
      return MEDIA_TEXT_INFO[ProductTypeActivation.T];
  }
}

export function mapMediaDataInfo(
  type: MediaActivationType,
  product: ActivationProduct
): MediaActivationData {
  return {
    ...MEDIA_ACTIVATION_PASSWORD_SUCCESS[
      type + (isCreditCardOrMasterDebit(product) ? ALTERNATIVE_CCA_TEXT : '')
    ],
    ...(type === MediaActivationType.BlockCard
      ? {
          description: mapMediaTextInfo(product)
        }
      : {})
  };
}

export function isCreditCardOrMasterDebit(product: ActivationProduct): boolean {
  const activationType = ProductTypeActivation[product?.activationType];

  return (
    activationType === ProductTypeActivation.R ||
    activationType === ProductTypeActivation.V ||
    activationType === ProductTypeActivation.T
  );
}
