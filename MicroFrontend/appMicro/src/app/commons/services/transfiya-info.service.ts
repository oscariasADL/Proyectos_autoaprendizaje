import { Injectable } from '@angular/core';
import { TransfiyaInfoComponent } from '@commons/components/transfiya-info/transfiya-info.component';
import { ModalController } from '@commons/controllers/modal.controller';

@Injectable({
  providedIn: 'root'
})
export class TransfiyaInfoService {
  constructor(private modalCtrl: ModalController) {}

  public async showTransfiyaInfo(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TransfiyaInfoComponent,
      componentProps: { id: 'transfiya-info-modal' },
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    });
    await modal.present();
  }
}
