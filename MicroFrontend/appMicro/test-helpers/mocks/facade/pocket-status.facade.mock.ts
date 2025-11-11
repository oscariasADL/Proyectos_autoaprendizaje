import { Injectable } from '@angular/core';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class PocketStatusFacadeMock extends AppFacadeMock {
  public updatePocketConfirm(pocket: Pocket): void {}

  public updatePocketStatus(
    payload: UpdatePocketPayload,
    detail: PocketDetailPayload
  ): void {}
}
