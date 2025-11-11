import { Injectable } from '@angular/core';
import { Adviser } from '@modules/care-channels/entities/adviser.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class CareChannelsFacadeMock extends AppFacadeMock {
  public adviser$: Observable<Adviser> = new BehaviorSubject(null);
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public fetchAdviser(): void {}
}
