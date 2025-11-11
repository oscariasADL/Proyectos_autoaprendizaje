import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { GenericStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { TypeAccount } from '@commons/entities/product/type-account';
import { TranslateService } from '@commons/services/translate.service';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.sass']
})
export class ConfirmationStepComponent implements AfterViewInit {
  @Input() data: GenericStepData;
  @Input() utagCategory: string | null = null;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cel2celFacade: TransfersCel2celFacade) {}

  get useTransfiya(): boolean {
    return (
      this.cel2celFacade.transfersCel2celUseTransfiya$.currentValue() ?? false
    );
  }

  ngAfterViewInit(): void {
    if (
      this.data?.formData?.credit?.productType === TypeAccount.CCA &&
      this.data?.control.value[0]?.fields[0] &&
      this.data?.formData?.credit?.minPaymentReducedAmount
    ) {
      const amount = parseInt(
        this.data.control.value[0]?.fields[0].replace(/\D/g, ''),
        10
      );
      this.data.noticeWarning = '';
      if (amount < this.data.formData?.credit?.minPaymentReducedAmount) {
        this.data.noticeWarning =
          'PAYMENTS.PAY_LOAN.CREDIT_CARD_LESS_THAN_MIN_REDUCE_PAY_NOTICE_WARNING';
      }
    }
  }
}
