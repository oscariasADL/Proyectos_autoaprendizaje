import * as loginActions from '@store/actions/global.actions';
import { LoginType } from '@modules/auth/login/constants/login.constants';
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './login.actions';
import { initialLoginState, LoginState } from './login.state';

const featureReducer = createReducer(
  initialLoginState,
  on(actions.loginUserAction, (state) => ({
    ...state,
    working: true,
    completed: false,
    message: ''
  })),
  on(actions.loginUserSuccessAction, (state, { data }) => ({
    ...state,
    data,
    working: false,
    completed: true,
    message: ''
  })),
  on(actions.loginUserErrorAction, (state, { props }) => ({
    ...state,
    data: null,
    working: false,
    completed: false,
    message: props.description
  })),
  on(actions.setLoginTypeAction, (state, { loginType: type }) => ({
    ...state,
    type
  })),
  on(loginActions.logoutUserSuccessAction, (state) => ({
    ...state,
    type: LoginType.Password
  })),
  on(loginActions.logoutUserErrorAction, (state) => ({
    ...state,
    type: LoginType.Password
  }))
);

export const loginReducer = (state: LoginState, action: Action): LoginState => {
  return featureReducer(state, action);
};
