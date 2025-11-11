import { Component } from '@angular/core';
import { SERVICES } from '@commons/constants/navigate.constants';

@Component({
  selector: 'app-payment-services-create-scheduling',
  templateUrl: './payment-services-create-scheduling.page.html',
  styleUrls: ['./payment-services-create-scheduling.page.sass']
})
export class PaymentServicesCreateSchedulingPage {
  get closeUrl(): string {
    return SERVICES[0];
  }
}
