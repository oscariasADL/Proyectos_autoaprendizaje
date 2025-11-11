import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  DetailTypePayment,
  PaymentCredit
} from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import {
  ActivationProduct,
  ActivationStatusDescription
} from '@modules/security/security-media-activation/entities/security-media.interface';
import find from 'lodash/find';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';
import {
  getAvalKey,
  getBrebKeys
} from '@app/modules/product/mappers/product-home.mapper';

export function mapProductDetailPayAction(
  product: ProductDetail,
  relativeId: string
): PaymentCredit {
  const minPaymentAmount = !isNullOrUndefined(product.minimumPayment)
    ? product.minimumPayment
    : product.nextPayment;
  const totalPaymentAmount = !isNullOrUndefined(product.expense)
    ? product.expense
    : product.forPayment;

  return {
    loanName: product.typeName,
    productType: product.type,
    productTypeDesc: product.typeName,
    numberProduct: product.numberProduct,
    relativeId,
    minPaymentAmount,
    minPaymentReducedAmount: product.minimumPaymentReduced,
    franchise: product.franchise,
    cardType: product.cardType,
    bankName: 'AV Villas',
    maxPaymentDate: product.dueDate,
    bankCode: product.bankCode,
    totalPaymentAmount,
    typePayment:
      product.type === TypeAccount.CCA
        ? DetailTypePayment.CREDIT_CARD_VILLAS
        : DetailTypePayment.AVAL_CREDITS_VILLAS
  };
}

export function mapProductDetailData(
  product: ProductDetail,
  nicknames: ProductNickname[],
  products: ActivationProduct[] = [],
  spiUserKeys: ProductSpiUserKey[]
): ProductDetail {
  if (isNullOrUndefined(product) || isNullOrUndefined(product?.id)) {
    return product;
  }
  const productNickname = find(nicknames, [
    'productRelativeId',
    product?.id?.toString()
  ]);

  const productSpiUserKeys = spiUserKeys.filter(
    (spi) => spi.numberProduct === product.numberProduct
  );

  const { avalTagKey, breBUserKeys } = getSpiUserKeys(productSpiUserKeys);

  return {
    ...product,
    nickname: !isNullOrUndefined(productNickname)
      ? productNickname?.nickname
      : product?.typeName,
    ...(product?.type === TypeAccount.CCA
      ? {
          isActive:
            products?.find(
              (item) => item?.id?.toString() === product?.id?.toString()
            )?.status === ActivationStatusDescription.ACTIVE
        }
      : {}),
    ...(hasSPIKeys(productSpiUserKeys)
      ? {
          avalTagKey,
          breBUserKeys
        }
      : {})
  };
}

function getSpiUserKeys(productSpiUserKeys: ProductSpiUserKey[]) {
  const avalTagKey = productSpiUserKeys && getAvalKey(productSpiUserKeys);
  const breBUserKeys = productSpiUserKeys && getBrebKeys(productSpiUserKeys);
  return { avalTagKey, breBUserKeys };
}

function hasSPIKeys(productSpiUserKeys: ProductSpiUserKey[]) {
  return productSpiUserKeys && productSpiUserKeys.length >= 1;
}
