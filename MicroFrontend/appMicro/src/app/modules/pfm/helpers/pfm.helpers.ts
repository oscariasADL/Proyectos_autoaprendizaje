import { TypeAccount } from '@commons/entities/product/type-account';
import { environment as ENV } from '@environment';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { FilterMove } from '@modules/movement/entities/movements-detail-payload.entity';
import {
  MovementsByCategory,
  PFMCategory,
  PFMCategoryType,
  PFMExpenseIncomeCategories,
  PFMMovement,
  PFMProductTypeEnum
} from '@modules/pfm/entities/pfm.interface';
import { Product } from '@commons/entities/product/product.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';

export const PFM_MOVEMENTS_PAGE_SIZE = 5;

export function showPFMInAccount(
  accountType: TypeAccount | string,
  featureFlagPFM: boolean
): boolean {
  return (
    featureFlagPFM &&
    [TypeAccount.SDA, TypeAccount.DDA, TypeAccount.CCA].includes(
      accountType as TypeAccount
    )
  );
}

export function areTherePFMMovements(
  movementType: FilterMove,
  incomeCategoriesOfMovements: PFMExpenseIncomeCategories,
  expenseCategoriesOfMovements: PFMExpenseIncomeCategories,
  accountDetail: Product,
  showPFM: boolean = true
): boolean {
  if (!isNullOrUndefined(accountDetail)) {
    switch (movementType) {
      case FilterMove.Down:
        return (
          showPFM &&
          !isNullOrUndefined(incomeCategoriesOfMovements) &&
          !isNullOrUndefined(incomeCategoriesOfMovements.categories) &&
          incomeCategoriesOfMovements.categories.length > 0
        );
      case FilterMove.Up:
        return (
          showPFM &&
          !isNullOrUndefined(expenseCategoriesOfMovements) &&
          !isNullOrUndefined(expenseCategoriesOfMovements.categories) &&
          expenseCategoriesOfMovements.categories.length > 0
        );
      default:
        return false;
    }
  } else {
    return false;
  }
}

export function existsCategoryCodeInMovements(
  allMovementsByCategory: MovementsByCategory[],
  categoryCode: string
): boolean {
  if (!!!allMovementsByCategory) {
    return false;
  }

  return !!allMovementsByCategory.filter(
    (movementByCategory) =>
      !!movementByCategory && movementByCategory.categoryCode === categoryCode
  )[0];
}

export function getMovementsByCategory(
  allMovementsByCategory: MovementsByCategory[],
  categoryCode: string
): PFMMovement[] {
  if (!!!allMovementsByCategory) {
    return [];
  }

  return allMovementsByCategory
    .filter(
      (movementByCategory) =>
        !!movementByCategory && movementByCategory.categoryCode === categoryCode
    )
    .map((movementByCategory) => movementByCategory.movements)
    .reduce((before, current) => before.concat(current), []);
}

export function getTotalMovementsByCategory(
  allMovementsByCategory: MovementsByCategory[],
  categoryCode: string
): number {
  return getMovementsByCategory(allMovementsByCategory, categoryCode).length;
}

export function mapCategoryOptions(
  categories: PFMCategory[],
  categoryType: PFMCategoryType,
  categoryCode: string
): DropdownList[] {
  return categories
    .filter((category) => category.code !== categoryCode)
    .map((category) => ({
      index: category.code,
      value: category.code,
      label: category.name,
      pfmCategoryColor: category.color,
      pfmCategoryType: categoryType
    }))
    .sort((a, b) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0));
}

export function getProductType(accountType: TypeAccount): PFMProductTypeEnum {
  switch (accountType) {
    case TypeAccount.DDA:
      return PFMProductTypeEnum.CC;
    case TypeAccount.CCA:
      return PFMProductTypeEnum.TC;
    default:
      return PFMProductTypeEnum.CA;
  }
}
