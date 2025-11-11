import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { APP_STORE_URl } from '@commons/constants/app-store.constants';
import { HOME } from '@commons/constants/navigate.constants';
import { NewAppUpdateService } from '@commons/services/new-app-update.service';
import { OnboardingService } from '@commons/services/onboarding.service';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { NavController } from '@ionic/angular';
import { NewUpdateFacade } from '@modules/new-update/new-update.facade';

@Component({
  selector: 'app-new-update',
  templateUrl: './new-update.page.html',
  styleUrls: ['./new-update.page.sass']
})
export class NewUpdatePage {
  constructor(
    private navCtrl: NavController,
    private facade: NewUpdateFacade,
    private splashScreen: SplashScreenService,
    private newUpdateService: NewAppUpdateService,
    private onboardingService: OnboardingService
  ) {}

  ionViewDidEnter(): void {
    void this.splashScreen.hideSplashScreen();
  }

  public closeModal(): void {
    void this.newUpdateService.skipOptionalUpdate();
    void this.navCtrl.navigateRoot(HOME);
    void this.onboardingService.checkOnboarding();
  }

  public goToAppStore(platform: string): void {
    this.facade.redirectExternal(APP_STORE_URl[platform]);
  }

  get isRequiredUpdate(): boolean {
    return this.newUpdateService.isMandatoryUpdate;
  }

  get isIOS(): boolean {
    return Capacitor.getPlatform() === 'ios';
  }
}
