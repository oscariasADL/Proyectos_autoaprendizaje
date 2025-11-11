import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import { TypeAccount } from '@commons/entities/product/type-account';
import { NavController } from '@ionic/angular';
import { DOCUMENT_LIST } from '@modules/documents/constants/document.constants';
import { DocumentsFacade } from '@modules/documents/documents.facade';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsPage {
  public documentList: AvvIconsBtnList[];

  constructor(
    private navCtrl: NavController,
    private facade: DocumentsFacade,
    private cdRef: ChangeDetectorRef
  ) {}

  ionViewWillEnter(): void {
    this.documentList = DOCUMENT_LIST.slice(
      this.productSelected$.currentValue()?.type === TypeAccount.CDA ? 1 : 0,
      DOCUMENT_LIST.length
    );
    this.cdRef.detectChanges();
  }

  ionViewDidLeave(): void {
    this.facade.resetProductSelected();
  }

  public navigateTo(item: AvvIconsBtnList): void {
    this.facade.setProductSelectedForDocument(
      this.productSelected$.currentValue()
    );
    this.navCtrl.navigateForward(item.url);
  }

  get productSelected$(): Observable<ProductDetail> {
    return this.facade.productSelected$;
  }
}
