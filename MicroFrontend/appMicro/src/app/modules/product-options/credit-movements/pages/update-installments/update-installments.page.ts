import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { HOME } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { InformationService } from '@commons/services/information.service';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import {
  UpdateInstallmentsSlide,
  UPDATE_INSTALLMENTS_EXIT_DATA,
  UPDATE_INSTALLMENTS_INFO_ALERT,
  UPDATE_INSTALLMENTS_STEPS
} from '@modules/product-options/credit-movements/pages/update-installments/constants/update-installments.constants';
import { updateInstallmentsFieldValidators } from '@modules/product-options/credit-movements/pages/update-installments/helpers/update-installments-validators.helpers';
import {
  mapUpdateInstallmentsConfirm,
  mapUpdateInstallmentsVoucher
} from '@modules/product-options/credit-movements/pages/update-installments/mappers/update-installments-confirm.mapper';
import { mapUpdateInstallmentsPayload } from '@modules/product-options/credit-movements/pages/update-installments/mappers/update-installments-payload.mapper';
import { mapUpdateInstallmentsSlides } from '@modules/product-options/credit-movements/pages/update-installments/mappers/update-installments-slides.mapper';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { GroupedCreditMovements } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { groupMovements } from '@modules/product-options/credit-movements/pipes/group-movements';

@Component({
  selector: 'app-update-installments',
  templateUrl: './update-installments.page.html',
  styleUrls: ['./update-installments.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: UpdateInstallmentsSlide.movement.toString(),
    alternativeSlide: UpdateInstallmentsSlide.movement.toString()
  },
  {
    backUrl: HOME,
    steps: UPDATE_INSTALLMENTS_STEPS,
    exitData: UPDATE_INSTALLMENTS_EXIT_DATA,
    data: (component: UpdateInstallmentsPage) =>
      mapUpdateInstallmentsSlides(component.form),
    confirmMapper: mapUpdateInstallmentsConfirm,
    voucherMapper: mapUpdateInstallmentsVoucher
  }
)
export class UpdateInstallmentsPage
  extends GenericStepperBase
  implements OnInit
{
  public readonly creditMovements$: Observable<GroupedCreditMovements[]> =
    this.facade.creditMovements$.pipe(groupMovements());

  constructor(
    protected injector: Injector,
    private facade: CreditMovementsFacade,
    private informationService: InformationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.informationService.showPanelIfNecessary(
      UPDATE_INSTALLMENTS_INFO_ALERT
    );
  }

  public async showInformation(): Promise<void> {
    await this.informationService.showPanel(UPDATE_INSTALLMENTS_INFO_ALERT);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      installments: [null, [Validators.required]],
      fromProduct: [this.productSelected(), [Validators.required]],
      movement: [null, [Validators.required]],
      fee: [0],
      confirmation: [null],
      isDebitPurchase: [null]
    });
  }

  get validatorInstallmentField() {
    return updateInstallmentsFieldValidators.bind(this);
  }

  @GenericStepperAction
  public updateInstallments(): void {
    if (this.form.valid) {
      this.facade.updateInstallments(
        mapUpdateInstallmentsPayload(this.form.value),
        this.alertStepData()
      );
      this.nextStep(UpdateInstallmentsSlide.movement.toString());
      this.form.patchValue({
        installments: null,
        isDebitPurchase: null
      });
      this.installments.markAsUntouched();
    }
  }

  get installments(): AbstractControl {
    return this.form.get('installments');
  }

  get isDebitPurchase(): AbstractControl {
    return this.form.get('isDebitPurchase');
  }

  get movement(): AbstractControl {
    return this.form.get('movement');
  }
}
