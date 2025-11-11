import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class FeatureToggleConfigCatServiceMock {
  constructor() {}

  public getAllValuesAsync(): Observable<any> {
    return of([{ settingKey: 'TransferCel2cel', settingValue: 'true' }]);
  }
}
