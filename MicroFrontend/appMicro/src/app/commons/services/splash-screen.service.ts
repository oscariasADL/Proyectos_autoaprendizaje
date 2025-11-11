import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {
  private splashHidden: boolean = false;

  constructor(private facade: AppFacade) {}

  public async hideSplashScreen(): Promise<void> {
    if (!this.splashHidden) {
      setTimeout(async () => {
        await SplashScreen.hide({
          fadeOutDuration: 500
        });
        this.facade.appLoaded();
      }, 2000);
    }
  }
}
