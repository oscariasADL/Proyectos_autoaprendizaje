/* eslint-disable max-lines */
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  capitalize,
  isNullOrUndefined,
  normalize,
  replaceWhiteSpaces,
  sanitizeDate
} from '@commons/helpers/text.helpers';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  ProductDetailData,
  ProductDetailItemType,
  SalaryAdvanceStatus
} from '@modules/product/entities/product-detail.interface';
import { isGreaterThanZero } from '@commons/utils/util';

export function mapProductDetail(product: ProductDetail): ProductDetailData {
  switch (product.type) {
    case TypeAccount.SDA:
      return {
        image: `cromalinesV2/avvillas-td-classic.svg`,
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Disponible',
            id: 'available-balance',
            value: product.availableBalance
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'En bolsillos',
            id: 'pockets-balance',
            value: product.inPockets
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Bloqueado',
            id: 'blocked-balance',
            value: product.blockedBalance
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'En canje',
            id: 'pending-balance',
            value: product.pendingBalance
          },
          {
            type: ProductDetailItemType.Main,
            label: 'Saldo total',
            id: 'total-balance',
            value: product.balance
          }
        ],
        ...(product?.hasSalaryAdvance
          ? {
              dropdownList: {
                title: 'Anticipo de nómina',
                list: [
                  {
                    type: ProductDetailItemType.Normal,
                    label: 'Aprobado',
                    id: 'salary-advance-approved',
                    value: product.salaryAdvanceApproved
                  },
                  {
                    type: ProductDetailItemType.ValueHighlighted,
                    label: 'Disponible',
                    id: 'salary-advance-available',
                    value: product.salaryAdvanceAvailable,
                    valueClass: 'semi-bold'
                  },
                  {
                    type: ProductDetailItemType.Normal,
                    label: 'Fecha anticipo',
                    id: 'salary-advance-date',
                    text: product.salaryAdvanceDate
                  },
                  {
                    type: ProductDetailItemType.Normal,
                    label: 'Días anticipo',
                    id: 'salary-advance-days',
                    text: product.salaryAdvanceDays
                  },
                  {
                    type: ProductDetailItemType.Normal,
                    label: 'Estado',
                    id: 'salary-advance-status',
                    text: capitalize(
                      SalaryAdvanceStatus[product.salaryAdvanceStatus]
                    ),
                    valueClass: `salary-advance-status-${product.salaryAdvanceStatus}`
                  }
                ]
              }
            }
          : {})
      };

    case TypeAccount.DDA:
      return {
        image: `cromalinesV2/avvillas-classic.svg`,
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Disponible',
            id: 'available-balance',
            value: product.availableBalance
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Bloqueado',
            id: 'blocked-balance',
            value: product.blockedBalance
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'En canje',
            id: 'pending-balance',
            value: product.pendingBalance
          },
          {
            type: ProductDetailItemType.Main,
            label: 'Saldo total',
            id: 'total-balance',
            value: product.currentBalance
          }
        ],
        ...(isGreaterThanZero(product.overdraftApprovedQuota) ||
        isGreaterThanZero(product.overdraftDays)
          ? {
              dropdownList: {
                title: 'Sobregiro',
                list: [
                  ...(isGreaterThanZero(product.overdraftApprovedQuota)
                    ? [
                        {
                          type: ProductDetailItemType.Normal,
                          label: 'Aprobado',
                          id: 'overdraft-approved-quota',
                          value: product.overdraftApprovedQuota
                        },
                        {
                          type: ProductDetailItemType.Normal,
                          label: 'Disponible',
                          id: 'available-overdraft',
                          value: product.availableOverdraft
                        }
                      ]
                    : []),
                  ...(!isNullOrUndefined(product.overdraftDate)
                    ? [
                        {
                          type: ProductDetailItemType.Normal,
                          label: 'Fecha sobregiro',
                          id: 'overdraft-date',
                          text: product.overdraftDate
                        }
                      ]
                    : []),
                  ...(isGreaterThanZero(product.overdraftDays)
                    ? [
                        {
                          type: ProductDetailItemType.Normal,
                          label: 'Días sobregiro',
                          id: 'overdraft-days',
                          text: product.overdraftDays
                        }
                      ]
                    : []),
                  ...(!isNullOrUndefined(product.overdraftStatus)
                    ? [
                        {
                          type: ProductDetailItemType.Normal,
                          label: 'Estado',
                          id: 'overdraft-status',
                          text: capitalize(
                            SalaryAdvanceStatus[product.overdraftStatus]
                          ),
                          valueClass: `salary-advance-status-${product.overdraftStatus}`
                        }
                      ]
                    : [])
                ]
              }
            }
          : {})
      };

    case TypeAccount.AFC:
      return {
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Disponible vivienda',
            id: 'available-home-purchase',
            value: product.availableHomePurchase
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Libre destino',
            id: 'free-destination-balance',
            value: product.freeDestinationBalance
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Rendimientos',
            id: 'yields',
            value: product.yields
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'En canje',
            id: 'pending-balance',
            value: product.others
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Retencion en la fuente',
            id: 'withholding',
            value: product.withholding
          },
          {
            type: ProductDetailItemType.Main,
            label: 'Saldo total',
            id: 'total-balance',
            value: product.balance
          }
        ]
      };

    case TypeAccount.CCA:
      return {
        image: `cromalinesV2/avvillas-tc-${normalize(
          replaceWhiteSpaces(product.cardType.toLowerCase())
        )}.svg`,
        franchise: `franchise-logos/${product.franchise.toLowerCase()}.svg`,
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.NormalBold,
            label: 'Disponible compras',
            id: 'available-purchase-balance',
            value: product.availablePurchasesBalance
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Disponible avances',
            id: 'available-advance-balance',
            value: product.availableAdvanceBalance
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Cupo gastado',
            id: 'outcomes',
            value: product.outcomes
          },
          ...(product?.purchasesPendingToApply > 0
            ? [
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Compras por aplicar',
                  id: 'billing-date',
                  value: product.purchasesPendingToApply
                }
              ]
            : []),
          {
            type: ProductDetailItemType.Normal,
            label: 'Fecha de corte',
            id: 'billing-date',
            text: sanitizeDate(product.billingDate),
            info:
              'Es el día del mes en el que el Banco hará el corte de lo que has gastado durante el mes y calculará ' +
              'el valor de la cuota que pagarás.'
          },
          {
            type: ProductDetailItemType.Main,
            label: 'Cupo total',
            id: 'credit-limit',
            value: product.creditLimit
          }
        ],
        quickList: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Total a pagar',
            id: 'total-payment',
            value: product.expense
          },
          ...(product.expense > 0
            ? [
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Mínimo a pagar',
                  id: 'minimum-payment',
                  value: product.minimumPayment
                },
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Pago mínimo reducido',
                  id: 'minimum-reduced-payment',
                  value: product.minimumPaymentReduced,
                  info: 'El pago mínimo reducido te ajustará el plazo a 36 cuotas en cada una de tus compras.'
                },
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Fecha límite de pago',
                  id: 'limit-payment-date',
                  text: sanitizeDate(product.dueDate)
                },
                {
                  type: ProductDetailItemType.Button,
                  label: 'Pagar mi tarjeta',
                  id: 'pay-credit-btn',
                  text: 'btn-detail-payment'
                }
              ]
            : [])
        ]
      };

    case TypeAccount.LOC:
      return {
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.NormalBold,
            label: 'Disponible para uso',
            id: 'available-balance',
            value: product.availableBalance
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Cupo gastado',
            id: 'outcomes',
            value: product.outcomes
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Fecha de corte',
            id: 'billing-date',
            text: product.billingDate
          },
          {
            type: ProductDetailItemType.Main,
            label: 'Cupo total',
            id: 'credit-limit',
            value: product.creditLimit
          }
        ],
        quickList: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Total a pagar',
            id: 'total-payment',
            value: product.expense
          },
          ...(product.expense > 0
            ? [
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Mínimo a pagar',
                  id: 'minimum-payment',
                  value: product.minimumPayment
                },
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Fecha límite de pago',
                  id: 'limit-payment-date',
                  text: sanitizeDate(product.dueDate)
                },
                {
                  type: ProductDetailItemType.Button,
                  label: 'Pagar mi crédito',
                  id: 'pay-credit-btn',
                  text: 'btn-detail-payment'
                }
              ]
            : [])
        ]
      };

    case TypeAccount.FID:
      const bankLabel = this.getBankLabel(product.bankCode);
      return {
        number: product.numberProduct,
        infoText: 'El saldo total corresponde al dia hábil anterior.',
        list: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Saldo total',
            id: 'total-balance',
            value: product.balance
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Disponible',
            id: 'available-balance',
            value: product.availableBalance
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Unidades',
            id: 'units',
            text: `${product.units}`
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Valor unidad',
            id: 'units',
            value: product.unitCost
          },
          ...(!isNullOrUndefined(bankLabel)
            ? [
                {
                  type: ProductDetailItemType.Opaque,
                  label: 'Entidad',
                  id: 'bank-label',
                  text: bankLabel.entidad,
                  hasDivider: true
                }
              ]
            : []),
          {
            type: ProductDetailItemType.Opaque,
            label: 'Fondo de inversión colectiva',
            id: 'collective-investment-found',
            text: `${product.typeName}`,
            hasDivider: !!!bankLabel?.entidad
          }
        ]
      };

    case TypeAccount.DLA:
      return {
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Saldo a capital',
            id: 'total-due',
            value: product.totalDue
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Fecha desembolso',
            id: 'delivered-date',
            text: sanitizeDate(product.deliveryDate)
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Saldo en mora',
            id: 'due-amount',
            value: product.dueAmount
          },
          ...(!isNullOrUndefined(product.purchaseOption)
            ? [
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Opción de compra',
                  id: 'purchase-option',
                  value: product.purchaseOption
                }
              ]
            : [])
        ],
        quickList: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Total a pagar',
            id: 'total-payment',
            value: product.forPayment
          },
          ...(product.forPayment > 0
            ? [
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Valor mínimo a pagar',
                  id: 'minimum-payment',
                  value: product.nextInstallment
                },
                {
                  type: ProductDetailItemType.Normal,
                  label: 'Fecha límite de pago',
                  id: 'limit-payment-date',
                  text: sanitizeDate(product.nextInstallmentDate)
                },
                ...(product.paidInstallments && product.agreedInstallments
                  ? [
                      {
                        type: ProductDetailItemType.Normal,
                        label: 'Cuotas pagadas',
                        id: 'paid-installments',
                        text: `${product.paidInstallments} de ${product.agreedInstallments}`,
                        hasDivider: true
                      }
                    ]
                  : []),
                {
                  type: ProductDetailItemType.Button,
                  label: 'Pagar crédito',
                  id: 'pay-credit-btn',
                  text: 'btn-detail-payment'
                }
              ]
            : [])
        ]
      };

    case TypeAccount.CDA:
      return {
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Inversión inicial',
            id: 'initial-investment',
            value: product.startupValue
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Rendimientos a hoy',
            id: 'interest',
            value: product.interest
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Valor de retención',
            id: 'retention',
            value: product.retention
          },
          {
            type: ProductDetailItemType.Main,
            label: 'Valor a recibir',
            id: 'total-balance',
            value: product.totalBalance
          }
        ],
        quickList: [
          {
            type: ProductDetailItemType.Normal,
            label: 'Plazo',
            id: 'terms',
            text: product.term
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Fecha de apertura',
            id: 'open-date',
            text: sanitizeDate(product.openDate)
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Fecha de vencimiento',
            id: 'expiration-date',
            text: sanitizeDate(product.expirationDate)
          },
          {
            type: ProductDetailItemType.Normal,
            label: 'Tasa de interés',
            id: 'interest-rate',
            text: `${product.pactedEffectiveRate}% E.A.`
          },
          {
            type: ProductDetailItemType.Opaque,
            label: 'Pago rendimientos',
            id: 'liquidation-method',
            text: product.liquidationMethod
          }
        ]
      };
    default:
      return {
        number: product.numberProduct,
        list: [
          {
            type: ProductDetailItemType.Main,
            label: 'Saldo total',
            id: 'total-balance',
            value: product.balance
          }
        ]
      };
  }
}
