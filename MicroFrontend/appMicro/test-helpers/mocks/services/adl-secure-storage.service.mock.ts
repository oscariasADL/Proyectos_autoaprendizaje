import { Injectable } from '@angular/core';
import { OneSpanStorageItem } from '@avaldigitallabs/one-span-secure-storage';
import { SecureKeys } from '@commons/constants/keys.constants';

@Injectable()
export class AdlSecureStorageServiceMock {
  public async initDB(
    fingerPrint: string,
    storageName: string,
    iterationNumber: number
  ): Promise<any> {
    return Promise.resolve();
  }

  public async getAll(): Promise<OneSpanStorageItem[]> {
    return Promise.resolve([
      {
        key: SecureKeys.loginData,
        value: JSON.stringify({ documentType: '', document: '' })
      }
    ]);
  }

  public async get(forKey: string): Promise<string> {
    return Promise.resolve('');
  }

  public async contains(forKey: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async put(
    forKey: string,
    forValue: string,
    writeOnPermanentStorage: boolean = false
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async remove(
    forKey: string,
    writeOnPermanentStorage: boolean = false
  ): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async writeOnPermanentStorage(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async putPermanent(forKey: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async removePermanent(forKey: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  private async cleanDB(): Promise<void> {
    return Promise.resolve();
  }

  public async cleanAllDB(): Promise<void> {}
}
