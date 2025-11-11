import { Injectable } from '@angular/core';
import {
  OneSpanSecureStorage,
  OneSpanSecureStoragePlugin,
  OneSpanStorageItem
} from '@avaldigitallabs/one-span-secure-storage';
import {
  ITERATION_NUMBER,
  PERMANENT_STORAGE_NAME,
  STORAGE_DB_NAME
} from '@commons/constants/one-span.constants';
import { parseArrayToObj } from '@commons/helpers/text.helpers';

@Injectable({
  providedIn: 'root'
})
export class AdlSecureStorageService {
  private oneSpanSecureStorage: OneSpanSecureStoragePlugin =
    OneSpanSecureStorage;

  public async initDB(
    fingerPrint: string,
    storageName: string = STORAGE_DB_NAME,
    iterationNumber: number = ITERATION_NUMBER
  ): Promise<any> {
    try {
      const { created } = await this.oneSpanSecureStorage.initDB({
        storageName,
        fingerPrint,
        iterationNumber
      });
      await this.cleanDB();
      return created;
    } catch (error) {
      console.error('ERROR INIT SECURE STORAGE', JSON.stringify(error));
      throw JSON.stringify(error);
    }
  }

  public async getAll(): Promise<OneSpanStorageItem[]> {
    const { data } = await this.oneSpanSecureStorage.getAll();
    return data as any;
  }

  public async get(forKey: string): Promise<string> {
    const { value } = await this.oneSpanSecureStorage.getString({ forKey });
    return value;
  }

  public async contains(forKey: string): Promise<boolean> {
    const { contains } = await this.oneSpanSecureStorage.contains({ forKey });
    return contains;
  }

  public async put(
    forKey: string,
    forValue: string,
    writeOnPermanentStorage: boolean = false
  ): Promise<boolean> {
    try {
      const { put } = await this.oneSpanSecureStorage.putString({
        forKey,
        forValue
      });

      if (put && writeOnPermanentStorage) {
        await this.putPermanent(forKey);
      }

      return this.writeOnPermanentStorage();
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  public async remove(
    forKey: string,
    writeOnPermanentStorage: boolean = false
  ): Promise<boolean> {
    try {
      const { remove } = await this.oneSpanSecureStorage.remove({
        forKey
      });
      if (remove) {
        await this.removePermanent(forKey);
      }

      return this.writeOnPermanentStorage();
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  public async writeOnPermanentStorage(): Promise<boolean> {
    try {
      const { write } = await this.oneSpanSecureStorage.write();
      return write;
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  public async putPermanent(forKey: string): Promise<boolean> {
    try {
      let permanentKeys = [];
      const hasPermanentKeys = await this.contains(PERMANENT_STORAGE_NAME);

      if (hasPermanentKeys) {
        const { value } = await this.oneSpanSecureStorage.getString({
          forKey: PERMANENT_STORAGE_NAME
        });
        permanentKeys = value.split(',').filter((item) => item !== forKey);
      }

      permanentKeys.push(forKey);

      if (permanentKeys.length > 0) {
        const { put } = await this.oneSpanSecureStorage.putString({
          forKey: PERMANENT_STORAGE_NAME,
          forValue: permanentKeys.toString()
        });
        return put;
      }
      return true;
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  public async removePermanent(forKey: string): Promise<boolean> {
    try {
      let permanentKeys = [];
      const hasPermanentKeys = await this.contains(PERMANENT_STORAGE_NAME);

      if (hasPermanentKeys) {
        const { value } = await this.oneSpanSecureStorage.getString({
          forKey: PERMANENT_STORAGE_NAME
        });
        permanentKeys = value.split(',');

        const _permanentKeys = permanentKeys
          .filter((item) => item !== forKey)
          .toString();

        if (_permanentKeys) {
          const { put } = await this.oneSpanSecureStorage.putString({
            forKey: PERMANENT_STORAGE_NAME,
            forValue: _permanentKeys
          });
          return put;
        } else {
          const { remove } = await this.oneSpanSecureStorage.remove({
            forKey: PERMANENT_STORAGE_NAME
          });
          return remove;
        }
      }
      return true;
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  public async cleanAllDB(): Promise<void> {
    try {
      const keys = Object.keys(parseArrayToObj(await this.getAll()));

      for (const key of keys) {
        if (await this.contains(key)) {
          await this.oneSpanSecureStorage.remove({ forKey: key });
        }
      }
      await this.writeOnPermanentStorage();
    } catch (error) {
      throw JSON.stringify(error);
    }
  }

  private async cleanDB(): Promise<void> {
    try {
      const hasPermanentKeys = await this.contains(PERMANENT_STORAGE_NAME);
      let permanentKeys = '';
      if (hasPermanentKeys) {
        const { value } = await this.oneSpanSecureStorage.getString({
          forKey: PERMANENT_STORAGE_NAME
        });
        permanentKeys = value;
      }

      const keys = Object.keys(parseArrayToObj(await this.getAll()));

      for (const key of keys) {
        const containKey = await this.contains(key);
        if (
          !permanentKeys.includes(key) &&
          containKey &&
          key !== PERMANENT_STORAGE_NAME
        ) {
          await this.oneSpanSecureStorage.remove({ forKey: key });
        }
      }
      await this.writeOnPermanentStorage();
    } catch (error) {
      throw JSON.stringify(error);
    }
  }
}
