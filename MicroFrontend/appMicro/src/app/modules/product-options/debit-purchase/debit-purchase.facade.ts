import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  BANK_GROUP,
  BankListDecision
} from '@commons/constants/card.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { ParameterType } from '@store/state/parameter.state';
import { map } from 'rxjs/operators';
import { DebtPurchasePayload } from './entities/debit-purchase.interface';
import { debitPurchaseAction } from './store/debit-purchase.actions';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { setProductSelectedAction } from '@modules/product-detail/store/product-detail.actions';

@Injectable()
export class DebitPurchaseFacade extends AppFacade {
  get codeBanks$(): Observable<DropdownList[]> {
    const INVALID_BANK_LIST = [
      BANK_GROUP.VILLAS_CODE,
      BANK_GROUP.MASTERCARD_CODE,
      BANK_GROUP.VISA_CODE
    ];
    return this.parameterByKey(ParameterType.codeBanks).pipe(
      map((list: any[]) =>
        list
          .filter(({ codigo }) => !INVALID_BANK_LIST.includes(codigo))
          .filter(
            ({ compraCartera }) =>
              isNullOrUndefined(compraCartera) ||
              compraCartera === BankListDecision.YES
          )
          .map((item) => ({ value: item.codigo, label: item.entidad }))
      )
    );
  }

  public sendDebitPurchase(
    payload: DebtPurchasePayload,
    data: AlertStepData
  ): void {
    this.store.dispatch(debitPurchaseAction({ payload, data }));
  }

  public setProductSelected(product: ProductDetail): void {
    this.store.dispatch(setProductSelectedAction({ product }));
  }
}
