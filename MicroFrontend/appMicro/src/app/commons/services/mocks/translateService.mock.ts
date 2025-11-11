import { Observable, of } from 'rxjs';

export class TranslateServiceMock {
  public instant(key: string, interpolateParams?: any): string {
    if (interpolateParams) {
      return key + JSON.stringify(interpolateParams);
    }
    return key;
  }
}
