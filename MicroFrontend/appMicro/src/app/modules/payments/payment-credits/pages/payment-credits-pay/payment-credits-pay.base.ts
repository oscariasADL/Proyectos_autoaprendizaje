import { Injector } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TypeAccount } from '@commons/entities/product/type-account';
import { resetControl } from '@commons/utils/forms';
import { PayLoanSlide } from '@modules/payments/payment-credits/constants/pay-loan.constants';
import { PayLoanAmountType } from '@modules/payments/payment-credits/entities/pay-loan.interface';
import { PaymentCreditsFacade } from '@modules/payments/payment-credits/payment-credits.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';

export class PaymentCreditsPayBase extends GenericStepperBase {
  protected facade: PaymentCreditsFacade;

  constructor(protected injector: Injector) {
    super(injector);
    this.facade = this.injector.get<PaymentCreditsFacade>(PaymentCreditsFacade);
  }

  public async setNextStep(data: any): Promise<void> {
    const { slide } = data;
    this.form.updateValueAndValidity();

    if (slide === PayLoanSlide.amount) {
      if (
        this.form.value.credit.productType === TypeAccount.DLA &&
        this.form.value.activeType === PayLoanAmountType.otherValue
      ) {
        this.nextStep(PayLoanSlide.type);
      } else {
        resetControl(
          this.form.controls.paymentType as UntypedFormControl,
          true
        );
        await this.setConfirmationData(PayLoanSlide.confirmation);
      }
    } else {
      await super.setNextStep(data);
    }
  }
}
