import * as actions from '@modules/documents/store/documents.actions';
import {
  DocumentsState,
  initialDocumentsState
} from '@modules/documents/store/documents.state';

import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialDocumentsState,
  on(
    actions.setProductSelectedForDocumentAction,
    (state: DocumentsState, { product: selected }) => ({
      ...state,
      selected
    })
  )
);

export const documentsReducer = (
  state: DocumentsState,
  action: Action
): DocumentsState => {
  return featureReducer(state, action);
};
