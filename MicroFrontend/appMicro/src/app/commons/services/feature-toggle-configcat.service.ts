import { Injectable } from '@angular/core';
import * as configcat from 'configcat-js';
import { environment as ENV } from '@environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigCatFeatureToggleService {
  private configCatClient: configcat.IConfigCatClient;

  constructor() {
    this.configCatClient = configcat.getClient(
      ENV.configCat.sdkKey,
      configcat.PollingMode.ManualPoll
    );
    this.configCatClient.forceRefreshAsync();
  }

  public getAllValuesAsync(user?: configcat.User): Observable<any> {
    return from(
      this.configCatClient.getAllValuesAsync(user).catch((error) => {
        console.warn(`Error fetching feature flag `, error);
        return true;
      })
    );
  }
}
