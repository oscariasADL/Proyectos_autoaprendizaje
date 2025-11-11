import { Injectable } from '@angular/core';
import { AlertInfoComponent } from '@commons/components/alert-info/alert-info.component';
import { AlertComponent } from '@commons/components/alert/alert.component';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { AlertSheetComponent } from '@commons/components/alert-sheet/alert-sheet.component';
import { AlertOptionsComponent } from '@commons/components/alert-options/alert-options.component';
import { AlertBigPictureComponent } from '../components/alert-big-picture/alert-big-picture.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert: HTMLIonModalElement;
  private readonly componentTypeMap = {
    [AlertComponentType.alertCenter]: AlertComponent,
    [AlertComponentType.alertInfo]: AlertInfoComponent,
    [AlertComponentType.alertOptions]: AlertOptionsComponent,
    [AlertComponentType.alertBigPicture]: AlertBigPictureComponent
  };

  constructor(private modalCtrl: ModalController) {}

  public async create(props: AlertSheetProperties): Promise<any> {
    const component =
      this.componentTypeMap[props?.componentType] || AlertSheetComponent;
    const cssClass =
      props?.componentType === AlertComponentType.alertCenter
        ? 'avv-custom-center-modal'
        : 'avv-custom-modal';
    const mode = 'md';

    const presentModel = await this.modalCtrl.create({
      id: props.id,
      component,
      componentProps: { props },
      cssClass,
      mode
    });

    this.alert = presentModel;

    await presentModel.present();

    return presentModel.onWillDismiss().then(({ data }) => {
      if (data || data === false) {
        this.alert = null;
        return Promise.resolve(data);
      }
    });
  }

  public async close(): Promise<void> {
    if (this.alert) {
      this.alert.dismiss();
    } else if (await this.modalCtrl.getTop()) {
      this.modalCtrl.dismiss();
    }

    this.alert = null;
  }

  get alreadyPresent(): boolean {
    return !!this.alert;
  }
}
