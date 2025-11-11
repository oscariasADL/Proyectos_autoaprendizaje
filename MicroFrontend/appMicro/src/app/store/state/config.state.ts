import { ConfigResponse } from '@commons/entities/config/config.entities';

export type ConfigState = Readonly<{
  config: ConfigResponse;
  appLoaded: boolean;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialConfigState: ConfigState = {
  config: null,
  appLoaded: false,
  working: false,
  completed: false,
  message: ''
};
