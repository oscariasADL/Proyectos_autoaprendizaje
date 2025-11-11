import { CreatePocketWithReturnsPayload } from '../entities/create-pocket.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { PocketTypeEnum } from '@app/modules/pockets/entities/pockets.interface';
import { Product } from '@app/commons/entities/product/product.interface';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export function mapCreatePocketWithReturnsPayload(
  values: any
): CreatePocketWithReturnsPayload {
  const name: string = values.name.trim();
  const product: Product = values.product;
  const period: string = values.periodicity.label.toUpperCase();
  const pocketCategory: number = values.category.value;
  const goal: number = sanitizeCurrency(values.goal);
  const quota: number = sanitizeCurrency(values.quota);
  const openAmount: number = sanitizeCurrency(values.openAmount) || 0;
  const renewAutomatically: boolean = values.renewPocket;
  const renewProfits: boolean = values.renewWithProfits;
  const termOfPermanenceInDays: number = values.period;

  return {
    period,
    openAmount: `${openAmount}`,
    name,
    goal,
    quota,
    productIdParent: product.id,
    productNumberParent: product.numberProduct,
    productTypeParent: product.type as TypeAccount,
    pocketCategory: `${pocketCategory}`,
    pocketType: PocketTypeEnum.PocketWithReturns,
    renewAutomatically,
    renewProfits,
    termOfPermanenceInDays
  };
}

export function mapCreatePocketWithReturnsResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'pocket-with-returns-create-success-alert',
    title: 'POCKETS.CREATE.SUCCESS',
    description: 'POCKETS.CREATE.AUTHORIZATION',
    reference: response.approvalId,
    denyDownload: true,
    items
  };
}
