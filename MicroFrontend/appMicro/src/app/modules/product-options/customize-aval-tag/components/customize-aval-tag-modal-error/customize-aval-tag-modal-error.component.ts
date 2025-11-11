import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ModalController } from '@commons/controllers/modal.controller';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@Component({
  selector: 'app-customize-aval-tag-modal-error',
  templateUrl: './customize-aval-tag-modal-error.component.html',
  styleUrls: ['./customize-aval-tag-modal-error.component.sass'],
  standalone: true,
  imports: [GlobalPipesModule, UpperCasePipe]
})
export class CustomizeAvalTagModalErrorComponent {
  @Input() avalTag: string;

  constructor(private modalCtrl: ModalController) {}

  public closeModal() {
    void this.modalCtrl.dismiss();
  }
}
