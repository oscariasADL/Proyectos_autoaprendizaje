import {
  VoucherItem,
  VoucherItemType
} from '@commons/components/voucher/entities/voucher.entities';
import { getProductType } from '@modules/product/helpers/product.helper';
import {
  QR_PAY_AVAILABLE_FIELD,
  QrPaySlide
} from '@modules/qr/pages/qr-pay/constants/qr-pay.constants';
import { QrData } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

export function mapQrDynamicPayConfirm(values: any): VoucherItem[] {
  const data: QrData = values.data;
  const fromProduct = values.fromProduct;
  const installments: number = values.installments;
  const spiUserKey: TransferSpiUserKey = values.spiUserKey;
  const { costGmf } = values;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  const ticketFields = [
    ...(data?.netTrxAmount
      ? [
          `<span class="semi-bold">Valor</span><span>${this.currencyFormat.transform(
            data?.netTrxAmount
          )}</span>`,
          ...(costGmf
            ? [
                `<small class="small-opaque">${this.translate.instant(
                  'GMF.VALUE',
                  { value: gmfMapped }
                )} </small>`
              ]
            : [])
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
      : [])
  ];

  return [
    {
      id: 'toward',
      label: 'Hacia',
      fields: [spiUserKey.name]
    },
    {
      id: 'value',
      fields: ticketFields,
      type: VoucherItemType.MultipleItems,
      ...(!!installments ? { edit: QrPaySlide.installments } : {})
    },
    {
      id: 'from',
      label: 'Desde',
      fields: [
        `${
          fromProduct?.paymentType === 'debit'
            ? 'Tarjeta débito'
            : getProductType(fromProduct)
        } ${
          fromProduct?.franchise
            ? fromProduct.franchise.toLocaleLowerCase()
            : ''
        } No. ${fromProduct.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[QR_PAY_AVAILABLE_FIELD]
        )}`,
        ...(!!installments
          ? [
              `<small class="small-opaque">No. de cuotas: ${installments}</small>`
            ]
          : [])
      ],
      edit: QrPaySlide.data
    },
    {
      id: 'cost',
      label: 'Costo',
      fields: [this.currencyFormat.transform(0)]
    }
  ];
}

export function mapQrDynamicPayVoucher(values: any): VoucherItem[] {
  const data: QrData = values.data;
  const fromProduct = values.fromProduct;
  const installments: number = values.installments;
  const date: string = values.date;
  const spiUserKey: TransferSpiUserKey = values.spiUserKey;

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
      label: 'Hacia',
      fields: [spiUserKey.fullName]
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
        `${
          fromProduct?.paymentType === 'debit'
            ? 'Tarjeta débito'
            : getProductType(fromProduct)
        } ${
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

export function mapQrStaticPayConfirm(values: any): VoucherItem[] {
  const fromProduct = values.fromProduct;
  const installments: number = values.installments;
  const amount: number = sanitizeCurrency(values.amount);
  const spiUserKey: TransferSpiUserKey = values.spiUserKey;

  const { costGmf } = values;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  return [
    {
      id: 'value',
      label: 'Valor',
      fields: [
        this.currencyFormat.transform(amount),
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ],
      edit: QrPaySlide.data
    },
    {
      id: 'commerce',
      label: 'Hacia',
      fields: [spiUserKey.name]
    },
    {
      id: 'from',
      label: 'Desde',
      fields: [
        `${
          fromProduct?.paymentType === 'debit'
            ? 'Tarjeta débito'
            : getProductType(fromProduct)
        } ${
          fromProduct?.franchise
            ? fromProduct.franchise.toLocaleLowerCase()
            : ''
        } No. ${fromProduct.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[QR_PAY_AVAILABLE_FIELD]
        )}`,
        ...(!!installments
          ? [
              `<small class="small-opaque">No. de cuotas: ${installments}</small>`
            ]
          : [])
      ],
      edit: QrPaySlide.data
    },
    {
      id: 'cost',
      label: 'Costo',
      fields: [this.currencyFormat.transform(0)]
    }
  ];
}

export function mapQrStaticPayVoucher(values: any): VoucherItem[] {
  const fromProduct = values.fromProduct;
  const installments: number = values.installments;
  const amount: number = sanitizeCurrency(values.amount);
  const date: string = values.date;
  const spiUserKey: TransferSpiUserKey = values.spiUserKey;

  return [
    {
      id: 'value',
      label: 'Valor',
      fields: [this.currencyFormat.transform(amount)]
    },
    {
      id: 'commerce',
      label: 'Hacia',
      fields: [spiUserKey.fullName]
    },
    {
      id: 'from',
      label: 'Desde',
      fields: [
        `${
          fromProduct?.paymentType === 'debit'
            ? 'Tarjeta débito'
            : getProductType(fromProduct)
        } ${
          fromProduct?.franchise
            ? fromProduct.franchise.toLocaleLowerCase()
            : ''
        } No. ${fromProduct.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          fromProduct[QR_PAY_AVAILABLE_FIELD]
        )}`,
        ...(!!installments
          ? [
              `<small class="small-opaque">No. de cuotas: ${installments}</small>`
            ]
          : [])
      ]
    },
    {
      id: 'cost',
      label: 'Costo',
      fields: [this.currencyFormat.transform(0)]
    },
    {
      id: 'date',
      label: 'Fecha',
      fields: [date]
    }
  ];
}
