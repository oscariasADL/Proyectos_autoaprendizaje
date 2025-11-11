import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import {
  POCKETS,
  POCKETS_DETAIL,
  POCKETS_WITH_RETURNS_DETAIL
} from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  Pocket,
  PocketsComplete,
  PocketTypeEnum,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import { mapPocketDetailPayload } from '@modules/pockets/helpers/pocket.helpers';
import {
  PocketTransferSlide,
  POCKET_TRANSFER_EXIT_DATA,
  POCKET_TRANSFER_STEPS,
  POCKET_TRANSFER_CONFIRM_ALERT
} from '@modules/pockets/pages/pocket-transfer/constants/pocket-transfer.constants';
import { pocketTransferAmountValidators } from '@modules/pockets/pages/pocket-transfer/helpers/pocket-transfer-validator.helpers';
import { mapPocketTransferConfirm } from '@modules/pockets/pages/pocket-transfer/mappers/pocket-transfer-confirm.mapper';
import { mapPocketTransferPayload } from '@modules/pockets/pages/pocket-transfer/mappers/pocket-transfer-payload.mapper';
import { mapPocketTransferSlides } from '@modules/pockets/pages/pocket-transfer/mappers/pocket-transfer-slides.mapper';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { POCKET_TYPE_PARAM } from '@modules/pockets/constants/pockets.constants';
import { AlertService } from '@commons/services/alert.service';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  TRANSFER_FROM_POCKETS,
  TRANSFER_FROM_POCKETS_CONFIRM
} from '../../constants/transfers.constants';

@Component({
  selector: 'app-pocket-transfer',
  templateUrl: './pocket-transfer.page.html',
  styleUrls: ['./pocket-transfer.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: PocketTransferSlide.transfer,
    alternativeSlide: PocketTransferSlide.transfer
  },
  {
    backUrl: (component: PocketTransferPage) =>
      component.backUrl$.currentValue(),
    steps: POCKET_TRANSFER_STEPS,
    exitData: POCKET_TRANSFER_EXIT_DATA,
    data: (component: PocketTransferPage) =>
      mapPocketTransferSlides(component.form),
    confirmMapper: mapPocketTransferConfirm,
    voucherMapper: null
  }
)
export class PocketTransferPage extends GenericStepperBase implements OnInit {
  public pocketTypeParam!: PocketTypeEnum;
  public readonly transferTag = TRANSFER_FROM_POCKETS;
  public readonly confirmTag = TRANSFER_FROM_POCKETS_CONFIRM;
  constructor(
    protected injector: Injector,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private facade: PocketsFacade,
    private modalCtrl: ModalController
  ) {
    super(injector);
    this.pocketTypeParam = this.route.snapshot.paramMap.get(
      POCKET_TYPE_PARAM
    ) as PocketTypeEnum;
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  protected async setConfirmationData(): Promise<void> {
    this.form.controls.confirmation.setValue(
      mapPocketTransferConfirm.bind(this, this.form.value)()
    );

    if (
      sanitizeCurrency(this.amount.value) ===
      this.pocket$.currentValue().amountSaved
    ) {
      this.data[PocketTransferSlide.confirmation].data.noticeInfo =
        this.translate.instant('POCKETS.TRANSFER.REMEMBER');
    } else {
      this.data[PocketTransferSlide.confirmation].data.noticeInfo = null;
    }

    this.nextStep(SlideType.confirmation);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      amount: [
        null,
        [Validators.required, pocketTransferAmountValidators.bind(this)]
      ],
      targetPocket: [null],
      pocket: [this.pocket$.currentValue()],
      isPocketProfitability: [this.isPocketProfitability],
      confirmation: [null]
    });
  }

  @GenericStepperAction
  public async transferPocket(): Promise<void> {
    if (!this.form.valid) return;
    if (this.isPocketProfitability && !(await this.confirmTransfer())) return;
    this.facade.transferPocket(
      mapPocketTransferPayload(this.form.value),
      mapPocketDetailPayload(this.pocket$.currentValue()),
      this.pocketTypeParam,
      sanitizeCurrency(this.amount.value) ===
        this.pocket$.currentValue().amountSaved
        ? POCKETS
        : this.backUrl$.currentValue()
    );
  }

  private async confirmTransfer(): Promise<boolean> {
    if (!this.alertService.alreadyPresent) {
      const response = await this.alertService.create({
        ...POCKET_TRANSFER_CONFIRM_ALERT,
        buttonsAction: [
          () => this.modalCtrl.dismiss(false),
          () => this.modalCtrl.dismiss(true)
        ]
      });
      return Promise.resolve(response);
    }
    return Promise.resolve(false);
  }

  get isPocketProfitability(): boolean {
    return this.pocketTypeParam === PocketTypeEnum.PocketWithReturns;
  }

  get backUrl$(): Observable<string[]> {
    const pathToRedirect =
      this.pocketTypeParam === PocketTypeEnum.PocketWithReturns
        ? POCKETS_WITH_RETURNS_DETAIL.toString()
        : POCKETS_DETAIL.toString();
    return this.pocket$.pipe(
      map((pocket: Pocket) => [
        pathToRedirect,
        pocket.productTypeParent,
        pocket.productIdParent,
        pocket.type,
        pocket.numberProduct
      ])
    );
  }

  get pocket$(): Observable<Pocket | PocketWithReturns> {
    return this.pocketTypeParam === PocketTypeEnum.TraditionalPocket
      ? this.facade.pocket$
      : this.facade.pocketWithReturns$;
  }

  get pockets$(): Observable<PocketsComplete> {
    return this.facade.pockets$;
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
