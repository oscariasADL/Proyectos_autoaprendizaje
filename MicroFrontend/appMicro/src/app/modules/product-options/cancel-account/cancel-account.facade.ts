import { AppFacade } from '@app/app.facade';
import { Injectable } from '@angular/core';
import { cancelAccountAction } from '@modules/product-options/cancel-account/store/cancel-account.actions';
import { CancelAccountPayload } from '@modules/product-options/cancel-account/entities/cancel-account.interface';

@Injectable()
export class CancelAccountFacade extends AppFacade {
  public cancelAccount(cancelAccountPayload: CancelAccountPayload): void {
    this.store.dispatch(cancelAccountAction({ cancelAccountPayload }));
  }
}
