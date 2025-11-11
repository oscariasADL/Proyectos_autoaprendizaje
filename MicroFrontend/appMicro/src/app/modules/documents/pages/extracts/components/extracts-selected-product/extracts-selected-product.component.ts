import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { Product } from '@commons/entities/product/product.interface';
import { Observable } from 'rxjs';
import { ExtractsPeriod } from '@modules/documents/pages/extracts/entities/extracts.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-extracts-selected-product',
  templateUrl: './extracts-selected-product.component.html',
  styleUrls: ['./extracts-selected-product.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtractsSelectedProductComponent implements OnInit {
  public product: Product = null;

  constructor(private route: ActivatedRoute, private facade: ExtractsFacade) {}

  ngOnInit() {
    this.product = this.facade.getProduct(this.params.type, this.params.id);
    this.facade.fetchPeriods(this.product.id);
  }

  public downloadExtract(period: ExtractsPeriod): void {
    if (!this.isDownloadingSomeFile$.currentValue()) {
      this.facade.fetchExtract({
        productId: this.product.id,
        periodInfo: period
      });
    }
  }

  public isDownload$(fileDesc: string): Observable<boolean> {
    return this.downloadFileName$.pipe(
      map((fileName: string) => fileName === fileDesc)
    );
  }

  get params(): Params {
    return this.route.snapshot.params;
  }

  get isDownloadingSomeFile$(): Observable<boolean> {
    return this.facade.isDownloadingSomeFile$;
  }

  get downloadFileName$(): Observable<string> {
    return this.facade.downloadFileName$;
  }

  get periods$(): Observable<ExtractsPeriod[]> {
    return this.facade.periods$;
  }

  get workingPeriods$(): Observable<boolean> {
    return this.facade.workingPeriods$;
  }

  get completedPeriods$(): Observable<boolean> {
    return this.facade.completedPeriods$;
  }
}
