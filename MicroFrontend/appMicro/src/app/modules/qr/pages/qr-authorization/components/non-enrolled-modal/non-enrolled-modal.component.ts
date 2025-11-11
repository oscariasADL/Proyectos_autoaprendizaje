import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-non-enrolled-modal',
  templateUrl: './non-enrolled-modal.component.html',
  styleUrls: ['./non-enrolled-modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NonEnrolledModalComponent {
  constructor(private modalCtrl: ModalController) {}

  public closeModal(): void {
    void this.modalCtrl.dismiss();
  }
}
