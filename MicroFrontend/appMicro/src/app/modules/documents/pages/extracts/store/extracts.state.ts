import { ExtractsPeriod } from '@modules/documents/pages/extracts/entities/extracts.interface';

export const extractsFeatureName = 'extractsModuleState';

export type ExtractsState = Readonly<{
  periods: ExtractsPeriod[];
  working: boolean;
  completed: boolean;
  message: string;
  downloadFileName: string;
}>;

export const initialExtractsState: ExtractsState = {
  periods: null,
  working: false,
  completed: false,
  message: '',
  downloadFileName: null
};
