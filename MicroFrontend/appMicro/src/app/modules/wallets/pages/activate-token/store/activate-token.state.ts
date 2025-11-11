export const activateTokenFeatureName = 'activateTokenState';

export interface ActivateTokenState {
  token: string;
  isActivated: boolean;
  working: boolean;
  completed: boolean;
  message: string;
}

export const initialActivateTokenState: ActivateTokenState = {
  token: null,
  isActivated: false,
  working: false,
  completed: false,
  message: null
};
