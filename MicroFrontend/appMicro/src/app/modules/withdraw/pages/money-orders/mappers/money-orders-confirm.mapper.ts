import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { getProductType } from '@modules/product/helpers/product.helper';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { MoneyOrdersSlide } from '@modules/withdraw/pages/money-orders/constants/money-orders.constants';
import { getDate } from '@commons/helpers/general.helpers';

export function mapMoneyOrdersConfirm(values: any): VoucherItem[] {
  const productOrigin: Product = values.productOrigin;
  const who: string = values.who;
  const moneyOrderChannel: string = values.moneyOrderChannel;
  const amount: string = values.amount;
  const fee: string = values.fee;
  const iva = parseInt(fee, 10) > 0 ? ' + IVA' : '';
  const costGmf = this.form.controls.costGmf.currencyValue();
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  const channel =
    moneyOrderChannel.toUpperCase() === ChannelType.ATM
      ? this.translate.instant('WITHDRAW.CHANNEL_TYPE.ATM')
      : this.translate.instant('WITHDRAW.CHANNEL_TYPE.CB');

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [
        `${this.currencyFormat.transform(sanitizeCurrency(amount))}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ],

      edit: MoneyOrdersSlide.amount
    },
    {
      id: 'from',
      label: this.translate.instant('Desde'),
      fields: [
        `${getProductType(productOrigin)} No. ${productOrigin.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          productOrigin.availableBalance
        )}`
      ],
      edit: MoneyOrdersSlide.productOrigin
    },
    {
      id: 'documentNumber',
      label: this.translate.instant('Hacia'),
      fields: ['Documento No. ' + who],
      edit: MoneyOrdersSlide.who
    },
    {
      id: 'moneyOrderChannel',
      label: this.translate.instant('Dónde'),
      fields: [channel],
      edit: MoneyOrdersSlide.moneyOrderChannel
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [`${this.currencyFormat.transform(sanitizeCurrency(fee))}${iva}`]
    }
  ];
}

export function mapMoneyOrdersVoucher(values: any): VoucherItem[] {
  const who: string = values.who;
  const moneyOrderChannel: string = values.moneyOrderChannel;
  const amount: string = values.amount;
  const productOrigin: Product = values.productOrigin;

  const channel =
    moneyOrderChannel.toUpperCase() === ChannelType.ATM
      ? this.translate.instant('WITHDRAW.CHANNEL_TYPE.ATM')
      : this.translate.instant('WITHDRAW.CHANNEL_TYPE.CB');

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor a girar'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(amount))]
    },
    {
      id: 'from',
      label: this.translate.instant('Desde'),
      fields: [
        `${getProductType(productOrigin)} No. ${productOrigin.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          productOrigin.availableBalance
        )}`
      ]
    },
    {
      id: 'documentNumber',
      label: this.translate.instant('Hacia'),
      fields: ['Documento No. ' + who]
    },
    {
      id: 'moneyOrderChannel',
      label: this.translate.instant('Dónde'),
      fields: [channel]
    },
    {
      id: 'moneyOrderDatetime',
      label: this.translate.instant('Fecha'),
      fields: [...getDate.bind(this)()]
    }
  ];
}
