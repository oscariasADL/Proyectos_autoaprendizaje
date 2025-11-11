import { Component, Input } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-cancel-account-modal',
  templateUrl: './cancel-account-modal.component.html',
  styleUrls: ['./cancel-account-modal.component.sass']
})
export class CancelAccountModalComponent {
  @Input() hasDigitalDebitCard: boolean;

  constructor(private modalCtrl: ModalController) {}

  public async closeModal(state: boolean = false): Promise<void> {
    await this.modalCtrl.dismiss(state);
  }
}
