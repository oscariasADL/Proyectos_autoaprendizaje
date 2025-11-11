import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { NavController } from '@ionic/angular';
import { Injector } from '@angular/core';

export class ActivateDigitalDebitCardBase extends GenericStepperBase {
  protected navCtrl: NavController;

  constructor(protected injector: Injector) {
    super(injector);
    this.navCtrl = this.injector.get<NavController>(NavController);
  }
}
