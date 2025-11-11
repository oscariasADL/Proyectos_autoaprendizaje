import { type } from '@commons/utils/util';
import {
  DataBasicClientDto,
  UserData
} from '@commons/entities/auth/auth.entities';
import { DeviceData } from '@commons/entities/device/device.interface';
import { createAction, props } from '@ngrx/store';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { Observable } from 'rxjs';

export const logoutUserAction = createAction(
  type('[Global/API] Logout user action'),
  props<{ redirectToLogin: boolean; closeModal: boolean }>()
);

export const logoutUserSuccessAction = createAction(
  type('[Global/API] Logout user success action')
);

export const logoutUserErrorAction = createAction(
  type('[Global/API] Logout user error action')
);

export const initUserAction = createAction(
  type('[Global/UI] Init user'),
  props<{ redirectHome: boolean }>()
);

export const setUserDataAction = createAction(
  type('[Global/DATA] Set user data'),
  props<{ data: UserData }>()
);

export const setBasicDataAction = createAction(
  type('[Global/DATA] Set basic data'),
  props<{ basic: DataBasicClientDto }>()
);

export const setDeviceInfo = createAction(
  type('[Global/DATA] Set device info'),
  props<{ deviceInfo: DeviceData }>()
);

export const setGeolocationInfo = createAction(
  type('[Global/DATA] set geolocation info'),
  props<{ latitude: string; longitude: string }>()
);

export const setTransfiyaFingerprint = createAction(
  type('[Global/DATA] Set Transfiya Fingerprint data'),
  props<{ transfiyaFingerprint: any }>()
);
export const setLoginWithBiometric = createAction(
  type('[Global/DATA] Set login With Biometric'),
  props<{ loginWithBiometric: boolean }>()
);

export const setComplementaryServicesStateAction = createAction(
  type('[Global/API] Set complementary services'),
  props<{ state: boolean; error: boolean }>()
);

export const setSecurityNotificationsStateAction = createAction(
  type('[Global/API] Set security notifications'),
  props<{ state: boolean }>()
);

export const fetchComplementaryServicesAction = createAction(
  type('[Global/API] Complementary services'),
  props<{ redirectHome: boolean }>()
);

export const openExternalUrl = createAction(
  type('[Global/API] Open External Url'),
  props<{
    url: string;
    target: '_self' | '_blank';
    alertProps: AlertSheetProperties;
    closeModalId: string;
    ObservablePostCall: Observable<any>;
  }>()
);

export const openDeepLink = createAction(
  type('[Global/API] Open Deep link'),
  props<{
    url: string;
  }>()
);
