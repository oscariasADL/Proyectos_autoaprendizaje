import { Component, OnInit } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  HOME,
  MEDIA_ACTIVATION_ACTIVATE_PRODUCT
} from '@commons/constants/navigate.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { InformationService } from '@commons/services/information.service';
import { NavController } from '@ionic/angular';
import { MediaActivationCardOptionsComponent } from '@modules/security/security-media-activation/components/media-activation-card-options/media-activation-card-options.component';
import { ActivateProductSteps } from '@modules/security/security-media-activation/store/security-media.state';
import { Observable } from 'rxjs';
import {
  MEDIA_CAN_BE_UNLOCKED,
  MEDIA_UNLOCKED_TYPE,
  SECURITY_MEDIA_ACTIVATION_INFO_ALERT
} from '../../constants/security-media-activation.constants';
import {
  ActivationProduct,
  ActivationStatusDescription,
  MediaActivationType
} from '../../entities/security-media.interface';
import { SecurityMediaActivationFacade } from '../../security-media-activation.facade';

@Component({
  selector: 'app-media-activation-home',
  templateUrl: './media-activation-home.component.html',
  styleUrls: ['./media-activation-home.component.sass']
})
export class MediaActivationHomeComponent implements OnInit {
  constructor(
    private facade: SecurityMediaActivationFacade,
    private informationService: InformationService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.facade.fetchProductsToActivate();
    this.informationService.showPanelIfNecessary(
      SECURITY_MEDIA_ACTIVATION_INFO_ALERT
    );
  }

  public async showInformation(): Promise<void> {
    await this.informationService.showPanel(
      SECURITY_MEDIA_ACTIVATION_INFO_ALERT
    );
  }

  public activateProduct(id: string): void {
    this.facade.setMediaActivationType(MediaActivationType.ActivateCard);
    this.navigateProduct(id);
  }

  public unlockProduct(product: ActivationProduct): void {
    this.facade.activateProductSetStep(
      product.status.toLowerCase() ===
        ActivationStatusDescription.BLOCKED.toLowerCase()
        ? ActivateProductSteps.unblockProduct
        : ActivateProductSteps.unlockInfo
    );
    this.facade.setMediaActivationType(MEDIA_UNLOCKED_TYPE[product.status]);
    this.navigateProduct(product.id);
  }

  public navigateProduct(id: string): void {
    this.navCtrl.navigateForward([...MEDIA_ACTIVATION_ACTIVATE_PRODUCT, id]);
  }

  public async showOptions(product: ActivationProduct): Promise<void> {
    const presentModel = await this.modalCtrl.create({
      component: MediaActivationCardOptionsComponent,
      componentProps: { id: 'media-activation-card-options-modal', product },
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });

    presentModel.onWillDismiss().then(({ data }) => {
      if (!isNullOrUndefined(data)) {
        switch (data?.type) {
          case MediaActivationType.BlockTemporary:
            this.facade.activateProductSetStep(
              ActivateProductSteps.blockTemporary
            );
            this.facade.setMediaActivationType(
              MediaActivationType.BlockTemporary
            );
            this.navigateProduct(product.id);
            break;
          case MediaActivationType.BlockCard:
            this.facade.activateProductSetStep(ActivateProductSteps.block);
            this.facade.setMediaActivationType(MediaActivationType.BlockCard);
            this.navigateProduct(product.id);
            break;
          case MediaActivationType.ConfigurePassword:
            this.facade.activateProductSetStep(ActivateProductSteps.password);
            this.facade.setMediaActivationType(
              MediaActivationType.ConfigurePassword
            );
            this.navigateProduct(product.id);
            break;
        }
      }
    });

    return await presentModel.present();
  }

  public optionIcon(product: ActivationProduct): string {
    if (
      product.status.toLowerCase() ===
      ActivationStatusDescription.ACTIVE.toLowerCase()
    ) {
      return 'icon-tres_puntos';
    } else if (this.isProductForUnlock(product)) {
      return 'icon-next';
    }
    return null;
  }

  public isProductForUnlock(product: ActivationProduct): boolean {
    return (
      MEDIA_CAN_BE_UNLOCKED.includes(product.status.toLowerCase()) ||
      this.isProductForUnblock(product)
    );
  }

  public isProductForUnblock(product: ActivationProduct): boolean {
    return (
      product.status.toLowerCase() ===
        ActivationStatusDescription.BLOCKED.toLowerCase() &&
      product.parentType === TypeAccount.SDA
    );
  }

  public goHome(): void {
    this.navCtrl.navigateRoot(HOME);
  }

  get productList$(): Observable<ActivationProduct[]> {
    return this.facade.productList$;
  }

  get productToActivate$(): Observable<ActivationProduct[]> {
    return this.facade.productsToActivate$;
  }

  get otherProducts$(): Observable<ActivationProduct[]> {
    return this.facade.productsOtherProducts$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }
}
