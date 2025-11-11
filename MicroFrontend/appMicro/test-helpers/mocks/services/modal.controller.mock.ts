import { Injectable } from '@angular/core';
import { ModalOptions } from '@ionic/core';

@Injectable()
export class ModalControllerMock {
  public create(opts: ModalOptions): Promise<Partial<HTMLIonModalElement>> {
    return Promise.resolve({
      present: () => Promise.resolve(),
      onWillDismiss: () => Promise.resolve(null),
      onDidDismiss: () => Promise.resolve(null)
    });
  }

  public async present(): Promise<void> {
    return Promise.resolve();
  }

  public async onDidDismiss(): Promise<any> {
    return Promise.resolve();
  }

  public async dismiss(): Promise<void> {
    return Promise.resolve();
  }
}
