import { Component } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-transfer-survey-exit',
  templateUrl: './transfer-survey-exit.component.html',
  styleUrls: ['./transfer-survey-exit.component.sass']
})
export class TransferSurveyExitComponent {
  constructor(private modalCtrl: ModalController) {}

  public closeModal(modalData: boolean = false) {
    this.modalCtrl.dismiss(modalData);
  }
}
