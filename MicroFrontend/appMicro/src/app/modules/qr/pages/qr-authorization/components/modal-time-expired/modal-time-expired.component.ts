import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular';

import { ModalController } from '@commons/controllers/modal.controller';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-time-expired',
  templateUrl: './modal-time-expired.component.html',
  styleUrls: ['./modal-time-expired.component.sass'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, GlobalPipesModule]
})
export class ModalTimeExpiredComponent {
  constructor(private modalCtrl: ModalController) {}

  public async closeModal(data: any = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }
}
