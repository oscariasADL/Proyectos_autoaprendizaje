import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeadersModule } from '@commons/components/headers/headers.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.sass'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [IonicModule, HeadersModule, GlobalPipesModule, UpperCasePipe]
})
export class TermsAndConditionsComponent {
  @Input() title: string;
  @Input() content: string;

  constructor(private modalCtrl: ModalController) {}

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss();
  }
}
