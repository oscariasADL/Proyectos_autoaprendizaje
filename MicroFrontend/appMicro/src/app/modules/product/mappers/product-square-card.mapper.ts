import { sanitizeDate } from '@commons/helpers/text.helpers';
import {
  ProductBodyType,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function mapProductSquareCard(product: Product): Product {
  let data = {};

  if (!isNullOrUndefined(product)) {
    switch (product.accountType) {
      case TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS:
        const isAFC = product.type === TypeAccount.AFC;
        data = {
          productBodyType: ProductBodyType.available,
          bodyAvailableBalance: isAFC
            ? product.availableHomePurchase
            : product.availableBalance,
          bodyFirstText: isAFC ? 'Disponible vivienda' : 'Disponible',
          productAction: !isAFC ? 'Transferir' : null
        };
        break;
      case TypeProduct.ROTATING_CREDITS:
      case TypeProduct.MY_CREDIT_CARDS:
      case TypeProduct.MY_CREDITS:
        const isMyCredits = product.accountType === TypeProduct.MY_CREDITS;
        const hasMinimumPayment = isMyCredits
          ? !!product.nextPayment && !!product.expirationDate
          : product.minimumPayment > 0 && !!product.dueDate;

        if (hasMinimumPayment) {
          data = {
            productBodyType: ProductBodyType.information,
            bodyFirstText: 'Próximo pago',
            bodyFirstValue: isMyCredits
              ? product.nextPayment
              : product.minimumPayment,
            bodySecondText: 'Fecha de pago',
            bodySecondValue: isMyCredits
              ? sanitizeDate(product.expirationDate)
              : sanitizeDate(product.dueDate),
            productAction: 'Pagar'
          };
        } else {
          data = {
            productBodyType: ProductBodyType.progress,
            bodyFirstText: isMyCredits ? 'Deuda total' : 'Disponible',
            bodyFirstValue: isMyCredits
              ? product.availableBalance
              : product.availablePurchasesBalance,
            bodySecondText: 'Gastado',
            bodySecondValue: product.availableBarPercentage
          };
        }
        break;

      case TypeProduct.MY_CDT:
        data = {
          productBodyType: ProductBodyType.information,
          bodyFirstText: 'Valor',
          bodyFirstValue: product.startupValue,
          bodySecondText: 'Finalización',
          bodySecondValue: sanitizeDate(product.expirationDate)
        };
        break;
    }
  }

  return {
    ...product,
    ...data
  };
}
