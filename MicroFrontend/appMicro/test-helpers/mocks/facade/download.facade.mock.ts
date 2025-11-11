import { Injectable } from '@angular/core';
import { DownloadProperties } from '@commons/entities/download/download.entities';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DownloadFacadeMock extends AppFacadeMock {
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(false);

  public downloadFile(props: DownloadProperties): void {}

  public downloadClean(): void {}

  public toggleWorkingDownload(working: boolean): void {}
}
