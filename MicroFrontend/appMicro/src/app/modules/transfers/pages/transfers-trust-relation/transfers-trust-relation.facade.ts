import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { TypeProduct } from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  hasProductsSelector,
  productsSelector
} from '@modules/product/store/product.selector';
import {
  RemoveTrustRelationPayload,
  TrustRelationItem
} from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';
import {
  fetchTrustRelationsAction,
  removeTrustRelationAction
} from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.actions';
import {
  trustRelationsCompletedSelector,
  trustRelationsSelector,
  trustRelationsWorkingSelector
} from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class TransfersTrustRelationFacade extends AppFacade {
  public products$: Observable<Product[]> = this.store.pipe(
    select(productsSelector(), {
      typeProduct: TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS,
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    })
  );

  public hasValidProducts$: Observable<boolean> = this.store.pipe(
    select(hasProductsSelector(), {
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    })
  );

  public trustRelations$: Observable<TrustRelationItem[]> = this.store.pipe(
    select(trustRelationsSelector)
  );

  public trustRelationsWorking$: Observable<boolean> = this.store.pipe(
    select(trustRelationsWorkingSelector)
  );

  public trustRelationsCompleted$: Observable<boolean> = this.store.pipe(
    select(trustRelationsCompletedSelector)
  );

  public fetchTrustRelations(product: Product): void {
    this.store.dispatch(fetchTrustRelationsAction({ product }));
  }

  public removeTrustRelation(
    payload: RemoveTrustRelationPayload,
    product: Product
  ): void {
    this.store.dispatch(removeTrustRelationAction({ payload, product }));
  }
}
