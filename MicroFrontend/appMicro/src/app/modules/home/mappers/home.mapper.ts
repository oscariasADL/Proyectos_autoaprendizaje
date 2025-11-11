import {
  AlertComponentType,
  AlertSheetType,
  BigPictureAlertSheetProps,
  BigPictureMapperProps
} from '@app/commons/entities/alert/alert-sheet.entities';
import {
  Balance,
  PRODUCT_CATEGORIES,
  ProductBodyType,
  ProductCategory,
  ProductCategoryItem,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined, sanitizeDate } from '@commons/helpers/text.helpers';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import orderBy from 'lodash/orderBy';
import sortedUniq from 'lodash/uniq';

export function mapBalanceByCategory(
  balances: Balance[],
  category: ProductCategory = ProductCategory.all
): Product[] {
  if (!!!balances) {
    return null;
  }

  const getCategory = (typeProduct: TypeProduct): ProductCategory => {
    if (typeProduct === TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS) {
      return ProductCategory.accounts;
    } else if (typeProduct === TypeProduct.MY_CREDIT_CARDS) {
      return ProductCategory.cards;
    } else if (typeProduct === TypeProduct.MY_CDT) {
      return ProductCategory.cdt;
    } else if (
      typeProduct === TypeProduct.MY_CREDITS ||
      typeProduct === TypeProduct.ROTATING_CREDITS
    ) {
      return ProductCategory.credits;
    }
  };

  const filterCat = (balance: Balance, cate: ProductCategory) => {
    if (category === ProductCategory.all) {
      return true;
    } else if (cate === ProductCategory.accounts) {
      return balance.typeProduct === TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS;
    } else if (cate === ProductCategory.cards) {
      return balance.typeProduct === TypeProduct.MY_CREDIT_CARDS;
    } else if (cate === ProductCategory.cdt) {
      return balance.typeProduct === TypeProduct.MY_CDT;
    } else if (cate === ProductCategory.credits) {
      return (
        balance.typeProduct === TypeProduct.MY_CREDITS ||
        balance.typeProduct === TypeProduct.ROTATING_CREDITS
      );
    } else if (cate === ProductCategory.aval) {
      return balance.typeProduct === TypeProduct.TU_PLUS;
    }
    return false;
  };

  const bodyType = (balance: Balance, product: Product) => {
    let data = {};
    switch (balance.typeProduct) {
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
        const isMyCredits = balance.typeProduct === TypeProduct.MY_CREDITS;
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
    return data;
  };

  return balances
    .filter((balance: Balance) => filterCat(balance, category))
    .map((balance) =>
      balance.products.map((prod) => ({
        ...prod,
        balanceTypeProduct: balance.typeProduct,
        category: getCategory(balance.typeProduct),
        balanceTotal: balance.balanceTotal,
        ...bodyType(balance, prod)
      }))
    )
    .reduce(
      (prev, current) => [...prev, ...current],
      category === ProductCategory.all || category === ProductCategory.aval
        ? [
            /*{
accountType: null,
id: null,
numberProduct: '',
typeName: 'Productos Aval',
nameProduct: 'Productos Aval',
category: ProductCategory.aval,
balanceTypeProduct: TypeProduct.AVAL
}*/
          ]
        : []
    )
    .sort((a, b) =>
      a.balanceTypeProduct < b.balanceTypeProduct
        ? -1
        : a.balanceTypeProduct > b.balanceTypeProduct
        ? 1
        : 0
    );
}

export function mapCategories(balances: Balance[]): ProductCategoryItem[] {
  const typeProducts: TypeProduct[] = sortedUniq(
    balances
      .filter((item) => item.products.length > 0)
      .map((item) => item.typeProduct)
  );
  const categories: ProductCategory[] = [
    ...(typeProducts.includes(TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS)
      ? [ProductCategory.accounts]
      : []),
    ...(typeProducts.includes(TypeProduct.MY_CREDIT_CARDS)
      ? [ProductCategory.cards]
      : []),
    ...(typeProducts.includes(TypeProduct.MY_CDT) ? [ProductCategory.cdt] : []),
    ...(typeProducts.includes(TypeProduct.MY_CREDITS) ||
    typeProducts.includes(TypeProduct.ROTATING_CREDITS)
      ? [ProductCategory.credits]
      : []),
    ProductCategory.aval
  ];
  return PRODUCT_CATEGORIES.filter((item: ProductCategoryItem) =>
    categories.includes(item.type)
  );
}

export function mapBalanceOnlyCreditCard(
  balances: Balance[],
  state: Balance[]
): Balance[] {
  return state?.length === 0
    ? balances
    : state.map((product) => {
        if (product.typeProduct === TypeProduct.MY_CREDIT_CARDS) {
          return balances.find(
            (prod) => prod.typeProduct === TypeProduct.MY_CREDIT_CARDS
          );
        }
        return product;
      });
}

export function mapBalance(balances: Balance[]): Balance[] {
  return orderBy(
    balances.map((balance: Balance) => ({
      ...balance,
      products: balance.products.map((product: Product) => ({
        ...product,
        description: balance.description
      }))
    })),
    ['typeProduct'],
    ['asc']
  );
}

export function mapNicknames(
  balances: Balance[],
  nicknames: ProductNickname[]
): Balance[] {
  const productNicknames = new Map(
    nicknames.map((item) => [item.productRelativeId, item.nickname])
  );
  return balances.map((balance: Balance) => ({
    ...balance,
    products: balance.products.map((product: Product) => {
      const productNickname = productNicknames.get(product.id);
      return !isNullOrUndefined(productNickname)
        ? { ...product, nickname: productNickname }
        : product;
    })
  }));
}
export function mapHomeModalInfo(
  props: BigPictureMapperProps
): BigPictureAlertSheetProps {
  const {
    id,
    title,
    description,
    remoteImgUri,
    redirectTo,
    buttonText,
    navigateOnCloseUrl
  } = props;
  return {
    id,
    componentType: AlertComponentType.alertBigPicture,
    title,
    description,
    remoteImgUri,
    buttonText,
    redirectTo,
    navigateOnCloseUrl
  };
}
