import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ConfirmationModalContent } from '@modules/product-options/block-card-temporarily/entities/block-card-temporarily.interface';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-block-card-temporarily-confirmation-modal',
  templateUrl: './block-card-temporarily-confirmation-modal.component.html',
  styleUrls: ['./block-card-temporarily-confirmation-modal.component.sass'],
  standalone: true,
  imports: [CommonModule, GlobalPipesModule]
})
export class BlockCardTemporarilyConfirmationModalComponent {
  @Input() confirmationModalContent: ConfirmationModalContent;

  constructor(private modalCtrl: ModalController) {}

  public async closeModal(response = false): Promise<void> {
    await this.modalCtrl.dismiss(response);
  }
}
