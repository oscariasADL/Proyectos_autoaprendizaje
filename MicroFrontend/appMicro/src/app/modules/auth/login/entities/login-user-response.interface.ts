import { UserData } from '@commons/entities/auth/auth.entities';

export interface LoginUserResponse extends UserData {
  token: string;
}
