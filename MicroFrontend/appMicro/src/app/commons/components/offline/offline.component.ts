import { Component, OnInit } from '@angular/core';
import { LOGIN } from '@app/commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.sass']
})
export class OfflineComponent {
  constructor(private navCtrl: NavController) {}

  public returnToLogin() {
    this.navCtrl.navigateForward(LOGIN);
  }
}
