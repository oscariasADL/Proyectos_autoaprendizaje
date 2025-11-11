import { SilentEnrollmentResponse } from '../entities/silent-enrollment.interface';

export const silentEnrollmentFeatureName = 'silentEnrollmentModuleState';

export type SilentEnrollmentState = Readonly<{
  data: SilentEnrollmentResponse;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialSilentEnrollmentState: SilentEnrollmentState = {
  data: null,
  working: false,
  completed: false,
  message: ''
};
