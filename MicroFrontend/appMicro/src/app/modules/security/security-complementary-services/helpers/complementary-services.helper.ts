import {
  ComplementaryServicesStep,
  StepSeedSowingType,
  ToggleComplementaryServicesResponse
} from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import * as actions from '../store/complementary-services.actions';
import { setComplementaryServicesStateAction } from '@store/actions/global.actions';
import { openModalAction } from '@store/actions/modal.action';
import { AlertSheetType } from '@commons/entities/alert/alert-sheet.entities';

export function seedSowingActions(
  response: ToggleComplementaryServicesResponse
): {
  [key: string]: any[];
} {
  return {
    [StepSeedSowingType.ONESPAN_ACTIVATE_LICENSE]: [
      actions.activateOneSpanLicenseAction({
        enrollmentKey: response.enrollmentKey
      })
    ],
    [StepSeedSowingType.ONESPAN_ACTIVATE_INSTANCE]: [
      actions.activateOneSpanInstanceAction({
        enrollmentKey: response.enrollmentKey
      })
    ],
    [StepSeedSowingType.ALREADY_HAS_SEED]: [
      actions.toggleComplementaryServicesSuccessAction()
    ],
    [StepSeedSowingType.FAILED_ACTIVATION]: [
      actions.toggleComplementaryServicesSuccessAction(),
      actions.setComplementaryServicesStepAction({
        step: response.success
          ? ComplementaryServicesStep.complete
          : ComplementaryServicesStep.failed
      })
    ],
    [StepSeedSowingType.COMPLETED]: [
      setComplementaryServicesStateAction({
        state: response.complementary,
        error: false
      }),
      actions.setComplementaryServicesStepAction({
        step: response.success
          ? ComplementaryServicesStep.complete
          : ComplementaryServicesStep.failed
      }),
      actions.toggleComplementaryServicesSuccessAction()
    ],
    [StepSeedSowingType.RETRIES_LIMIT_EXCEED_OTP_VALIDATION]: [
      actions.toggleComplementaryServicesSuccessAction(),
      openModalAction({
        props: {
          type: AlertSheetType.error,
          title: 'Error',
          description: 'Ha excedido el número máximo de intentos'
        }
      })
    ],
    [StepSeedSowingType.AUTO_MIGRATION_OFF]: [
      actions.toggleComplementaryServicesSuccessAction()
    ]
  };
}
