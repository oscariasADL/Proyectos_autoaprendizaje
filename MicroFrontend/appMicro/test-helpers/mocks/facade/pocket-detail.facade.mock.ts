import { Injectable } from '@angular/core';
import {
  Pocket,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { PocketFactory } from '@testing/factories/pocket.factory';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class PocketDetailFacadeMock extends AppFacadeMock {
  public pocket$: Observable<Pocket> = new BehaviorSubject(
    new PocketFactory().create()
  );

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(true);

  public fetchPocketDetail(payload: PocketDetailPayload): void {}

  public deletePocket(payload: PocketWithReturns): void {}
}
