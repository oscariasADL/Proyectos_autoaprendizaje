import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import {
  AVAL_TYPES,
  Balance,
  PRODUCT_TYPE_CATEGORIES,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  isNullOrUndefined,
  valueToNumberFormat
} from '@commons/helpers/text.helpers';
import { AvalStocks } from '@modules/aval/entities/stocks.interface';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';

export function mapProductsByTypeFilter(
  balances: Balance[],
  filter: number,
  tuplus: TuplusProduct,
  stocks: AvalStocks,
  digitalDebitCards: DigitalDebitCard[]
): Balance[] {
  if (isNullOrUndefined(balances) || isNullOrUndefined(filter)) {
    return null;
  }

  return [
    ...balances,
    ...tuplusCard(tuplus),
    ...stocksCard(stocks),
    ...digitalDebitCard(digitalDebitCards)
  ].filter((balance: Balance) =>
    filter !== TypeProduct.ALL
      ? filter === TypeProduct.AVAL
        ? AVAL_TYPES.includes(balance.typeProduct)
        : balance.typeProduct === filter
      : balance
  );
}

export function mapProductsTypeCategories(balances: Balance[]): DropdownList[] {
  if (isNullOrUndefined(balances)) {
    return null;
  }

  const categories: string[] = balances
    .filter((balance: Balance) => balance.products.length > 0)
    .map((balance: Balance) => balance.typeProduct.toString());

  categories.push(TypeProduct.ALL.toString());
  categories.push(TypeProduct.AVAL.toString());

  return PRODUCT_TYPE_CATEGORIES.filter((item) =>
    categories.includes(item.value)
  );
}

function tuplusCard(tuplus: TuplusProduct): Balance[] {
  return tuplus?.activeAfilliation.toString() === 'true'
    ? [
        {
          typeProduct: TypeProduct.TU_PLUS,
          name: 'Puntos tuplús',
          description: '',
          balanceTotal: 0,
          quantity: 1,
          flag: FeatureFlagsKey.TuPlus,
          products: [
            {
              type: TypeAccount.SDA,
              typeName: 'Total puntos hasta hoy',
              numberProduct: '',
              id: '0',
              accountType: 0,
              balance: 0,
              others: 0,
              availableBalance: valueToNumberFormat(tuplus?.totalPoints) as any,
              inPockets: 0,
              balanceForOrdering: 0,
              notEmpty: true,
              style: ProductStyleType.tuplusSummary
            }
          ],
          pointsPerBank: []
        }
      ]
    : [];
}

function stocksCard(stocks: AvalStocks): Balance[] {
  return stocks?.stockType?.length > 0
    ? [
        {
          typeProduct: TypeProduct.TU_PLUS,
          name: 'Acciones Aval',
          description: '',
          balanceTotal: 0,
          quantity: 1,
          products: [
            {
              type: TypeAccount.SDA,
              typeName: 'Consulta tus',
              numberProduct: '',
              id: '0',
              accountType: 0,
              balance: 0,
              others: 0,
              availableBalance: 'Acciones Aval' as any,
              inPockets: 0,
              balanceForOrdering: 0,
              notEmpty: true,
              style: ProductStyleType.stocksSummary
            }
          ],
          pointsPerBank: []
        }
      ]
    : [];
}

function digitalDebitCard(digitalDebitCards: DigitalDebitCard[]): Balance[] {
  return digitalDebitCards?.length > 0
    ? [
        {
          typeProduct: TypeProduct.DIGITAL_DEBIT_CARD,
          balanceTotal: 54999021,
          description: 'Cupo disponible',
          name: 'Tarjetas Débito Digital',
          products: digitalDebitCards.map((product) => ({
            ...product,
            type: TypeAccount.CCA,
            franchise: 'MASTERCARD',
            style: ProductStyleType.digitalDebitCard
          })),
          quantity: digitalDebitCards?.length,
          pointsPerBank: []
        }
      ]
    : [];
}
