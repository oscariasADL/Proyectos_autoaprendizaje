import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import {
  VoucherItem,
  VoucherItemType
} from '@commons/components/voucher/entities/voucher.entities';
import { TransferSlide } from '@modules/transfers/constants/transfers.constants';
import { payloadMapped } from '@modules/transfers/mappers/transfers-confirm.mapper';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import { TransferAvalKeySlide } from '@modules/transfers/pages/transfers-aval-key/constants/transfers-aval-key.constants';
import { mapSourceAccountsCel2cel } from '@modules/transfers/mappers/transfers-cel2cel.mapper';

export function mapFetchAccountAvalKeyError(error: {
  message: string;
}): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'fetch-account-aval-key-error-alert',
    title: 'TRANSFERS.AVAL_KEY.ALERT_ERROR_AVAL_KEY.TITLE',
    description: 'TRANSFERS.AVAL_KEY.ALERT_ERROR_AVAL_KEY.DESCRIPTION'
  };
}

export function mapTransfersAvalKeyConfirm(values: any): VoucherItem[] {
  const transferType = values.transferType;
  const note: string = values.addenda?.note;
  const fee =
    values.fee === 0 ? 'Gratis' : this.currencyFormat.transform(values.fee);

  return [
    {
      id: 'amount',
      label: 'TRANSFERS.STEPS.VALUE',
      fields: [
        this.currencyFormat.transform(this.form.controls.amount.currencyValue())
      ],
      edit: TransferAvalKeySlide.towardAvalKey
    },
    {
      id: 'toward',
      label: 'TRANSFERS.STEPS.TOWARD',
      fields: payloadMapped[transferType].bind(this, values)(),
      edit: TransferAvalKeySlide.towardAvalKey
    },
    {
      id: 'from',
      label: 'TRANSFERS.STEPS.FROM',
      fields: [...mapSourceAccountsCel2cel.bind(this, values)()],
      edit: TransferSlide.from
    },
    {
      id: 'cost',
      label: 'TRANSFERS.STEPS.COST',
      fields: [fee]
    },
    ...(!isNullOrUndefinedOrEmpty(note)
      ? [
          {
            id: 'note',
            label: 'TRANSFERS.STEPS.MESSAGE',
            fields: [note],
            type: VoucherItemType.Note,
            edit: TransferAvalKeySlide.towardAvalKey
          }
        ]
      : [])
  ];
}
