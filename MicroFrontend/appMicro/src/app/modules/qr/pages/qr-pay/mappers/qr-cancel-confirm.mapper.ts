import {
  VoucherItem,
  VoucherItemType
} from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { getProductType } from '@modules/product/helpers/product.helper';
import { QrData } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';

export function mapQrCancelConfirm(values: any): VoucherItem[] {
  const data: QrData = values.data;
  const fromProduct: Product = values.fromProduct;
  const installments: number = values.installments;

  const ticketFields = [
    ...(data?.netTrxAmount
      ? [
          `<span class="semi-bold">Valor</span><span>${this.currencyFormat.transform(
            data?.netTrxAmount
          )}</span>`
        ]
      : []),
    ...(data?.ivaValue
      ? [
          `<span class="semi-bold">Iva</span><span>${this.currencyFormat.transform(
            data?.ivaValue
          )}</span>`
        ]
      : []),
    ...(data?.incValue
      ? [
          `<span class="semi-bold">Inc</span><span>${this.currencyFormat.transform(
            data?.incValue
          )}</span>`
        ]
      : []),
    ...(data?.tipValue
      ? [
          `<span class="semi-bold">Propina</span><span>${this.currencyFormat.transform(
            data?.tipValue
          )}</span>`
        ]
      : []),
    ...(data?.totalTrxAmount
      ? [
          `<span class="semi-bold big">Valor total</span><span class="semi-bold big">${this.currencyFormat.transform(
            data?.totalTrxAmount
          )}</span>`
        ]
      : []),
    ...(!!installments
      ? [`<span class="small-opaque">No. de cuotas: ${installments}</span>`]
      : [])
  ];

  return [
    {
      id: 'toward',
      label: 'Comercio',
      fields: [data.merchantName]
    },
    {
      id: 'value',
      fields: ticketFields,
      type: VoucherItemType.MultipleItems
    },
    {
      id: 'from',
      label: 'Desde',
      fields: [
        `${getProductType(fromProduct)} ${
          fromProduct?.franchise
            ? fromProduct.franchise.toLocaleLowerCase()
            : ''
        } No. ${fromProduct.numberProduct}`
      ]
    },
    {
      id: 'cost',
      label: 'Costo',
      fields: [this.currencyFormat.transform(0)]
    }
  ];
}

export function mapQrCancelVoucher(values: any): VoucherItem[] {
  const data: QrData = values.data;
  const fromProduct: Product = values.fromProduct;
  const installments: number = values.installments;
  const date: string = values.date;

  const ticketFields = [
    ...(data?.netTrxAmount
      ? [
          `<span class="semi-bold">Valor</span><span>${this.currencyFormat.transform(
            data?.netTrxAmount
          )}</span>`
        ]
      : []),
    ...(data?.ivaValue
      ? [
          `<span class="semi-bold">Iva</span><span>${this.currencyFormat.transform(
            data?.ivaValue
          )}</span>`
        ]
      : []),
    ...(data?.incValue
      ? [
          `<span class="semi-bold">Inc</span><span>${this.currencyFormat.transform(
            data?.incValue
          )}</span>`
        ]
      : []),
    ...(data?.tipValue
      ? [
          `<span class="semi-bold">Propina</span><span>${this.currencyFormat.transform(
            data?.tipValue
          )}</span>`
        ]
      : []),
    ...(data?.totalTrxAmount
      ? [
          `<span class="semi-bold big">Valor total</span><span class="semi-bold big">${this.currencyFormat.transform(
            data?.totalTrxAmount
          )}</span>`
        ]
      : []),
    ...(!!installments
      ? [`<span class="small-opaque">No. de cuotas: ${installments}</span>`]
      : [])
  ];

  return [
    {
      id: 'commerce',
      label: 'Comercio',
      fields: [data.merchantName]
    },
    {
      id: 'value',
      fields: ticketFields,
      type: VoucherItemType.MultipleItems
    },
    {
      id: 'from',
      label: 'Desde',
      fields: [
        `${getProductType(fromProduct)} ${
          fromProduct?.franchise
            ? fromProduct.franchise.toLocaleLowerCase()
            : ''
        } No.${fromProduct.numberProduct}`
      ]
    },
    {
      id: 'date',
      label: 'Fecha',
      fields: [date]
    }
  ];
}
