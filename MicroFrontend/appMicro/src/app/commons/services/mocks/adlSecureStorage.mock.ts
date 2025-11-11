import { SecureKeys } from '@app/commons/constants/keys.constants';

export class AdlSecureStorageServiceMock {
  private storage: Record<string, string> = {};
  public async getAll(): Promise<Record<string, string>> {
    return {
      [SecureKeys.biometric]: this.storage[SecureKeys.biometric] || '',
      [SecureKeys.loginData]: this.storage[SecureKeys.loginData] || '',
      [SecureKeys.hasBiometricDenied]:
        this.storage[SecureKeys.hasBiometricDenied] || ''
    };
  }
  public async put(
    key: string,
    value: string,
    writePermanent: boolean = false
  ): Promise<boolean> {
    this.storage[key] = value;
    return true;
  }
  public async remove(key: string): Promise<boolean> {
    delete this.storage[key];
    return true;
  }
}
