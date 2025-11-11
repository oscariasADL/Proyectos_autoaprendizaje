import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  documentsFeatureName,
  DocumentsState
} from '@modules/documents/store/documents.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const documentsState =
  createFeatureSelector<DocumentsState>(documentsFeatureName);

export const productSelectedForDocumentSelector = createSelector(
  documentsState,
  (state: DocumentsState) => (!isNullOrUndefined(state) ? state.selected : null)
);
