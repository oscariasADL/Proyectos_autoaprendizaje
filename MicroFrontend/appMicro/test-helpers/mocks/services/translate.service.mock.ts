import { Injectable } from '@angular/core';

@Injectable()
export class TranslateServiceMock {
  public instant(
    key: string | Array<string>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    interpolateParams?: Object
  ): string | any {
    return key;
  }
}
