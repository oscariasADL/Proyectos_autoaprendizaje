import { Component, OnDestroy } from '@angular/core';
import { TaxFacade } from '../../tax.facade';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tax-select-year',
  templateUrl: './tax-select-year.component.html',
  styleUrls: ['./tax-select-year.component.sass']
})
export class TaxSelectYearComponent implements OnDestroy {
  public readonly years: number[] = this.latestYears;

  constructor(
    private toastrService: ToastrService,
    private facade: TaxFacade
  ) {}

  ngOnDestroy(): void {
    this.toastrService.clear();
  }

  public downloadTaxCertificate(year: number): void {
    this.facade.fetchTaxCertificate(year);
  }

  public isDownload$(year: number): Observable<boolean> {
    return this.downloadFileYear$.pipe(
      map((yearSelected: number) => yearSelected === year)
    );
  }

  get downloadFileYear$(): Observable<number> {
    return this.facade.downloadFileYear$;
  }

  get isDownloadingSomeCertificate$(): Observable<boolean> {
    return this.facade.isDownloadingSomeCertificate$;
  }

  get latestYears(): number[] {
    const currentYear = new Date().getFullYear();
    return new Array(3)
      .fill(currentYear)
      .map((year, index) => year - index - 1);
  }
}
