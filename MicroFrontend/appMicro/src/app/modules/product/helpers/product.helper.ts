import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  FRANCHISE_IMAGES,
  FRANCHISE_TYPE_NAME
} from '@commons/constants/card.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { environment as ENV } from '@environment';
import { TagAvalPopoverComponent } from '../components/product-card/tag-aval-popover/tag-aval-popover.component';
import { PopoverController } from '@ionic/angular';
import {
  ProductSpiUserKey,
  SpiKeyType,
  StatusDirectory,
  Tag
} from '../entities/product-spi-user-key';
import { ProductDetail } from '@app/modules/product-detail/entities/product-detail.entity';

export function getProductType(product: Product): string {
  switch (product.type) {
    case TypeAccount.SDA:
      return 'Ahorros';
    case TypeAccount.DDA:
      return 'Corriente';
    case TypeAccount.CCA:
      return 'Tarjeta';
    case TypeAccount.LOC:
      return 'Rotativo';
    case TypeAccount.FID:
      return 'Fiducia';
    default:
      return 'Ahorros';
  }
}

export function getFullProductType(product: Product): string {
  if (!product) {
    console.error('Product is undefined');
    return 'Ahorros';
  }

  if (product.type === undefined || product.type === null) {
    console.error('Product type is undefined');
    return 'Ahorros';
  }

  switch (product.type) {
    case TypeAccount.SDA:
      return 'Cuenta de Ahorros';
    case TypeAccount.DDA:
      return 'Cuenta Corriente';
    case TypeAccount.CCA:
      return 'Tarjeta de crédito';
    case TypeAccount.LOC:
      return 'Mi Crédito Rotativo';
    case TypeAccount.FID:
      return 'Fiducias o Fondos de inversión';
    default:
      return 'Ahorros';
  }
}

export function srcImgFranchise(value: string): string | null {
  const val = !isNullOrUndefined(value)
    ? parseInt(value.substring(0, 1), 10)
    : null;
  const valFranchise =
    val === 4
      ? FRANCHISE_IMAGES.VISA
      : val === 5
      ? FRANCHISE_IMAGES.MASTERCARD
      : null;
  return !isNullOrUndefined(valFranchise)
    ? ENV.resources.base_img + valFranchise
    : null;
}

export function srcImgFranchiseV2(franchise: string): string | null {
  const valFranchise =
    franchise === FRANCHISE_TYPE_NAME.VISA
      ? FRANCHISE_IMAGES.VISA
      : franchise === FRANCHISE_TYPE_NAME.MASTERCARD
      ? FRANCHISE_IMAGES.MASTERCARD
      : FRANCHISE_IMAGES.MASTERDEBIT;
  return !isNullOrUndefined(valFranchise)
    ? ENV.resources.base_img + valFranchise
    : null;
}

export function getFranchise(value: string): string {
  return value.startsWith('4')
    ? FRANCHISE_TYPE_NAME.VISA
    : value.startsWith('5')
    ? FRANCHISE_TYPE_NAME.MASTERCARD
    : 'unknown';
}

export async function showTagAvalPopover(
  ev: Event,
  popoverCtrl: PopoverController,
  popoverId: string,
  tagAval?: string,
  isAvalTag?: boolean
): Promise<void> {
  const { title, text } = getPopoverInformtion(isAvalTag);
  const popover = await popoverCtrl.create({
    id: popoverId,
    component: TagAvalPopoverComponent,
    componentProps: {
      tag: tagAval,
      isCustomizationEnabled: isAvalTag,
      title,
      text
    },
    cssClass: 'avv-popover',
    event: ev,
    translucent: true,
    mode: 'ios'
  });

  await popover.present();
}

function getPopoverInformtion(isAvalTag?: boolean) {
  const title: string = isAvalTag
    ? 'PRODUCT.SPI_KEYS.WHAT_IS_TAG_TITLE'
    : 'BRE_B.POPOVER.WHAT_IS_TAG_TITLE';
  const text: string = isAvalTag
    ? 'PRODUCT.SPI_KEYS.TAG_AVAL_DESCRIPTION'
    : 'BRE_B.POPOVER.BRE_B_DESCRIPTION';
  return { title, text };
}

export function isAvalTagPresent(product: Product | ProductDetail): boolean {
  const hasAvalTag = product.avalTagKey && product.avalTagKey.length >= 1;

  return hasAvalTag;
}
export function isBreBPresent(product: Product | ProductDetail): boolean {
  const hasBreB = product.breBUserKeys && product.breBUserKeys.length >= 1;

  return hasBreB;
}
export function isNotBreBKeyRegistered(keys: ProductSpiUserKey[]): boolean {
  if (!keys) {
    return true;
  }
  const hasNonRegisteredKey = keys.some(
    (productSpi) => productSpi.statusDirectory !== StatusDirectory.DICE
  );

  return hasNonRegisteredKey;
}
export function keysWithoutRegister(
  product: ProductSpiUserKey[]
): ProductSpiUserKey[] {
  if (!product) {
    return [];
  }
  const NonRegisteredKeys = product.filter(
    (productSpi) => productSpi.statusDirectory !== StatusDirectory.DICE
  );

  return NonRegisteredKeys;
}
export function getKeyPerAccount(product: Product): Tag | null {
  const hasAvalTag = isAvalTagPresent(product);
  const hasBreB = isBreBPresent(product);

  if (
    hasAvalTag &&
    Array.isArray(product.avalTagKey) &&
    product.avalTagKey.length > 0
  ) {
    return {
      type: product.avalTagKey[0].keyType,
      value: product.avalTagKey[0].keyId
    };
  }

  if (
    hasBreB &&
    Array.isArray(product.breBUserKeys) &&
    product.breBUserKeys.length > 0
  ) {
    return {
      type: product.breBUserKeys[0].keyType,
      value: product.breBUserKeys[0].keyId
    };
  }

  return null;
}

export function isAvalTag(item?: ProductSpiUserKey): boolean {
  return item?.keyType === SpiKeyType.AlphanumericIdentifier;
}
