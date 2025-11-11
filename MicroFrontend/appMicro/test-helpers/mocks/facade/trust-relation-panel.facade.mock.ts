import { Injectable } from '@angular/core';
import { TransfiyaPayload } from '@modules/transfers/entities/transfers.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TrustRelationPanelFacadeMock extends AppFacadeMock {
  public currentPayload$: Observable<TransfiyaPayload> = new BehaviorSubject(
    null
  );

  public trustRelationPanelWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public trustRelationPanelCompleted$: Observable<boolean> =
    new BehaviorSubject(false);

  public setTrustRelation(payload: TransfiyaPayload): void {}

  public resetTrustRelation(): void {}
}
