import { Injectable } from '@angular/core';
import { trackModalEvent } from '@commons/helpers/event.helpers';
import { ModalController as ModalCtrl } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class ModalController extends ModalCtrl {
  public create(opts: ModalOptions): Promise<HTMLIonModalElement> {
    trackModalEvent(opts?.componentProps?.props?.id || 'modal');
    return super.create(opts);
  }
}
