import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';
import { getFranchise } from '@modules/product/helpers/product.helper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-virtual-credit-card-reissue-success',
  templateUrl: './virtual-credit-card-reissue-success.component.html',
  styleUrls: ['./virtual-credit-card-reissue-success.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, GlobalPipesModule, PreloadImageDirective, DatePipe]
})
export class VirtualCreditCardReissueSuccessComponent {
  @Input() response: GenericResponse;
  @Input() numberProductTCV: string;

  constructor(private modalCtrl: ModalController) {}

  public closeModal(): void {
    void this.modalCtrl.dismiss();
  }

  get franchiseImage(): string {
    return `virtual-credit-card/virtual-credit-card-${getFranchise(
      this.numberProductTCV
    ).toLowerCase()}.png`;
  }
}
