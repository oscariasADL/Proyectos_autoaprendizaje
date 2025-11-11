import { Pipe, PipeTransform } from '@angular/core';
import {
  PaymentBill,
  PaymentServiceCardItemInfo
} from '@modules/payments/payment-services/entities/payment-services.interface';

import { TranslateService } from '@ngx-translate/core';
import { Product } from '@commons/entities/product/product.interface';
import { mapPaymentServiceCardItemsInfo } from '@modules/payments/payment-services/mappers/payment-services.mapper';

@Pipe({
  name: 'serviceCard'
})
export class ServiceCardPipe implements PipeTransform {
  constructor(protected translate: TranslateService) {}

  transform(bill: PaymentBill, product: Product): PaymentServiceCardItemInfo[] {
    return mapPaymentServiceCardItemsInfo.bind(this, bill, product)();
  }
}
