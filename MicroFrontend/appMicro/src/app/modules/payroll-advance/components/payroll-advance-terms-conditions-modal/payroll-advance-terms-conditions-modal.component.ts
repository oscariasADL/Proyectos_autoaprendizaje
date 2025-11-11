import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'avv-payroll-advance-terms-conditions-modal',
  templateUrl: './payroll-advance-terms-conditions-modal.component.html',
  styleUrls: ['./payroll-advance-terms-conditions-modal.component.sass'],
  standalone: true,
  imports: [CommonModule, GlobalPipesModule]
})
export class PayrollAdvanceTermsConditionsModalComponent {
  textTerms: number[] = Array.from({ length: 17 }, (_, i) => i + 1);

  constructor(private modalCtrl: ModalController) {}

  public async closeModal(response = false): Promise<void> {
    await this.modalCtrl.dismiss(response);
  }
}
