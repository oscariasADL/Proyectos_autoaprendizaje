import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import {
  ComplementaryServicesStep,
  ToggleComplementaryServicesPayload,
  ToggleComplementaryServicesResponse
} from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import { createAction, props } from '@ngrx/store';
import { toggleProcessIdSelector } from '@modules/security/security-complementary-services/store/complementary-services.selector';

export const setComplementaryServicesStepAction = createAction(
  type('[Global/UI] Set complementary services step'),
  props<{ step: ComplementaryServicesStep }>()
);

export const toggleComplementaryServicesAction = createAction(
  type('[Global/API] Toggle complementary services'),
  props<{ payload: ToggleComplementaryServicesPayload }>()
);

export const toggleSilenceComplementaryServicesAction = createAction(
  type('[Global/API] Toggle silence complementary services'),
  props<{ payload: ToggleComplementaryServicesPayload }>()
);

export const toggleComplementaryServicesSuccessAction = createAction(
  type('[Global/API] Toggle complementary services success')
);

export const toggleComplementaryServicesErrorAction = createAction(
  type('[Global/API] Toggle complementary services error'),
  props<{ props: AlertSheetProperties }>()
);

export const seedSowingComplementaryServicesAction = createAction(
  type('[Complementary Services] Seed sowing Complementary Services'),
  props<{ response: ToggleComplementaryServicesResponse }>()
);

export const setToggleProcessId = createAction(
  type('[Complementary Services] Set toggle process id'),
  props<{ processId: string }>()
);

export const activateOneSpanLicenseAction = createAction(
  type('[Complementary Services] One Span Activate License'),
  props<{ enrollmentKey: string }>()
);

export const activateOneSpanInstanceAction = createAction(
  type('[Complementary Services] One Span Activate Instance'),
  props<{ enrollmentKey: string }>()
);

export const setErrorMessageAction = createAction(
  type('[Complementary Services] Set Error Message'),
  props<{ errorMessage: string }>()
);
