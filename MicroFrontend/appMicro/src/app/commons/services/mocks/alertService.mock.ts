import { REGISTER_BIOMETRIC_ALERT } from '@app/commons/constants/biometric.constants';

export class AlertServiceMock {
  public create(config: any): Promise<void> {
    if (
      config.id === REGISTER_BIOMETRIC_ALERT.id &&
      config.buttonsAction &&
      typeof config.buttonsAction[0] === 'function'
    ) {
      config.buttonsAction[0]();
    }
    return Promise.resolve();
  }
}
