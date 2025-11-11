import {
  ProductCategory,
  ProductCategoryItem
} from '@commons/entities/product/balance.interface';
import { Movement } from '@commons/entities/product/movement.interface';
import { HomeAlertProperties } from '../entities/home-alert.entities';

export const homeFeatureName = 'homeModuleState';

export type HomeState = Readonly<{
  balanceCategory: ProductCategory;
  balanceCategories: ProductCategoryItem[];
  movements: Movement[];
  homeAlerts: HomeAlertProperties[];
  movementsWorking: boolean;
  movementsCompleted: boolean;
  timer?: number;
  hasCreditProducts?: boolean;
  creditProductsError?: boolean;
}>;

export const initialHomeState: HomeState = {
  balanceCategory: ProductCategory.all,
  balanceCategories: [],
  movements: [],
  homeAlerts: [],
  movementsWorking: false,
  movementsCompleted: false,
  timer: 0,
  hasCreditProducts: false,
  creditProductsError: false
};
