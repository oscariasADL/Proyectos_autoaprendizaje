import { Injectable } from '@angular/core';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { CancelAccountPayload } from '@modules/product-options/cancel-account/entities/cancel-account.interface';

@Injectable()
export class CancelAccountFacadeMock extends AppFacadeMock {
  public cancelAccount(cancelAccountPayload: CancelAccountPayload): void {}
}
