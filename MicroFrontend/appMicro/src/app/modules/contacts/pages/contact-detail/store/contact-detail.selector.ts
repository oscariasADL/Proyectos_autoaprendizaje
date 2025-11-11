import { mapContactProducts } from '@modules/contacts/mappers/contact.mapper';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  contactDetailFeatureName,
  ContactDetailState
} from './contact-detail.state';

const contactDetailState = createFeatureSelector<ContactDetailState>(
  contactDetailFeatureName
);

export const contactProductsSelector = createSelector(
  contactDetailState,
  (state: ContactDetailState) => mapContactProducts(state.products)
);

export const contactProductsWorkingSelector = createSelector(
  contactDetailState,
  (state: ContactDetailState) => state.working
);

export const contactProductsCompletedSelector = createSelector(
  contactDetailState,
  (state: ContactDetailState) => state.completed
);
