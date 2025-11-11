import {
  Balance,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeDate } from '@commons/helpers/text.helpers';
import { AvalProductItem } from '@modules/aval/entities/aval-product.interface';

export function mapAvalProductItems(
  product: Product,
  data: Balance
): AvalProductItem[] {
  switch (data.typeProduct) {
    case TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS:
      return [
        {
          label: 'Saldo total',
          value: product.balance.toString()
        },
        {
          label: 'Saldo en canje',
          value: product.pendingBalance.toString()
        }
      ];

    case TypeProduct.MY_CREDIT_CARDS:
      return [
        {
          label: 'Cupo total',
          value: product.creditLimit.toString()
        },
        {
          label: 'Disponible avances',
          value: product.availableAdvanceBalance.toString()
        },
        ...(product?.minimumPayment
          ? [
              {
                label: 'Pago mínimo',
                value: product.minimumPayment.toString()
              }
            ]
          : []),
        ...(product?.dueDate
          ? [
              {
                label: 'Fecha límite de pago',
                value: sanitizeDate(product.dueDate),
                isText: true,
                isEnd: !!product?.trmDay
              }
            ]
          : []),
        ...(product?.trmDay
          ? [
              {
                label: 'Pago en dólares',
                value:
                  '<span class="normal">TRM del día</span> $ ' +
                  Intl.NumberFormat('es-CO').format(product.trmDay),
                isText: true
              }
            ]
          : []),
        ...(product?.availableQuotaDollars
          ? [
              {
                label: 'Cupo disponible',
                value: product.availableQuotaDollars.toString()
              }
            ]
          : []),
        ...(product?.minimumPaymentDollars
          ? [
              {
                label: 'Pago mínimo',
                value: product.minimumPaymentDollars.toString()
              }
            ]
          : []),
        ...(product?.payDayLimitDollars && product?.minimumPaymentDollars
          ? [
              {
                label: 'Fecha límite de pago',
                value: sanitizeDate(product.payDayLimitDollars),
                isText: true
              }
            ]
          : []),
        ...(product?.fullPaymentDollars
          ? [
              {
                label: 'Pago total a la fecha',
                value: product.fullPaymentDollars.toString()
              }
            ]
          : [])
      ];

    case TypeProduct.ROTATING_CREDITS:
      return [
        {
          label: 'Cupo total',
          value: product.creditLimit.toString()
        },
        ...(product?.minimumPayment
          ? [
              {
                label: 'Próxima cuota',
                value: product.minimumPayment.toString()
              }
            ]
          : []),
        ...(product?.dueDate
          ? [
              {
                label: 'Fecha límite de pago',
                value: sanitizeDate(product.dueDate),
                isText: true
              }
            ]
          : [])
      ];

    case TypeProduct.MY_CREDITS:
      return [
        ...(product?.nextPayment && sanitizeDate(product?.expirationDate)
          ? [
              {
                label: 'Próximo pago',
                value: product.nextPayment
              }
            ]
          : []),
        ...(sanitizeDate(product?.expirationDate)
          ? [
              {
                label: 'Fecha de pago',
                value: sanitizeDate(product.expirationDate),
                isText: true
              }
            ]
          : [])
      ];

    case TypeProduct.MY_CDT:
      return [
        ...(product?.effectiveRate
          ? [
              {
                label: 'Tasa',
                value: product.effectiveRate + ' %',
                isText: true
              }
            ]
          : []),
        ...(sanitizeDate(product.expirationDate)
          ? [
              {
                label: 'Finalización',
                value: sanitizeDate(product.expirationDate),
                isText: true
              }
            ]
          : [])
      ];

    case TypeProduct.MANDATORY_PENSIONS:
      return product.portfolios
        .map((portfolio, index) => [
          {
            label: 'Saldo valorización',
            value: portfolio.valorizationBalance.toString()
          },
          {
            label: 'Tipo de portafolio',
            value: portfolio.name,
            isText: true
          },
          ...(portfolio?.unitValue
            ? [
                {
                  label: 'Valor unidad',
                  value: portfolio.unitValue.toString()
                }
              ]
            : []),
          ...(portfolio?.units
            ? [
                {
                  label: 'Unidades',
                  value: portfolio.units.toString()
                }
              ]
            : []),
          ...(index !== product.portfolios.length - 1
            ? [
                {
                  isEnd: true
                }
              ]
            : [])
        ])
        .reduce((beforeValue, value) => beforeValue.concat(value), []);

    case TypeProduct.VOLUNTARY_PENSIONS:
      return product.portfolios
        .map((portfolio, index) => [
          {
            label: 'Saldo valorización',
            value: portfolio.currentBalance.toString()
          },
          {
            label: 'Tipo de portafolio',
            value: portfolio.name,
            isText: true
          },
          ...(portfolio?.capital
            ? [
                {
                  label: 'Capital',
                  value: portfolio.capital.toString()
                }
              ]
            : []),
          ...(portfolio?.yields
            ? [
                {
                  label: 'Rendimientos',
                  value: portfolio.yields.toString()
                }
              ]
            : []),
          ...(portfolio?.benefit
            ? [
                {
                  label: 'Beneficio',
                  value: portfolio.benefit.toString()
                }
              ]
            : []),
          ...(portfolio?.unitValue
            ? [
                {
                  label: 'Valor unidad',
                  value: portfolio.unitValue.toString()
                }
              ]
            : []),
          ...(portfolio?.units
            ? [
                {
                  label: 'Unidades',
                  value: portfolio.units.toString()
                }
              ]
            : []),
          ...(index !== product.portfolios.length - 1
            ? [
                {
                  isEnd: true
                }
              ]
            : [])
        ])
        .reduce((beforeValue, value) => beforeValue.concat(value), []);

    case TypeProduct.CESANTIAS:
      return product.portfolios
        .map((portfolio, index) => [
          ...(portfolio?.id
            ? [
                {
                  label: 'Producto No.',
                  value: portfolio.id,
                  isText: true
                }
              ]
            : []),
          {
            label: 'Saldo valorización',
            value: portfolio.valorizationBalance.toString()
          },
          {
            label: 'Valor unidad',
            value: portfolio.unitValue.toString()
          },
          {
            label: 'Unidades',
            value: portfolio.units.toString()
          },
          {
            label: 'Saldo total',
            value: portfolio.totalBalance.toString()
          },
          ...(index !== product.portfolios.length - 1
            ? [
                {
                  isEnd: true
                }
              ]
            : [])
        ])
        .reduce((beforeValue, value) => beforeValue.concat(value), []);

    case TypeProduct.FACILPASS:
      return [];

    default:
      return [];
  }
}
