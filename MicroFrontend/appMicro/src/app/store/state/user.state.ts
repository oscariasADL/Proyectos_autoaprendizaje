import {
  DataBasicClientDto,
  UserData
} from '@commons/entities/auth/auth.entities';

export const userFeatureName = 'user';

export type UserState = Readonly<{
  data: UserData;
  basic: DataBasicClientDto;
  loginWithBiometric: boolean;
  complementaryServices: boolean;
  complementaryServicesError: boolean;
  notifications: boolean;
}>;

export const initialUserState: UserState = {
  data: null,
  basic: null,
  loginWithBiometric: false,
  complementaryServices: false,
  complementaryServicesError: false,
  notifications: true
};
