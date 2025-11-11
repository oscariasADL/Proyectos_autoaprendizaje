import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VoucherState } from '@commons/components/modal/entities/modal.interface';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-generic-form-confirm',
  templateUrl: './generic-form-confirm.component.html',
  styleUrls: ['./generic-form-confirm.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericFormConfirmComponent {
  @Input() data: VoucherState;

  constructor(private modalCtrl: ModalController) {}

  public closeModal(confirm: boolean = false): void {
    this.modalCtrl.dismiss(confirm);
  }
}
