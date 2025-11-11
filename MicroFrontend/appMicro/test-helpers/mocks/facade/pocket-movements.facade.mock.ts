import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PocketMovement } from '@app/commons/entities/product/movement.interface';
import { PocketMovementPayload } from '@modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class PocketMovementsFacadeMock extends AppFacadeMock {
  public movements$: Observable<PocketMovement[]> = new BehaviorSubject([]);

  public working: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(true);

  public fetchPocketMovements(payload: PocketMovementPayload): void {}
}
