import { Observable } from 'rxjs';
import { groupBy, map, mergeMap, reduce, take, toArray } from 'rxjs/operators';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { GroupedCreditMovements } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';

export function groupMovements() {
  return function <T>(
    source: Observable<CreditMovement[]>
  ): Observable<GroupedCreditMovements[]> {
    return source.pipe(
      take(1),
      mergeMap((creditMovement: CreditMovement[]) => creditMovement),
      groupBy((creditMovement) =>
        format(new Date(creditMovement.purchaseDate), 'MMMM / yyyy', {
          locale: es
        })
      ),
      mergeMap((group$) =>
        group$.pipe(
          reduce((acc, cur) => [...acc, cur], [group$.key.toString()])
        )
      ),
      map<any, GroupedCreditMovements>(([date, ...values]) => ({
        date,
        values
      })),
      toArray()
    );
  };
}
