import {
  MovementsByCategory,
  PFMAdviserMessage,
  PFMBalance,
  PFMCategoriesOfMovements,
  PFMCategory
} from '@modules/pfm/entities/pfm.interface';

export const PFMModuleName = 'pfmModule';

export interface PFMState {
  incomeCategories: PFMCategory[];
  expenseCategories: PFMCategory[];
  balancesSummary: PFMBalance[];
  balancesWorking: boolean;
  balancesCompleted: boolean;
  categoriesOfMovements: PFMCategoriesOfMovements[];
  categoriesOfMovementsWorking: boolean;
  categoriesOfMovementsCompleted: boolean;
  movementsByCategory: MovementsByCategory[];
  adviserAval: {
    working: boolean;
    completed: boolean;
    accessToken: string;
    userInput: string;
    chatHistory: PFMAdviserMessage[];
  };
}

export const initialPFMState: PFMState = {
  incomeCategories: [],
  expenseCategories: [],
  balancesSummary: [],
  balancesWorking: false,
  balancesCompleted: false,
  categoriesOfMovements: [],
  categoriesOfMovementsWorking: false,
  categoriesOfMovementsCompleted: false,
  movementsByCategory: [],
  adviserAval: {
    working: false,
    completed: false,
    accessToken: null,
    userInput: null,
    chatHistory: []
  }
};
