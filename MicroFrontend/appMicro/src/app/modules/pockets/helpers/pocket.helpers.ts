import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import {
  PocketDetailPayload,
  PocketWithReturnsDetailPayload
} from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import find from 'lodash/find';
import { Product } from '@commons/entities/product/product.interface';
import { ProductsDropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

export function mapPocketDetailPayload(pocket: Pocket): PocketDetailPayload {
  const {
    numberProduct: pocketId,
    type: pocketType,
    productIdParent: parentAccountId,
    productTypeParent: parentAccountType
  } = pocket;

  return {
    pocketId,
    pocketType,
    parentId: parentAccountId,
    parentIdType: parentAccountType
  };
}

export function mapPocketWithReturnsDetailPayload(
  pocket: Pocket
): PocketWithReturnsDetailPayload {
  const {
    numberProduct: pocketId,
    type: pocketType,
    productIdParent: parentId,
    productTypeParent: parentIdType
  } = pocket;

  return {
    pocketId,
    pocketType,
    parentId,
    parentIdType
  };
}

export function mapPocketDetailData(
  pocket: Pocket,
  nicknames: ProductNickname[]
): Pocket {
  if (isNullOrUndefined(pocket)) {
    return pocket;
  }

  const productNickname = find(nicknames, [
    'productRelativeId',
    pocket.productIdParent.toString()
  ]);

  return {
    ...pocket,
    nickname: !isNullOrUndefined(productNickname)
      ? productNickname.nickname
      : pocket.productTypeParentDesc
  };
}

export function mapProductsToPockets(products: Product[]): Product[] {
  const ALLOWED_PRODUCT_TYPE_DETAIL: ProductTypeDetail[] = [
    ProductTypeDetail.PRM,
    ProductTypeDetail.DGT,
    ProductTypeDetail.DPT,
    ProductTypeDetail.VID,
    ProductTypeDetail.BAJ,
    ProductTypeDetail.MVL
  ];
  return products.filter(
    (product: Product) =>
      product.type === TypeAccount.SDA &&
      ALLOWED_PRODUCT_TYPE_DETAIL.includes(product.productTypeDetailKey)
  );
}
