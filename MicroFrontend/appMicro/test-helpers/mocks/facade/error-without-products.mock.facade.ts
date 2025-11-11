import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class ErrorWithoutProductsFacadeMock extends AppFacadeMock {
  public retries$: Observable<number> = new BehaviorSubject(3);

  countRetryAction(): void {}
}
