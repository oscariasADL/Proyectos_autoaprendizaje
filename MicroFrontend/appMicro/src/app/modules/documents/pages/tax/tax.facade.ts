import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { fetchTaxCertificateAction } from './store/tax.actions';
import {
  downloadFileYearSelector,
  isDownloadingSomeCertificateSelector
} from './store/tax.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

Injectable();
export class TaxFacade extends AppFacade {
  public downloadFileYear$: Observable<number> = this.store.pipe(
    select(downloadFileYearSelector)
  );

  public isDownloadingSomeCertificate$: Observable<boolean> = this.store.pipe(
    select(isDownloadingSomeCertificateSelector)
  );

  public fetchTaxCertificate(year: number): void {
    this.store.dispatch(fetchTaxCertificateAction({ year }));
  }
}
