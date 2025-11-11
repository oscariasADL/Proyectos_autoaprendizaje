import { Injectable } from '@angular/core';
import { NewUpdateParameter } from '@commons/entities/new-update/new-update.interface';

@Injectable()
export class NewAppUpdateServiceMock {
  private theLatestVersion: NewUpdateParameter;
  private _isMandatoryUpdate: boolean = false;

  public async skipNewUpdate(): Promise<any> {}

  public async checkNewAppUpdate(): Promise<any> {}

  private checkMandatoryUpdate(version: NewUpdateParameter): boolean {
    return false;
  }

  private async getSkipNewUpdate(): Promise<boolean> {
    return false;
  }

  get isMandatoryUpdate(): boolean {
    return this._isMandatoryUpdate;
  }
}
