import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { ExtractsPeriod } from '@modules/documents/pages/extracts/entities/extracts.interface';
import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-extracts',
  templateUrl: './extracts.page.html',
  styleUrls: ['./extracts.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtractsPage implements OnInit {
  public product: UntypedFormControl;

  constructor(private facade: ExtractsFacade) {}

  ngOnInit(): void {
    this.product = new UntypedFormControl();
    this.initProduct();
  }

  ionViewWillLeave(): void {
    this.facade.closeToast();
  }

  ionViewDidLeave(): void {
    this.facade.setProductSelected(this.productSelected$.currentValue());
    this.facade.resetProductSelected();
  }

  public changeProduct(product: Product): void {
    this.facade.fetchPeriods(product.id.toString());
  }

  public downloadExtract(period: ExtractsPeriod): void {
    if (!this.isDownloadingSomeFile$.currentValue()) {
      this.facade.fetchExtract({
        productId: this.product.value.id,
        periodInfo: period
      });
    }
  }

  public isDownload$(fileDesc: string): Observable<boolean> {
    return this.downloadFileName$.pipe(
      map((fileName: string) => fileName === fileDesc)
    );
  }

  private initProduct(): void {
    const productSelected: Product = this.productSelected$.currentValue();
    if (!isNullOrUndefined(productSelected)) {
      this.product.setValue(productSelected);
      this.changeProduct(productSelected);
    }
  }

  get isDownloadingSomeFile$(): Observable<boolean> {
    return this.facade.isDownloadingSomeFile$;
  }

  get downloadFileName$(): Observable<string> {
    return this.facade.downloadFileName$;
  }

  get productSelected$(): Observable<ProductDetail> {
    return this.facade.productSelected$;
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$;
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
