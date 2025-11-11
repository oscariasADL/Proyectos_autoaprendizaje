import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class QrAuthorizationFacadeMock extends AppFacadeMock {
  public transactionTitle$: Observable<string> = new BehaviorSubject('');
  public decryptedData$: Observable<string> = new BehaviorSubject('');
  public dynamicCode$: Observable<string> = new BehaviorSubject('');

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(true);

  public setQrData(
    transactionTitle: string,
    decryptedData: Record<string, string>,
    dynamicCode: string
  ): void {}

  public scanningQr(): void {}
}
