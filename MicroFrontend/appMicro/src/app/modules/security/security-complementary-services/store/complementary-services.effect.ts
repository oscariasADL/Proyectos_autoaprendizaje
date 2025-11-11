import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import { ComplementaryServicesService } from '@commons/services/complementary-services.service';
import {
  ComplementaryServicesStep,
  StepSeedSowingType
} from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import * as actions from '@modules/security/security-complementary-services/store/complementary-services.actions';
import { ActivateOneSpanDigipassService } from '@commons/services/activate-one-span-digipass.service';
import { SecurityComplementaryServicesFacade } from '@modules/security/security-complementary-services/security-complementary-services.facade';
import { seedSowingActions } from '@modules/security/security-complementary-services/helpers/complementary-services.helper';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { openModalAction } from '@store/actions/modal.action';
import { AlertSheetType } from '@commons/entities/alert/alert-sheet.entities';
import { disableLoadingAction } from '@store/actions/loading.action';
import { COMPLEMENTARY_SERVICE_ERROR_MESSAGE } from '../constants/security-complementary-services.constants';
import { mapComplementaryServicesError } from '../mappers/complementary-services-response.mapper';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Injectable()
export class ComplementaryServicesEffect {
  constructor(
    private actions$: Actions,
    private service: ComplementaryServicesService,
    private activateOneSpanDigipass: ActivateOneSpanDigipassService,
    private facade: SecurityComplementaryServicesFacade
  ) {}

  public toggleComplementaryServicesEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actions.toggleComplementaryServicesAction,
          actions.toggleSilenceComplementaryServicesAction
        ),
        withLatestFrom(
          this.facade.isFeatureFlagEnabled(
            FeatureFlagsKey.UseBavvExecutorStepFunctionCS
          )
        ),
        switchMap(([{ payload }, isEnabledBavvExecutorSF]) =>
          this.service
            .toggleComplementaryServices(payload, isEnabledBavvExecutorSF)
            .pipe(
              switchMap((response) => {
                if (
                  !payload.content.automaticValidation &&
                  payload.content.turnOn &&
                  response.step === StepSeedSowingType.FILL_OTP_DATA
                ) {
                  return [
                    ...(!isNullOrUndefined(response?.processId)
                      ? [
                          actions.setToggleProcessId({
                            processId: response.processId
                          })
                        ]
                      : []),
                    actions.setComplementaryServicesStepAction({
                      step: ComplementaryServicesStep.otp
                    }),
                    actions.toggleComplementaryServicesSuccessAction(),
                    ...(!isNullOrUndefined(response?.errorMessage)
                      ? [
                          actions.setErrorMessageAction({
                            errorMessage: response.errorMessage
                          })
                        ]
                      : [])
                  ];
                }
                return [
                  actions.seedSowingComplementaryServicesAction({ response })
                ];
              }),
              catchError((error: HttpErrorResponse) =>
                of(
                  actions.toggleComplementaryServicesErrorAction({
                    props: mapComplementaryServicesError(error)
                  }),
                  actions.setErrorMessageAction({
                    errorMessage: COMPLEMENTARY_SERVICE_ERROR_MESSAGE
                  })
                )
              )
            )
        )
      )
  );

  // actions.toggleComplementaryServicesSuccessAction(), actions.toggleComplementaryServicesErrorAction() for disable loading
  /*
    globalActions.setComplementaryServicesStateAction({
              state: payload.content.turnOn,
              error: false
            }),
     for set global state complementary services
   */
  /*
  actions.setComplementaryServicesStepAction({
              step: ComplementaryServicesStep.complete
            })
            for to change screen when is not automatic
   */
  public seedSowingEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.seedSowingComplementaryServicesAction),
      withLatestFrom(this.facade.toggleAutomaticValidation$),
      switchMap(([action, automaticValidation]) => {
        const seedSowingAction = seedSowingActions(action.response);
        if (!seedSowingAction.hasOwnProperty(action.response?.step)) {
          return !automaticValidation
            ? [
                openModalAction({
                  props: {
                    type: AlertSheetType.error,
                    title: 'Error',
                    description:
                      'Ha ocurrido un error en la activación de servicios complementarios'
                  }
                }),
                disableLoadingAction()
              ]
            : [];
        }
        return [...seedSowingAction[action.response?.step]];
      })
    )
  );

  public activateOneSpanLicenseEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.activateOneSpanLicenseAction),
      switchMap(({ enrollmentKey }) =>
        from(
          this.activateOneSpanDigipass.activateLicense({
            enrollmentKey
          })
        )
      ),
      withLatestFrom(
        this.facade.toggleProcessId$,
        this.facade.toggleAutomaticValidation$
      ),
      switchMap(([deviceCode, processId, automaticValidation]) => {
        const props = {
          payload: { processId, content: { deviceCode, automaticValidation } }
        };
        return automaticValidation
          ? [actions.toggleSilenceComplementaryServicesAction(props)]
          : [actions.toggleComplementaryServicesAction(props)];
      })
    )
  );

  public activateOneSpanInstanceEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.activateOneSpanInstanceAction),
      switchMap(({ enrollmentKey }) =>
        from(
          this.activateOneSpanDigipass.activateInstance({
            enrollmentKey
          })
        )
      ),
      withLatestFrom(
        this.facade.toggleProcessId$,
        this.facade.toggleAutomaticValidation$
      ),
      switchMap(([signatureCode, processId, automaticValidation]) => {
        const props = {
          payload: {
            processId,
            content: { signatureCode, automaticValidation }
          }
        };
        return automaticValidation
          ? [actions.toggleSilenceComplementaryServicesAction(props)]
          : [actions.toggleComplementaryServicesAction(props)];
      })
    )
  );
}
