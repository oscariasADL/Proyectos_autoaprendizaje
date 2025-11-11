import { Injectable } from '@angular/core';
import { AppFacadeMock } from './app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TaxFacadeMock extends AppFacadeMock {
  public downloadFileYear$: Observable<number> = new BehaviorSubject(2010);

  public isDownloadingSomeCertificate$: Observable<boolean> =
    new BehaviorSubject(false);

  public fetchTaxCertificate(year: number): void {}
}
