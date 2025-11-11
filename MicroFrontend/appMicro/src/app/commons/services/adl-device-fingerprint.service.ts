import { Injectable } from '@angular/core';
import { OnespanBinding } from '@avaldigitallabs/one-span-device-fingerprint';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdlDeviceFingerprintService {
  public getFingerprint(salt: string): Observable<{
    fingerPrint: string;
  }> {
    return from(
      OnespanBinding.getFingerprint({
        salt
      })
    );
  }
}
