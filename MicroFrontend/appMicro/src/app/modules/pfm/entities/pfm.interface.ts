import { Balance } from '@avaldigitallabs/adl-pfm-design-system-widgets/dist/types/models/balance.model';
import { Category } from '@avaldigitallabs/adl-pfm-design-system-widgets/dist/types/models/category.model';
import { Movement } from '@avaldigitallabs/adl-pfm-design-system-widgets/dist/types/models/movement.model';
import {
  Product,
  CreditCard
} from '@avaldigitallabs/adl-pfm-design-system-widgets/dist/types/models/product.model';
import { ProductType } from '@avaldigitallabs/adl-pfm-design-system-widgets/dist/types/types/products.type';
import { TypeAccount } from '@commons/entities/product/type-account';

export enum PFMCategoryType {
  INCOME = 'C',
  EXPENSE = 'D'
}

export type PFMProductType = ProductType;

export enum PFMProductTypeEnum {
  CC = 'CC',
  CA = 'CA',
  TC = 'TC',
  ALL = 'ALL'
}

export type BankId = 'bavv' | 'bocc' | 'bpop' | 'bbog';

export const VARIABLE0 = '8953072';

export const VARIABLE1 = '8953072';

export type PFMCategory = Category;

export interface PFMCategoriesResponse {
  data: {
    categories: PFMCategory[];
  };
}

export interface PFMAdviserMessage {
  message: string;
  source: SourceType;
}

export enum SourceType {
  SERVER = 'server',
  CLIENT = 'client'
}

interface PFMCustomMBalance {
  accountNumberCreditCard: string;
}

export type PFMBalance = Partial<Balance> &
  Product &
  Partial<CreditCard> &
  Partial<PFMCustomMBalance>;

export interface PFMBalancesResponse {
  data: {
    products: PFMBalance[];
  };
}

export interface PFMExpenseIncomeCategories {
  total: number;
  previousTotal: number;
  categories: PFMCategory[];
}

export interface PFMCategoriesOfMovements {
  accountNumber: string;
  idProduct: string;
  expenses: PFMExpenseIncomeCategories;
  incomes: PFMExpenseIncomeCategories;
}

export interface PFMCategoriesOfMovementsResponse {
  data: {
    products: PFMCategoriesOfMovements[];
  };
}

export type PFMMovement = Movement;

export interface PFMMovementsByCategoryResponse {
  data: {
    movements: PFMMovement[];
  };
}

export interface MovementsByCategory {
  categoryCode: string;
  movements: PFMMovement[];
}

export interface PFMChangeCategoryTransaction {
  id: string;
}

export interface PFMChangeCategoryPayload {
  productType: string;
  idCategory: string;
  transactions: PFMChangeCategoryTransaction[];
}

export interface PFMChangeCategoryResponse {
  code: string;
  message: string;
}

export interface PFMFilterPayload {
  accountId: string;
  startDate: string;
  endDate: string;
}

export interface PFMFilterBalanceSummaryPayload extends PFMFilterPayload {
  accountType: TypeAccount;
}

export interface PFMFilterCategoriesOfMovements extends PFMFilterPayload {
  productType: PFMProductType;
}

export interface PFMMovementByCategoryFilterPayload extends PFMFilterPayload {
  productType: PFMProductType;
  categoryCode: string;
}
