import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';

export function mapPocketEditPayload(values: any): UpdatePocketPayload {
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
    productTypeParent
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
    type
  };
}
