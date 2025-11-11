export class FingerprintAIOMock {
  public isAvailable(options?: any): Promise<string> {
    return Promise.resolve(null);
  }
  public loadBiometricSecret(options: any): Promise<any> {
    return Promise.resolve({ secret: 'dummy' });
  }
  public registerBiometricSecret(options: any): Promise<void> {
    return Promise.resolve();
  }
}
