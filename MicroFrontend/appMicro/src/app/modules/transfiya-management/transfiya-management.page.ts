import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import {
  TRANSFIYA_MANAGEMENT_AVAILABLE_FIELD,
  TRANSFIYA_MANAGEMENT_EXIT_DATA,
  TRANSFIYA_MANAGEMENT_STEPS,
  TransfiyaManagementSlide
} from '@modules/transfiya-management/constants/transfiya-management.constants';
import { transfiyaManagementProductValidators } from '@modules/transfiya-management/helpers/transfiya-management-validators.helpers';
import {
  mapTransfiyaManagementConfirm,
  mapTransfiyaManagementVoucher
} from '@modules/transfiya-management/mappers/transfiya-management-confirm.mapper';
import {
  mapRejectTransfiyaManagementPayload,
  mapTransfiyaManagementPayload
} from '@modules/transfiya-management/mappers/transfiya-management-payload.mapper';
import { mapTransfiyaManagementSlides } from '@modules/transfiya-management/mappers/transfiya-management-slides.mapper';
import { TransfiyaManagementFacade } from '@modules/transfiya-management/transfiya-management.facade';
import { UserData } from '@commons/entities/auth/auth.entities';

@Component({
  selector: 'app-transfiya-management',
  templateUrl: './transfiya-management.page.html',
  styleUrls: ['./transfiya-management.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransfiyaManagementSlide.management.toString(),
    alternativeSlide: TransfiyaManagementSlide.management.toString()
  },
  {
    backUrl: HOME,
    steps: TRANSFIYA_MANAGEMENT_STEPS,
    exitData: TRANSFIYA_MANAGEMENT_EXIT_DATA,
    data: (component: TransfiyaManagementPage) =>
      mapTransfiyaManagementSlides.bind(component)(component.form),
    confirmMapper: mapTransfiyaManagementConfirm,
    voucherMapper: mapTransfiyaManagementVoucher
  },
  {
    step: TransfiyaManagementSlide.management.toString(),
    field: TRANSFIYA_MANAGEMENT_AVAILABLE_FIELD
  }
)
export class TransfiyaManagementPage
  extends GenericStepperBase
  implements OnInit
{
  constructor(
    protected injector: Injector,
    private route: ActivatedRoute,
    private facade: TransfiyaManagementFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      products: [this.facade.products$.currentValue()],
      productSelected: [
        this.productSelected(),
        [Validators.required, transfiyaManagementProductValidators.bind(this)]
      ],
      notification: [this.notification],
      isDispatch: this.isDispatch,
      nickname: [null],
      isDefaultAccount: [false],
      fee: [null],
      costGmf: [null],
      confirmation: [null],
      userData: [this.userData]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('productSelected').value;
    return {
      transactionId: TransactionCostIds.TransfiyaManagement,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperAction
  public acceptTransfiyaAuthorization(): void {
    if (this.form.valid) {
      this.facade.acceptTransfiyaAuthorization(
        mapTransfiyaManagementPayload(this.form.value),
        this.alertStepData(),
        this.isRequest
      );
    }
  }

  public rejectTransfiyaAuthorization(): void {
    this.facade.rejectTransfiyaAuthorization(
      mapRejectTransfiyaManagementPayload(this.form.value),
      this.alertStepData(),
      this.isRequest
    );
  }

  get isRequest(): boolean {
    return this.notification.isRequest;
  }

  get notification(): TransfiyaAuthorizationItem {
    return this.facade
      .getTransfiyaNotificationById$(this.params.notification_id)
      .currentValue();
  }

  get isDispatch(): boolean {
    return this.params.notification_type === 'dispatch';
  }

  get params(): Params {
    return this.route.snapshot.params;
  }

  get userData(): UserData {
    return this.facade.userData$.currentValue() as UserData;
  }
}
