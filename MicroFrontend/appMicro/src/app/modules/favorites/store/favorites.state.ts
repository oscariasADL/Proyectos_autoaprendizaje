import { Favorite } from '@modules/favorites/entities/favorites.interface';

export const favoritesFeatureName = 'favoritesModuleState';

export type FavoritesState = Readonly<{
  favorites: Favorite[];
  working: boolean;
  completed: boolean;
  message: string;
  towardProducts: any[];
  towardBankIds: string[];
  useTransfiya: boolean;
}>;

export const initialFavoritesState: FavoritesState = {
  favorites: [],
  working: false,
  completed: false,
  message: '',
  towardBankIds: null,
  towardProducts: null,
  useTransfiya: false
};
