import { Pipe, PipeTransform } from '@angular/core';
import { PaymentCard } from '@modules/shared/entities/payment-card.interface';
import { PaymentCredit } from '../entities/payment-credits.interface';
import { mapCreditCard } from '../mappers/payment-credits.mapper';

@Pipe({
  name: 'paymentCreditCard'
})
export class PaymentCreditCardPipe implements PipeTransform {
  transform(credit: PaymentCredit): PaymentCard {
    return mapCreditCard(credit);
  }
}
