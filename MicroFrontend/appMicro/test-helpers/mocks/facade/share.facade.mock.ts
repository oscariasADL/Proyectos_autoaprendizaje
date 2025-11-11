import { Injectable } from '@angular/core';
import { ShareProperties } from '@commons/entities/share/share.entities';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ShareFacadeMock extends AppFacadeMock {
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(false);

  public shareFile(props: ShareProperties): void {}

  public shareFileClean(): void {}

  public toggleWorkingShare(working: boolean): void {}
}
