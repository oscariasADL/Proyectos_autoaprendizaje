import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { AppFacade } from '@app/app.facade';
import {
  scanningQr,
  sendToken,
  setQrData
} from '@modules/qr/pages/qr-authorization/store/qr-authorization.actions';
import {
  decryptedDataSelector,
  dynamicCodeSelector,
  qrAuthorizationCompletedSelector,
  qrAuthorizationWorkingSelector,
  transactionTitleSelector
} from '@modules/qr/pages/qr-authorization/store/qr-authorization.selector';
import { FA2Payload } from '@app/commons/entities/notifications/notification.entities';

@Injectable()
export class QrAuthorizationFacade extends AppFacade {
  public transactionTitle$: Observable<string> = this.store.pipe(
    select(transactionTitleSelector)
  );

  public decryptedData$: Observable<Record<string, string>> = this.store.pipe(
    select(decryptedDataSelector)
  );
  public dynamicCode$: Observable<string> = this.store.pipe(
    select(dynamicCodeSelector)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(qrAuthorizationWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(qrAuthorizationCompletedSelector)
  );

  public setQrData(
    transactionTitle: string,
    decryptedData: Record<string, string>,
    dynamicCode: string
  ): void {
    this.store.dispatch(
      setQrData({ transactionTitle, decryptedData, dynamicCode })
    );
  }

  public scanningQr(): void {
    this.store.dispatch(scanningQr());
  }
  public validate2FA(payload: FA2Payload) {
    this.store.dispatch(sendToken({ payload }));
  }
}
