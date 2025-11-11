import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { POCKETS_DETAIL } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { Product } from '@commons/entities/product/product.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import {
  PERIODICITY,
  Pocket,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { ParameterType } from '@store/state/parameter.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  POCKET_EDIT_EXIT_DATA,
  POCKET_EDIT_STEPS,
  EditPocketWithReturnsSlide
} from './constants/edit-pocket-with-returns.constants';
import { mapPocketWithReturnsEditSlides } from './mappers/edit-pocket-with-returns-slides.mapper';
import {
  pocketEditGoalValidators,
  pocketEditNameValidators,
  pocketEditQuotaValidators
} from './helpers/edit-pocket-with-returns-validator.helpers';
import { PocketDetailWithReturnsFacade } from '../pocket-detail-with-returns/pocket-detail-with-returns.facade';
import {
  mapEditPocketWithReturnsPayload,
  mapPocketWithReturnsDetailPayload
} from './mappers/edit-pocket-with-returns-payload.mapper';
import { EditPocketWithReturnsFacade } from './store/edit-pocket-with-returns.facade';
import { NavController } from '@ionic/angular';
import {
  POCKET_EDIT_R_CONFIRM,
  POCKET_EDIT_R_CONTINUE
} from '../../constants/edit.constants';

@Component({
  selector: 'app-edit-pocket-with-returns',
  templateUrl: './edit-pocket-with-returns.page.html',
  styleUrls: ['./edit-pocket-with-returns.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: EditPocketWithReturnsSlide.update,
    alternativeSlide: EditPocketWithReturnsSlide.update
  },
  {
    backUrl: (component: EditPocketWithReturnsPage) =>
      component.backUrl$.currentValue(),
    steps: POCKET_EDIT_STEPS,
    exitData: POCKET_EDIT_EXIT_DATA,
    data: (component: EditPocketWithReturnsPage) =>
      mapPocketWithReturnsEditSlides(component.form),
    confirmMapper: () => [],
    voucherMapper: () => []
  }
)
export class EditPocketWithReturnsPage
  extends GenericStepperBase
  implements OnInit
{
  protected readonly editPocketWithReturnsSlide = EditPocketWithReturnsSlide;
  private currentPockets = this.facade.pockets$
    .pipe(map((data) => data.pockets))
    .currentValue();
  public readonly EDIT_POCKETS_TAG = POCKET_EDIT_R_CONTINUE;
  public readonly CONFIRM_EDIT_TAG = POCKET_EDIT_R_CONFIRM;
  constructor(
    protected injector: Injector,
    private pocketDetailWithReturnsFacade: PocketDetailWithReturnsFacade,
    private editPocketWithReturnsFacade: EditPocketWithReturnsFacade,
    private facade: PocketsFacade,
    private navCtrl: NavController
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  private initForm(): void {
    const pocket: Pocket = this.pocket$.currentValue();
    const pocketCategories: DropdownList[] =
      this.pocketCategories$.currentValue();
    const pocketCategory =
      pocketCategories.find(
        (item) => item.value.toString() === pocket?.pocketCategory.toString()
      ) || pocketCategories[0];
    const period = this.periodicity.find(
      (item) =>
        item.label.toString().toLowerCase() ===
        pocket?.period.toString().toLowerCase()
    );

    this.form = this.formBuilder.group({
      name: [
        pocket?.description,
        [Validators.required, pocketEditNameValidators.bind(this)]
      ],
      quota: [
        pocket?.instalmentAmount,
        [Validators.required, pocketEditQuotaValidators.bind(this)]
      ],
      goal: [
        pocket?.goal,
        [Validators.required, pocketEditGoalValidators.bind(this)]
      ],
      category: [pocketCategory, [Validators.required]],
      period: [period, [Validators.required]],
      pocket: [this.pocket$.currentValue()],
      product: [this.product$.currentValue()],
      confirmation: [null]
    });
  }

  @GenericStepperAction
  public editPocket(): void {
    if (this.form.valid) {
      this.editPocketWithReturnsFacade.updatePocketWithReturns(
        mapEditPocketWithReturnsPayload(this.form.value),
        mapPocketWithReturnsDetailPayload(this.pocket$.currentValue()),
        this.backUrl$.currentValue()
      );
    }
  }

  get installments(): number {
    return (this.goal as FormControl).currencyValue() > 0 &&
      this.goal.valid &&
      (this.quota as FormControl).currencyValue() > 0 &&
      this.quota.valid
      ? Math.ceil(
          ((this.goal as FormControl).currencyValue() -
            this.pocket$.currentValue().amountSaved) /
            (this.quota as FormControl).currencyValue()
        )
      : 0;
  }
  public backPage(): void {
    void this.navCtrl.back();
  }
  get backUrl$(): Observable<string[]> {
    return this.pocket$.pipe(
      map((pocket: Pocket) => [
        POCKETS_DETAIL.toString(),
        pocket?.productTypeParent,
        pocket?.productIdParent,
        pocket?.type,
        pocket?.numberProduct
      ])
    );
  }
  get pockets$(): Observable<Pocket[]> {
    return this.facade.pockets$.pipe(map((data) => data.pockets));
  }
  get pocket$(): Observable<PocketWithReturns> {
    return this.pocketDetailWithReturnsFacade.pocket$;
  }

  get product$(): Observable<Product> {
    return this.pocketDetailWithReturnsFacade.product$;
  }

  get pocketCategories$(): Observable<DropdownList[]> {
    return this.pocketDetailWithReturnsFacade.parameterByKey(
      ParameterType.categoriesPockets
    );
  }

  get periodicity(): typeof PERIODICITY {
    return PERIODICITY;
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get category(): AbstractControl {
    return this.form.get('category');
  }

  get goal(): AbstractControl {
    return this.form.get('goal');
  }

  get period(): AbstractControl {
    return this.form.get('period');
  }

  get quota(): AbstractControl {
    return this.form.get('quota');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
