import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@commons/services/alert.service';
import { BLOCK_ACCOUNT_CONFIRM } from '@modules/product-options/block-account/constants/block-account.constants';
import { NavController } from '@ionic/angular';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { Observable, Subscription } from 'rxjs';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import {
  mapSendBlockAccountError,
  mapSendBlockAccountResponse
} from '@modules/product-options/block-account/components/mappers/block-account.mapper';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';

@Component({
  selector: 'app-block-account-info',
  templateUrl: './block-account-info.component.html',
  styleUrls: ['./block-account-info.component.sass']
})
export class BlockAccountInfoComponent implements OnInit, OnDestroy {
  @Input() state: boolean = true;
  responseObserver: Subscription = null;

  constructor(
    private alertService: AlertService,
    private blockAccountFacade: BlockAccountFacade,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.responseObserver = this.response$.subscribe((res) => {
      const selectedProduct = this.selectedProduct$.currentValue();
      this.showAlertError(
        !isNullOrUndefinedOrEmpty(this.response$.currentValue()?.props) &&
          this.error$.currentValue(),
        res
      );
      this.showAlertSuccess(
        !isNullOrUndefinedOrEmpty(this.response$.currentValue()?.props) &&
          !this.error$.currentValue(),
        res,
        selectedProduct
      );
    });
  }

  ngOnDestroy(): void {
    this.responseObserver.unsubscribe();
  }

  public showAlertError(show: boolean, res: any): void {
    if (show) {
      this.alertService.create(mapSendBlockAccountError(res?.props));
    }
  }

  public showAlertSuccess(show: boolean, res: any, selectedProduct: any): void {
    if (show) {
      this.alertService
        .create(mapSendBlockAccountResponse(res?.props, selectedProduct))
        .then((r) => null);
      this.navCtrl.navigateForward(`/`).then((r) => null);
    }
  }

  public continue(): void {
    if (this.state) {
      this.alertService.create(BLOCK_ACCOUNT_CONFIRM).then((confirmed) => {
        this.sendRequest(confirmed);
      });
    }
  }

  get blockAccountForm$(): Observable<any> {
    return this.blockAccountFacade.blockAccountForm$;
  }

  public setBlockAccountForm(relativeId: string, lockId: string): void {
    this.blockAccountFacade.setBlockAccountForm(relativeId, lockId);
  }

  public setSelectedProduct(product: ProductDetail): void {
    this.blockAccountFacade.setBlockAccountSelectedProduct(product);
  }

  get selectedProduct$(): Observable<any> {
    return this.blockAccountFacade.blockAccountSelectedProduct$;
  }

  get response$(): Observable<any> {
    return this.blockAccountFacade.blockAccountResponse$;
  }

  get error$(): Observable<any> {
    return this.blockAccountFacade.blockAccountError$;
  }

  public sendRequest(confirmed: boolean): void {
    if (confirmed) {
      const payload = this.blockAccountForm$?.currentValue() ?? {
        relativeId: null,
        lockId: null
      };
      this.blockAccountFacade.sendBlockAccount(
        payload.relativeId,
        payload.lockId
      );
    }
  }
}
