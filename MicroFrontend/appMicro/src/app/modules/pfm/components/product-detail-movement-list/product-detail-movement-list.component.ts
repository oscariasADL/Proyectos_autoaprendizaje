import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  FilterMove,
  MovementsDetailPayload
} from '@modules/movement/entities/movements-detail-payload.entity';
import {
  MovementsByCategory,
  PFMCategory,
  PFMCategoryType,
  PFMChangeCategoryPayload,
  PFMExpenseIncomeCategories,
  PFMMovement
} from '@modules/pfm/entities/pfm.interface';
import { getPercentage } from '@commons/helpers/general.helpers';
import {
  existsCategoryCodeInMovements,
  getMovementsByCategory,
  getProductType,
  getTotalMovementsByCategory,
  PFM_MOVEMENTS_PAGE_SIZE
} from '@modules/pfm/helpers/pfm.helpers';
import { ModalController } from '@commons/controllers/modal.controller';
import { ChangeCategoryModalComponent } from '@modules/pfm/components/change-category-modal/change-category-modal.component';
import { PFMFacade } from '@modules/pfm/pfm.facade';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { TypeAccount } from '@commons/entities/product/type-account';

@Component({
  selector: 'app-pfm-product-detail-movement-list',
  templateUrl: './product-detail-movement-list.component.html',
  styleUrls: ['./product-detail-movement-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailMovementListComponent {
  @Input() accountType: TypeAccount;
  @Input() filters: MovementsDetailPayload;
  @Input() groupedIncomeCategories: PFMExpenseIncomeCategories;
  @Input() groupedExpenseCategories: PFMExpenseIncomeCategories;
  @Input() categoriesOfMovementsWorking: boolean;
  @Input() categoriesOfMovementsCompleted: boolean;
  @Input() allMovementsByCategory: MovementsByCategory[];
  @Output() fetchMovementsByCategoryFn: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() changeCategoryFn: EventEmitter<PFMChangeCategoryPayload> =
    new EventEmitter<PFMChangeCategoryPayload>();

  public pageSize: number = PFM_MOVEMENTS_PAGE_SIZE;

  constructor(private modalCtrl: ModalController, private facade: PFMFacade) {}

  public areMovementsWorking(categoryCode: string): boolean {
    return !existsCategoryCodeInMovements(
      this.allMovementsByCategory,
      categoryCode
    );
  }

  public fetchMovementsByCategory(category: CustomEvent<PFMCategory>): void {
    this.fetchMovementsByCategoryFn.emit(category.detail.code);
  }

  public getMovementsByCategory(categoryCode: string): PFMMovement[] {
    return getMovementsByCategory(this.allMovementsByCategory, categoryCode);
  }

  public totalMovementsByCategory(categoryCode: string): number {
    return getTotalMovementsByCategory(
      this.allMovementsByCategory,
      categoryCode
    );
  }

  public getPercentage(categoryValue: number, total: number): string {
    return getPercentage(categoryValue, total);
  }

  public async openChangeCategoryModal(
    event: CustomEvent<PFMMovement[]>,
    categoryCode: string,
    categoryType: PFMCategoryType
  ): Promise<void> {
    const categories: PFMCategory[] =
      categoryType === PFMCategoryType.INCOME
        ? this.incomeCategories$.currentValue()
        : this.expenseCategories$.currentValue();
    const modal = await this.modalCtrl.create({
      component: ChangeCategoryModalComponent,
      componentProps: {
        categories,
        categoryType,
        categoryCode
      },
      id: 'pfm-change-category-modal',
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    });
    await modal.present();
    const { data: newCategoryCode } = await modal.onWillDismiss();
    if (!isNullOrUndefined(newCategoryCode)) {
      this.changeCategoryFn.emit({
        productType: getProductType(this.accountType),
        idCategory: newCategoryCode,
        transactions: event.detail.map((movement) => ({ id: movement.id }))
      });
    }
  }

  get FilterMove(): typeof FilterMove {
    return FilterMove;
  }

  get PFMCategoryType(): typeof PFMCategoryType {
    return PFMCategoryType;
  }

  get incomeCategories$(): Observable<PFMCategory[]> {
    return this.facade.incomeCategories$;
  }

  get expenseCategories$(): Observable<PFMCategory[]> {
    return this.facade.expenseCategories$;
  }
}
