import { Component, Input } from '@angular/core';
import { SPI_MF } from '@app/commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-single-unregistered-key-button',
  templateUrl: './single-unregistered-key-button.component.html',
  styleUrls: ['./single-unregistered-key-button.component.sass']
})
export class SingleUnregisteredKeyButtonComponent {
  @Input() buttonLabel = '';
  @Input() avalTag: string = '';
  @Input() isWhite: boolean;
  constructor(private navCtrl: NavController) {}
  public goToBreB() {
    this.navCtrl.navigateForward(SPI_MF);
  }
  public editTagAval(): void {
    this.navCtrl.navigateForward(`customize-aval-tag/${this.avalTag}`);
  }
}
