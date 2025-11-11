import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { VoucherState } from '../../entities/modal.interface';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmComponent {
  @Input() data: VoucherState;

  constructor(private modalCtrl: ModalController) {}

  public closeModal(confirm: boolean = false): void {
    this.modalCtrl.dismiss(confirm);
  }
}
