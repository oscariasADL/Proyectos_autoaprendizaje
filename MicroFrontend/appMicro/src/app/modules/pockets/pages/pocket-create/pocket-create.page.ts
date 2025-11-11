import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { POCKETS } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  PERIODICITY,
  PERIODICITY_LABEL,
  Pocket
} from '@modules/pockets/entities/pockets.interface';
import {
  PocketCreateSlide,
  POCKET_CREATE_EXIT_DATA,
  POCKET_CREATE_STEPS
} from '@modules/pockets/pages/pocket-create/constants/pocket-create.constants';
import {
  pocketGoalValidators,
  pocketNameValidators,
  pocketOpenAmountValidators,
  pocketProductValidators,
  pocketQuotaValidators
} from '@modules/pockets/pages/pocket-create/helpers/pocket-create-validator.helpers';
import {
  mapPocketCreateConfirm,
  mapPocketCreateVoucher
} from '@modules/pockets/pages/pocket-create/mappers/pocket-create-confirm.mapper';
import { mapPocketCreatePayload } from '@modules/pockets/pages/pocket-create/mappers/pocket-create-payload.mapper';
import { mapPocketCreateSlides } from '@modules/pockets/pages/pocket-create/mappers/pocket-create-slides.mapper';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { ParameterType } from '@store/state/parameter.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapProductsToPockets } from '@modules/pockets/helpers/pocket.helpers';
import { Product } from '@commons/entities/product/product.interface';
import { ORGANIZER_POCKET_CONTINUE_CONFIG } from '../../constants/create.constants';

@Component({
  selector: 'app-pocket-create',
  templateUrl: './pocket-create.page.html',
  styleUrls: ['./pocket-create.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: PocketCreateSlide.data,
    alternativeSlide: PocketCreateSlide.data
  },
  {
    backUrl: POCKETS,
    steps: POCKET_CREATE_STEPS,
    exitData: POCKET_CREATE_EXIT_DATA,
    data: (component: PocketCreatePage) =>
      mapPocketCreateSlides(component.form),
    confirmMapper: mapPocketCreateConfirm,
    voucherMapper: mapPocketCreateVoucher
  }
)
export class PocketCreatePage extends GenericStepperBase implements OnInit {
  constructor(protected injector: Injector, private facade: PocketsFacade) {
    super(injector);
  }
  public readonly ORGANIZER_POCKET_CONTINUE_CONFIG =
    ORGANIZER_POCKET_CONTINUE_CONFIG;
  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.listenFieldsForCalculateInstallments();
  }

  protected async setConfirmationData(): Promise<void> {
    this.genericStepperFacade.enableLoading();
    this.genericStepperFacade.disableLoading();
    this.form.controls.confirmation.setValue(
      mapPocketCreateConfirm.bind(this, this.form.value)()
    );
    this.data[PocketCreateSlide.confirmation].data.advertisement =
      PERIODICITY_LABEL[this.form.get('period')?.value?.value];
    this.voucher = mapPocketCreateVoucher.bind(this, this.form.value)();
    this.nextStep(SlideType.confirmation);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      period: [PERIODICITY[0], [Validators.required]],
      category: [
        this.facade
          .parameterByKey(ParameterType.categoriesPockets)
          .currentValue()[0],
        [Validators.required]
      ],

      openAmount: [null, [pocketOpenAmountValidators.bind(this)]],
      name: [null, [Validators.required, pocketNameValidators.bind(this)]],
      goal: [null, [Validators.required, pocketGoalValidators.bind(this)]],
      quota: [null, [Validators.required, pocketQuotaValidators.bind(this)]],
      product: [
        null,
        [Validators.required, pocketProductValidators.bind(this)]
      ],
      accounts: [
        this.facade.products$.pipe(map(mapProductsToPockets)).currentValue()
      ],
      confirmation: [null],
      pocketCategories: [
        this.facade
          .parameterByKey(ParameterType.categoriesPockets)
          .currentValue()
      ],
      installments: [null],
      periodicity: [PERIODICITY]
    });
    this.facade.products$
      .pipe(map(mapProductsToPockets))
      .subscribe({
        next: (products) => {
          this.form.patchValue({
            product: products[0]
          });
        }
      })
      .unsubscribe();
  }

  private listenFieldsForCalculateInstallments(): void {
    ['goal', 'quota', 'openAmount'].forEach((key) =>
      this.form
        .get(key)
        .valueChanges.subscribe(() => this.calculateInstallments())
    );
  }

  private calculateInstallments(): void {
    const goal = this.form.get('goal');
    const quota = this.form.get('quota');
    const openAmount = this.form.get('openAmount');

    const installments =
      goal.currencyValue() > 0 &&
      quota.currencyValue() > 0 &&
      goal.valid &&
      quota.valid
        ? Math.ceil(
            (goal.currencyValue() - (openAmount.currencyValue() || 0)) /
              quota.currencyValue()
          )
        : 0;

    this.form
      .get('installments')
      .setValue(
        `<b>${this.translate.instant(
          'POCKETS.FIELDS.INSTALLMENTS_NUMBER'
        )}</b> ${installments}`
      );
  }

  @GenericStepperAction
  public createPocket(): void {
    if (this.form.valid) {
      this.facade.createPocket(
        mapPocketCreatePayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  get pockets$(): Observable<Pocket[]> {
    return this.facade.pockets$.pipe(map((data) => data.pockets));
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$.pipe(map(mapProductsToPockets));
  }
}
