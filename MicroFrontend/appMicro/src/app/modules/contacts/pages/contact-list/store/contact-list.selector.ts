import {
  mapContacts,
  mapContactsFiltered
} from '@modules/contacts/mappers/contact.mapper';
import {
  contactListFeatureName,
  ContactListState
} from '@modules/contacts/pages/contact-list/store/contact-list.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const contactListState = createFeatureSelector<ContactListState>(
  contactListFeatureName
);

export const contactListSelector = createSelector(
  contactListState,
  (state: ContactListState) => mapContacts(state?.contacts)
);

export const contactListWorkingSelector = createSelector(
  contactListState,
  (state: ContactListState) => state.working
);

export const contactListCompletedSelector = createSelector(
  contactListState,
  (state: ContactListState) => state.completed
);

export const contactListFilterSelector = createSelector(
  contactListState,
  (state: ContactListState) => state.filter
);

export const contactListFilteredSelector = createSelector(
  contactListSelector,
  contactListFilterSelector,
  mapContactsFiltered
);
