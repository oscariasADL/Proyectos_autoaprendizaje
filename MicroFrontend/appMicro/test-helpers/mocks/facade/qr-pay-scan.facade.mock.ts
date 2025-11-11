import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QrData } from '@commons/entities/scan/qr.entities';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class QrPayScanFacadeMock extends AppFacadeMock {
  public qrData$: Observable<QrData> = new BehaviorSubject(null);

  public parseQr(qrScan: string): void {}

  public resetQRData(): void {}
}
