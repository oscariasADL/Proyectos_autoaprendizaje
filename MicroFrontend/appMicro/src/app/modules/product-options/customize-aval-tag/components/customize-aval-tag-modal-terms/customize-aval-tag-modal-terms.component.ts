import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TermsAndConditions } from '@store/state/parameter.state';

@Component({
  selector: 'app-customize-aval-tag-modal-terms',
  templateUrl: './customize-aval-tag-modal-terms.component.html',
  styleUrls: ['./customize-aval-tag-modal-terms.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CustomizeAvalTagModalTermsComponent {
  @Input() termsAndConditions: TermsAndConditions;

  constructor(private modalCtrl: ModalController) {}

  public closeModal() {
    void this.modalCtrl.dismiss();
  }
}
