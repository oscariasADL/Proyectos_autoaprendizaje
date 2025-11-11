import { ComplementaryServicesStep } from '@modules/security/security-complementary-services/entities/complementary-services.interface';

export const complementaryServicesFeatureName =
  'complementaryServicesModuleState';

export type ComplementaryServicesState = Readonly<{
  step: ComplementaryServicesStep;
  toggle?: {
    automaticValidation?: boolean;
    turnOn?: boolean;
    processId?: string;
  };
  toggleError: boolean;
  errorMessage?: string;
}>;

export const initialComplementaryServicesState: ComplementaryServicesState = {
  step: ComplementaryServicesStep.info,
  toggleError: false
};
