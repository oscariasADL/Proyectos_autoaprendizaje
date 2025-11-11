import { Component, Input } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.sass'],
  standalone: true,
  imports: [GlobalPipesModule, UpperCasePipe]
})
export class ModalErrorComponent {
  @Input() id: string;
  @Input() title: string;
  @Input() message: string;
  @Input() buttonPrimary: string;
  @Input() buttonSecondary: string;

  constructor(private modalCtrl: ModalController) {}

  public closeModal(response: boolean) {
    void this.modalCtrl.dismiss(response, null, this.id);
  }
}
