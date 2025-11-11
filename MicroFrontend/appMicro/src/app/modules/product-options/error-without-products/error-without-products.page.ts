import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOME } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ErrorWithoutProductsFacade } from './error-without-products.facade';

@Component({
  selector: 'app-error-without-products',
  templateUrl: './error-without-products.page.html',
  styleUrls: ['./error-without-products.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorWithoutProductsPage {
  constructor(
    private facade: ErrorWithoutProductsFacade,
    private navCtrl: NavController
  ) {}

  public onRetry(): void {
    this.navCtrl.navigateRoot(HOME);
    this.facade.countRetryAction();
  }

  public logout(): void {
    this.facade.logout();
  }

  get retries$(): Observable<number> {
    return this.facade.retries$;
  }
}
