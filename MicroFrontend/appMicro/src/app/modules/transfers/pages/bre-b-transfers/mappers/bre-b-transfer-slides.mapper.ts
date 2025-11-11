import { SlideType } from '@app/modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@app/modules/templates/generic-stepper/entities/generic-stepper.entity';
import {
  BreBTransfersSlide,
  BreBTransfersStep
} from '../constants/bre-b-transfers.constants';
import { UntypedFormGroup } from '@angular/forms';
import { VoucherItem } from '@app/commons/components/voucher/entities/voucher.entities';
import {
  mapBreBKey,
  mapSourceAccounts
} from '@app/modules/transfers/mappers/transfers-confirm.mapper';

export function mapBreBTransferSlides(
  form: UntypedFormGroup
): GenericStepperData {
  return {
    [BreBTransfersSlide.key]: {
      type: SlideType.outlet,
      data: {
        outletName: BreBTransfersSlide.key
      },
      step: BreBTransfersStep[BreBTransfersSlide.key]
    },
    [BreBTransfersSlide.data]: {
      type: SlideType.outlet,
      data: {
        outletName: BreBTransfersSlide.data
      },
      step: BreBTransfersStep[BreBTransfersSlide.data]
    },
    [BreBTransfersSlide.confirmation]: {
      type: SlideType.outlet,
      data: {
        outletName: BreBTransfersSlide.confirmation
      },
      step: BreBTransfersStep[BreBTransfersSlide.confirmation]
    }
  };
}

export function mapBreBTransferVoucher(values: any): VoucherItem[] {
  const fee: string = values.fee;
  const note: string = values.addenda.note;
  return [
    {
      id: 'amount',
      label: 'TRANSFERS.BRE_B.STEPS.VOUCHER.AMOUNT',
      fields: [
        this.currencyFormat.transform(this.form.controls.amount.currencyValue())
      ]
    },
    {
      id: 'to',
      label: 'TRANSFERS.BRE_B.STEPS.VOUCHER.TO',
      fields: mapBreBKey(values)
    },
    {
      id: 'from',
      label: 'TRANSFERS.BRE_B.STEPS.VOUCHER.FROM',
      fields: [...mapSourceAccounts.bind(this, values)()]
    },
    {
      id: 'fee',
      label: 'TRANSFERS.BRE_B.STEPS.VOUCHER.FEE',
      fields: [fee]
    },
    ...(!!note
      ? [
          {
            id: 'message',
            label: 'TRANSFERS.BRE_B.STEPS.VOUCHER.MESSAGE',
            fields: [note]
          }
        ]
      : [])
  ];
}
