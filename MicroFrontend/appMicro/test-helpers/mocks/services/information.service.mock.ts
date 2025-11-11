import { Injectable } from '@angular/core';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';

@Injectable()
export class InformationServiceMock {
  public showPanelIfNecessary(props: AlertSheetProperties): Promise<any> {
    return Promise.resolve();
  }

  public showPanel(props: AlertSheetProperties): Promise<any> {
    return Promise.resolve();
  }
}
