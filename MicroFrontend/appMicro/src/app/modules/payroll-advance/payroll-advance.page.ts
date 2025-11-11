import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PayrollAdvanceTermsConditionsModalComponent } from './components/payroll-advance-terms-conditions-modal/payroll-advance-terms-conditions-modal.component';
import { AlertService } from '@app/commons/services/alert.service';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';
import { ProductDetailFacade } from '../product-detail/product-detail.facade';
import { ProductDetail } from '../product-detail/entities/product-detail.entity';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { mapVoucherItems } from './mappers/payroll-advance.mapper';

@Component({
  selector: 'app-payroll-advance-page',
  templateUrl: './payroll-advance.page.html',
  styleUrls: ['./payroll-advance.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollAdvancePage implements OnInit, OnDestroy {
  public productDetail: ProductDetail | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private navCtrl: NavController,
    private productFacade: ProductDetailFacade
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.productFacade.productDetail$.subscribe((product) => {
        this.productDetail = product;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get productDetail$(): Observable<ProductDetail> {
    return this.productFacade.productDetail$;
  }

  public async accepted() {
    this.fetchPayrollAdvanceConfirm();

    const updatedProduct = await firstValueFrom(
      this.productFacade.productDetail$.pipe(skip(1), take(1))
    );

    const PAYROLL_ADVANCE_SUCCESS_DATA: AlertSheetProperties = {
      type: AlertSheetType.success,
      id: 'pay-loan-success-alert',
      title: 'PAYMENTS.PAY_LOAN.RESPONSE.SUCCESS',
      description: 'PAYMENTS.PAY_LOAN.RESPONSE.AUTHORIZATION',
      reference: updatedProduct.payrollAdvanceAuthorizationNumber,
      items: mapVoucherItems({
        payrollAdvanceAmount: updatedProduct.payrollAdvanceAmount,
        numberProduct: updatedProduct.numberProduct
      }),
      allowShare: true,
      message: 'PAYROLL_ADVANCE.VOUCHER.SUCCESS_MESSAGE'
    };

    const PAYROLL_ADVANCE_FAIL_DATA: AlertSheetProperties = {
      type: AlertSheetType.success,
      id: 'pay-loan-success-alert',
      title: 'PAYROLL_ADVANCE.VOUCHER.TITLE_ERROR',
      icon: 'illustrations/error-proceso.svg',
      items: mapVoucherItems({
        payrollAdvanceAmount: updatedProduct.payrollAdvanceAmount,
        numberProduct: updatedProduct.numberProduct
      }),
      hasSuccessButtons: true,
      buttons: [
        'PAYROLL_ADVANCE.VOUCHER.TRY_AGAIN',
        'PAYROLL_ADVANCE.VOUCHER.GO_BACK'
      ],
      buttonsAction: [
        () => {
          return null;
        },
        () => this.declined()
      ]
    };

    const response = await this.alertService.create(
      updatedProduct.payrollAdvanceAuthorizationNumber
        ? PAYROLL_ADVANCE_SUCCESS_DATA
        : PAYROLL_ADVANCE_FAIL_DATA
    );

    if (!response) {
      this.navCtrl.navigateForward(['/home']);
    }
  }

  public fetchPayrollAdvanceConfirm(): void {
    if (this.productDetail) {
      this.productFacade.fetchProductPayrollAdvanceConfirm(
        this.productDetail.numberProduct,
        this.productDetail.payrollAdvanceAmount
      );
    }
  }

  public declined() {
    if (this.productDetail) {
      this.navCtrl.navigateForward([
        `/product-detail/${this.productDetail.type}/${this.productDetail.id}`
      ]);
    } else {
      this.navCtrl.navigateForward(['/home']);
    }
  }

  public showTermsCond() {
    this.showTermsModal();
  }

  public async showTermsModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      id: 'block-card-temporarily-confirmation-modal',
      component: PayrollAdvanceTermsConditionsModalComponent,
      componentProps: {},
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });

    await modal.present();
  }
}
