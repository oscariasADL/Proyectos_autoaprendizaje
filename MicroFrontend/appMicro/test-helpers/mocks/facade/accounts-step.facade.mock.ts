import { Injectable } from '@angular/core';
import { Balance } from '@commons/entities/product/balance.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AccountsStepFacadeMock extends AppFacadeMock {
  public balance$: Observable<Balance[]> = new BehaviorSubject([]);
}
