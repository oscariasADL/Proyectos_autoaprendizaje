import { removeProperties } from '@commons/utils/util';
import { logoutUserAction } from '@store/actions/global.actions';

export const CLEAR_ACTION = logoutUserAction;

const EXCLUDES_FEATURES = ['device', 'parameter', 'interchange'];

export function clearState(reducer: any): any {
  return (state: any, action: any): any => {
    if (action.type === CLEAR_ACTION.type) {
      const featureKeysToReset = Object.keys(state).filter(
        (key) => !EXCLUDES_FEATURES.includes(key)
      );
      state = removeProperties(state, featureKeysToReset);
    }
    return reducer(state, action);
  };
}
