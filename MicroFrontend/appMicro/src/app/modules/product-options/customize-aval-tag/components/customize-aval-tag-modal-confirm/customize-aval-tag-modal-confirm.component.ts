import { Component, Input } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { UpperCasePipe } from '@angular/common';
import { ModalController } from '@commons/controllers/modal.controller';
import { TAG_AVAL_CONFIRM_CUSTOMIZATION_EVENT } from '../../constants/customize-aval-tag.constants';
import { CommonsModule } from '@app/commons/commons.module';

@Component({
  selector: 'app-customize-aval-tag-modal-confirm',
  templateUrl: './customize-aval-tag-modal-confirm.component.html',
  styleUrls: ['./customize-aval-tag-modal-confirm.component.sass'],
  standalone: true,
  imports: [GlobalPipesModule, UpperCasePipe, CommonsModule]
})
export class CustomizeAvalTagModalConfirmComponent {
  @Input() id: string;
  @Input() avalTag: string;
  @Input() product: string;

  public TAG_AVAL_CONFIRM_CUSTOMIZATION_EVENT =
    TAG_AVAL_CONFIRM_CUSTOMIZATION_EVENT;

  constructor(private modalCtrl: ModalController) {}

  public closeModal(response = false) {
    void this.modalCtrl.dismiss(response, null, this.id);
  }
}
