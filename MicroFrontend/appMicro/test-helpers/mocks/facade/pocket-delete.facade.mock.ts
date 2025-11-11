import { Injectable } from '@angular/core';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class PocketDeleteFacadeMock extends AppFacadeMock {
  public deletePocketConfirm(pocket: Pocket): void {}

  public deletePocketStatus(payload: PocketDetailPayload): void {}
}
