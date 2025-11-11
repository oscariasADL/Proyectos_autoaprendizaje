import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { AppFacade } from '@app/app.facade';

import { ModalController } from '@commons/controllers/modal.controller';
import { StartWalletModalProps } from '@modules/wallets/entities/wallets.interface';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';
import { TermsAndConditionsKey } from '@commons/entities/parameters/terms-and-conditions.entities';
import { TermsAndConditionsComponent } from '@commons/components/terms-and-conditions/terms-and-conditions.component';
import { Platform } from '@commons/constants/global.constants';

@Component({
  selector: 'app-start-wallet-modal',
  templateUrl: './start-wallet-modal.component.html',
  styleUrls: [
    './start-wallet-modal.component.sass',
    '../../styles/google-wallet-btn.sass'
  ],
  standalone: true,
  imports: [FormsModule, GlobalPipesModule, CommonModule],
  providers: [AppFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartWalletModalComponent {
  @Input() startWalletModalProps: StartWalletModalProps;

  public acceptConditions = false;
  public readonly platform = Platform;

  constructor(
    private modalCtrl: ModalController,
    private secureStorage: AdlSecureStorageService,
    private facade: AppFacade
  ) {}

  public async closeModal(state: boolean = false): Promise<void> {
    if (state) {
      await this.secureStorage.put(
        SecureKeys.walletConditions,
        `true;${Date.now()}`,
        true
      );
    }
    await this.modalCtrl.dismiss(state);
  }

  public async showTermsAndConditions(): Promise<void> {
    const termsAndCond = this.facade.termsAndConditionsByKey(
      TermsAndConditionsKey.WALLETS
    );
    const modal = await this.modalCtrl.create({
      component: TermsAndConditionsComponent,
      id: 'wallet-terms-and-conditions-modal',
      componentProps: { ...termsAndCond }
    });
    await modal.present();
  }
}
