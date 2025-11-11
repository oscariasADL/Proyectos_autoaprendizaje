import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { UpdatePocketWithReturnsPayload } from '../../pocket-detail-with-returns/entities/pocket-detail.interface';
import { PocketWithReturns } from '@app/modules/pockets/entities/pockets.interface';
import {
  PocketDetailPayload,
  PocketWithReturnsDetailPayload
} from '../../pocket-detail/entities/pocket-detail.interface';

export function mapEditPocketWithReturnsPayload(
  values: any
): UpdatePocketWithReturnsPayload {
  const name: string = values.name.trim();
  const period: string = values.period.label.toString().toUpperCase();
  const pocketCategory: number = values.category.value;
  const goal: number = sanitizeCurrency(values.goal);
  const quota: number = sanitizeCurrency(values.quota);

  const {
    numberProduct: id,
    type,
    status,
    productIdParent,
    productTypeParent,
    renewAutomatically,
    renewProfits,
    pocketType
  } = values.pocket;

  return {
    id,
    goal,
    name,
    period,
    quota,
    pocketCategory,
    productIdParent,
    productTypeParent,
    status,
    type,
    renewAutomatically,
    renewProfits,
    pocketType
  };
}

export function mapPocketWithReturnsDetailPayload(
  pocket: PocketWithReturns
): PocketWithReturnsDetailPayload {
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
