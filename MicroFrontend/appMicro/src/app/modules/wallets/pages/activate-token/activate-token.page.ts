import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActivateTokenFacade } from '@modules/wallets/pages/activate-token/activate-token.facade';
import { InfoActivationData } from '@modules/wallets/pages/activate-token/entities/activate-token.interface';
import {
  ACTIVATION_ERROR,
  ACTIVATION_SUCCESS
} from '@modules/wallets/pages/activate-token/constants/activate-token.constants';
import { HOME } from '@commons/constants/navigate.constants';

@Component({
  selector: 'app-activate-token',
  templateUrl: './activate-token.page.html',
  styleUrls: ['./activate-token.page.sass']
})
export class ActivateTokenPage implements OnInit {
  public infoActivationData$: Observable<InfoActivationData> =
    this.facade.isActivated$.pipe(
      map((isActivated) =>
        isActivated ? ACTIVATION_SUCCESS : ACTIVATION_ERROR
      )
    );

  constructor(
    private navCtrl: NavController,
    private facade: ActivateTokenFacade
  ) {}

  ngOnInit(): void {
    this.facade.fetchLastToken();
  }

  public closeAction(): void {
    void this.navCtrl.navigateRoot(HOME, { replaceUrl: true });
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }

  get isActivated$(): Observable<boolean> {
    return this.facade.isActivated$;
  }
}
