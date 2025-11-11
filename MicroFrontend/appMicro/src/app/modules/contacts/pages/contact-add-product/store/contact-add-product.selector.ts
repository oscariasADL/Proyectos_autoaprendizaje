import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  contactAddProductFeatureName,
  ContactAddProductState
} from './contact-add-product.state';

const contactAddProductState = createFeatureSelector<ContactAddProductState>(
  contactAddProductFeatureName
);

export const contactAddProductWorkingSelector = createSelector(
  contactAddProductState,
  (state: ContactAddProductState) => state.working
);

export const contactAddProductCompletedSelector = createSelector(
  contactAddProductState,
  (state: ContactAddProductState) => state.completed
);
