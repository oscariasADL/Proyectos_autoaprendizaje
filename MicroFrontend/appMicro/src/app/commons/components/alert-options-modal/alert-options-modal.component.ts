import { Component, Input } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { NgForOf } from '@angular/common';
import { ModalController } from '@commons/controllers/modal.controller';

interface Option {
  id: string;
  icon: string;
  text: string;
  callback: () => void;
}

@Component({
  selector: 'app-alert-options-modal',
  templateUrl: './alert-options-modal.component.html',
  styleUrls: ['./alert-options-modal.component.sass'],
  imports: [GlobalPipesModule, NgForOf],
  standalone: true
})
export class AlertOptionsModalComponent {
  @Input() title: string;
  @Input() options: Option[];

  constructor(private modalCtrl: ModalController) {}

  public closeModal(): void {
    void this.modalCtrl.dismiss();
  }
}
