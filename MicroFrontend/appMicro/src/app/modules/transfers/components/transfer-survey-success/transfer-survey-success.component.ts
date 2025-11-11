import { Component } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-transfer-survey-success',
  templateUrl: './transfer-survey-success.component.html',
  styleUrls: ['./transfer-survey-success.component.sass']
})
export class TransferSurveySuccessComponent {
  constructor(private modalCtrl: ModalController) {}

  public closeModal(modalData: boolean = false) {
    this.modalCtrl.dismiss(modalData);
  }
}
