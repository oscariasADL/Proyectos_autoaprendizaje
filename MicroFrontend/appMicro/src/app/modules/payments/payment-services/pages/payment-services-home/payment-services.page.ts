import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import {
  HOME,
  SERVICES_PAY,
  SERVICES_PAY_MULTIPLE,
  SERVICES_SCHEDULING
} from '@commons/constants/navigate.constants';
import {
  PaymentBill,
  PaymentServicesResponse
} from '@modules/payments/payment-services/entities/payment-services.interface';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';

import { AlertService } from '@commons/services/alert.service';
import { Product } from '@commons/entities/product/product.interface';
import { PAYMENT_SERVICES_SCHEDULING_DELETE_ALERT } from '@modules/payments/payment-services/pages/payment-services-home/constants/payment-services-home.constants';
import { mapPaymentServiceCreateSchedulingPayloadOnlyBill } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/mappers/payment-service-create-scheduling-payload.mapper';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-payment-services',
  templateUrl: './payment-services.page.html',
  styleUrls: ['./payment-services.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentServicesPage implements OnInit {
  public readonly featureFlagsKey = FeatureFlagsKey;

  constructor(
    private navCtrl: NavController,
    private facade: PaymentServicesFacade,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.facade.fetchServices();
  }

  public payBill(bill: PaymentBill): void {
    if (bill.biller && !isNullOrUndefinedOrEmpty(bill.amount)) {
      void this.navCtrl.navigateForward(SERVICES_PAY_MULTIPLE);
      return;
    }

    this.facade.setBill(bill);
    this.navCtrl.navigateForward(SERVICES_PAY);
  }

  public scheduleBill(bill: PaymentBill): void {
    this.facade.setBill(bill);
    this.navCtrl.navigateForward(SERVICES_SCHEDULING);
  }

  public editScheduledBill(bill: PaymentBill): void {
    this.facade.setBill(bill);
    this.navCtrl.navigateForward(SERVICES_SCHEDULING, {
      queryParams: {
        edit: true
      }
    });
  }

  public removeScheduledBill(bill: PaymentBill): void {
    this.alertService
      .create(PAYMENT_SERVICES_SCHEDULING_DELETE_ALERT)
      .then((data) => {
        if (data) {
          this.facade.setBill(bill);
          this.facade.setBillSchedulingPayload(
            mapPaymentServiceCreateSchedulingPayloadOnlyBill(bill)
          );
          this.facade.deleteBillScheduling([
            {
              id: 'service',
              label: 'Servicio',
              fields: [bill.organizationName]
            },
            {
              id: 'reference',
              label: 'Referencia',
              fields: [bill.referenceId]
            }
          ]);
        }
      });
  }

  public goToHome(): void {
    this.navCtrl.navigateBack(HOME);
  }

  public getProduct(id: string): Observable<Product> {
    return this.facade.findProductByProductId(id);
  }

  get services$(): Observable<PaymentServicesResponse> {
    return this.facade.services$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  get hasServices$(): Observable<boolean> {
    return this.facade.hasServices$;
  }
}
