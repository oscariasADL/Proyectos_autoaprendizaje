import { Injectable } from '@angular/core';
import {
  RemoveTrustRelationPayload,
  TrustRelationItem
} from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '@commons/entities/product/product.interface';

@Injectable()
export class TransfersTrustRelationFacadeMock extends AppFacadeMock {
  public trustRelations$: Observable<TrustRelationItem[]> = new BehaviorSubject(
    null
  );

  public products$: Observable<Product[]> = new BehaviorSubject(null);

  public hasValidProducts$: Observable<boolean> = new BehaviorSubject(false);

  public trustRelationsWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public trustRelationsCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchTrustRelations(): void {}

  public removeTrustRelation(
    payload: RemoveTrustRelationPayload,
    product: Product
  ): void {}
}
