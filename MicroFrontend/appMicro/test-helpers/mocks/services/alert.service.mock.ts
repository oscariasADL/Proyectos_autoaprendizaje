import { Injectable } from '@angular/core';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';

@Injectable()
export class AlertServiceMock {
  private alert: HTMLIonModalElement;

  public async create(props: AlertSheetProperties): Promise<any> {
    return Promise.resolve(null);
  }

  public close(): void {}

  get alreadyPresent(): boolean {
    return true;
  }
}
