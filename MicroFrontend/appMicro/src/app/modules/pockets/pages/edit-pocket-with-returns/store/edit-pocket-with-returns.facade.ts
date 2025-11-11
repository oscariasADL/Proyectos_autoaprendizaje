import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';

import { UpdatePocketWithReturnsPayload } from '../../pocket-detail-with-returns/entities/pocket-detail.interface';
import { pocketWithReturnsEditAction } from './edit-pocket-with-returns.actions';
import { PocketWithReturnsDetailPayload } from '../../pocket-detail/entities/pocket-detail.interface';

@Injectable()
export class EditPocketWithReturnsFacade extends AppFacade {
  public updatePocketWithReturns(
    payload: UpdatePocketWithReturnsPayload,
    detail: PocketWithReturnsDetailPayload,
    backUrl: string
  ): void {
    this.store.dispatch(
      pocketWithReturnsEditAction({ payload, detail, backUrl })
    );
  }
}
