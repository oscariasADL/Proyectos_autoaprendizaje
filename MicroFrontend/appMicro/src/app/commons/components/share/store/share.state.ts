export const shareFeatureName = 'shareModuleState';

export type ShareState = Readonly<{
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialShareState: ShareState = {
  working: false,
  completed: null,
  message: ''
};
