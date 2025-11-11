import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { HOME } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import {
  DEFAULT_USE_QUOTA_INSTALLMENTS,
  USE_QUOTA_AVAILABLE_FIELD,
  USE_QUOTA_EXIT_DATA,
  USE_QUOTA_STEPS,
  UseQuotaSlide
} from '@modules/product-options/use-quota/constants/use-quota.constants';
import { useQuotaAmountValidators } from '@modules/product-options/use-quota/helpers/use-quota-validators.helpers';
import {
  mapUseQuotaConfirm,
  mapUseQuotaVoucher
} from '@modules/product-options/use-quota/mappers/use-quota-confirm.mapper';
import { mapUseQuotaPayload } from '@modules/product-options/use-quota/mappers/use-quota-payload.mapper';
import { mapUseQuotaSlides } from '@modules/product-options/use-quota/mappers/use-quota-slides.mapper';
import { UseQuotaService } from '@modules/product-options/use-quota/service/use-quota.service';
import { UseQuotaFacade } from '@modules/product-options/use-quota/use-quota.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';

@Component({
  selector: 'app-use-quota',
  templateUrl: './use-quota.page.html',
  styleUrls: ['./use-quota.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: UseQuotaSlide.toward,
    alternativeSlide: UseQuotaSlide.toward
  },
  {
    backUrl: HOME,
    steps: USE_QUOTA_STEPS,
    exitData: USE_QUOTA_EXIT_DATA,
    data: (component: UseQuotaPage) => mapUseQuotaSlides(component.form),
    confirmMapper: mapUseQuotaConfirm,
    voucherMapper: mapUseQuotaVoucher
  },
  {
    step: UseQuotaSlide.toward,
    field: USE_QUOTA_AVAILABLE_FIELD,
    activateField: false
  }
)
export class UseQuotaPage extends GenericStepperBase implements OnInit {
  constructor(
    protected injector: Injector,
    private facade: UseQuotaFacade,
    private useQuotaService: UseQuotaService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  public async setNextStep(data: any): Promise<void> {
    const { slide } = data;

    this.form.updateValueAndValidity();

    if (slide === UseQuotaSlide.toward) {
      this.genericStepperFacade.enableLoading();

      try {
        const { installments } = await this.useQuotaService
          .getInstallments(this.productSelected().id.toString())
          .toPromise();

        this.form.controls.installments.setValue(installments);
      } catch (e) {
        this.form.controls.installments.setValue(
          DEFAULT_USE_QUOTA_INSTALLMENTS
        );
      }

      this.form.updateValueAndValidity();

      this.data.amount.data.message = `<b>No. de cuotas:</b> ${this.form.value.installments}`;

      this.genericStepperFacade.disableLoading();
    }

    await super.setNextStep(data);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected()],
      towardProduct: [null, [Validators.required]],
      amount: [
        null,
        [Validators.required, useQuotaAmountValidators.bind(this)]
      ],
      installments: [null],
      fee: [null],
      confirmation: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.UseQuota,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperAction
  public useQuota(): void {
    if (this.form.valid) {
      this.facade.useQuota(
        mapUseQuotaPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
