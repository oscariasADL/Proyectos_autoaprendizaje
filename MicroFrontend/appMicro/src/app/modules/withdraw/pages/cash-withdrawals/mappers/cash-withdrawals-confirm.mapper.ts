import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { getProductType } from '@modules/product/helpers/product.helper';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { CashWithdrawalsSlide } from '@modules/withdraw/pages/cash-withdrawals/constants/cash-withdrawals.constants';
import { getDate } from '@commons/helpers/general.helpers';

export function mapCashWithdrawalConfirm(values: any): VoucherItem[] {
  const productOrigin: Product = values.productOrigin;
  const cashWithdrawalChannel: string = values.cashWithdrawalChannel;
  const amount: string = values.amount;
  const fee: string = values.fee;
  const iva = parseInt(fee, 10) > 0 ? ' + IVA' : '';
  const costGmf = values.costGmf;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  const channel =
    cashWithdrawalChannel.toUpperCase() === ChannelType.ATM
      ? this.translate.instant('WITHDRAW.CHANNEL_TYPE.ATM')
      : this.translate.instant('WITHDRAW.CHANNEL_TYPE.CB');

  return [
    {
      id: 'amount-to-withdraw',
      label: this.translate.instant('Valor'),
      fields: [
        `${this.currencyFormat.transform(sanitizeCurrency(amount))}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ],
      edit: CashWithdrawalsSlide.amount
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
      edit: CashWithdrawalsSlide.productOrigin
    },
    {
      id: 'cashWithdrawalChannel',
      label: this.translate.instant('Dónde'),
      fields: [channel],
      edit: CashWithdrawalsSlide.cashWithdrawalChannel
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [`${this.currencyFormat.transform(sanitizeCurrency(fee))}${iva}`]
    }
  ];
}

export function mapCashWithdrawalVoucher(values: any): VoucherItem[] {
  const cashWithdrawalChannel: string = values.cashWithdrawalChannel;
  const amount: string = values.amount;
  const productOrigin: Product = values.productOrigin;

  const channel =
    cashWithdrawalChannel.toUpperCase() === ChannelType.ATM
      ? this.translate.instant('WITHDRAW.CHANNEL_TYPE.ATM')
      : this.translate.instant('WITHDRAW.CHANNEL_TYPE.CB');

  return [
    {
      id: 'amount-to-withdraw',
      label: this.translate.instant('Valor'),
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
      id: 'cashWithdrawalChannel',
      label: this.translate.instant('Dónde'),
      fields: [channel]
    },
    {
      id: 'cashWithdrawalDatetime',
      label: this.translate.instant('Fecha'),
      fields: [...getDate.bind(this)()]
    }
  ];
}
