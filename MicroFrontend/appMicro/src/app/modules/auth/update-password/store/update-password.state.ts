export const updatePasswordFeatureName = 'updatePasswordModuleState';

export type UpdatePasswordState = Readonly<{
  working: boolean;
  completed: boolean;
}>;

export const initialUpdatePasswordState: UpdatePasswordState = {
  working: false,
  completed: false
};
