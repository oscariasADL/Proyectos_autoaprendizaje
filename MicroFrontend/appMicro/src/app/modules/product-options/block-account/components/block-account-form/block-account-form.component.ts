import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { Observable } from 'rxjs';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-block-account-form',
  templateUrl: './block-account-form.component.html',
  styleUrls: ['./block-account-form.component.sass']
})
export class BlockAccountFormComponent implements OnInit {
  @ViewChild('blockAccountForm') blockAccountForm: UntypedFormGroup;

  constructor(
    private blockAccountFacade: BlockAccountFacade,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    if (this.selectedProduct && !this.productMedias$.currentValue()) {
      this.blockAccountFacade.fetchBlockProductProductMedias();
    }
    this.setBlockAccountError(false);
    this.setBlockAccountResponse({ props: null });
  }

  public navigate(): void {
    this.navCtrl.navigateForward('/block-account/info');
  }

  get working$(): Observable<boolean> {
    return this.blockAccountFacade.blockAccountWorking$;
  }

  get productMedias$(): Observable<ActivationProduct[]> {
    return this.blockAccountFacade.blockAccountProductMedias$;
  }

  get selectedProduct(): ProductDetail {
    return this.blockAccountFacade.blockAccountSelectedProduct$.currentValue();
  }

  get selectedProduct$(): Observable<ProductDetail> {
    return this.blockAccountFacade.blockAccountSelectedProduct$;
  }

  get form$(): Observable<{ relativeId: string; lockId: string }> {
    return this.blockAccountFacade.blockAccountForm$;
  }

  public setBlockAccountError(error: any): void {
    this.blockAccountFacade.setBlockAccountError(error);
  }

  public setBlockAccountResponse(props: any): void {
    this.blockAccountFacade.setBlockAccountResponse(props);
  }

  public setBlockAccountSelectedProduct(product: ProductDetail): void {
    this.blockAccountFacade.setBlockAccountSelectedProduct(product);
  }

  public setBlockAccountForm(relativeId: string, lockId: string): void {
    this.blockAccountFacade.setBlockAccountForm(relativeId, lockId);
  }

  public setBlockOption(event: any): void {
    this.setBlockAccountForm(
      this.selectedProduct$?.currentValue()?.id,
      event.target.value
    );
  }
}
