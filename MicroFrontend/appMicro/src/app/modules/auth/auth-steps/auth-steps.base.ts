import { Injector } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HOME } from '@commons/constants/navigate.constants';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import { NavController, Platform } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AUTH_STEPS_EXIT_DATA } from '@modules/auth/auth-steps/constants/auth-steps.constants';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export class AuthStepsBase {
  protected router: Router;
  protected platform: Platform;
  protected route: ActivatedRoute;
  protected navCtrl: NavController;
  protected facade: AuthStepsFacade;
  protected formBuilder: UntypedFormBuilder;
  protected alertService: AlertService;
  protected subscription: Subscription;
  protected translate: TranslateService;
  protected analytics: AnalyticsService;
  protected secureStorage: AdlSecureStorageService;

  constructor(protected injector: Injector) {
    this.router = this.injector.get<Router>(Router);
    this.platform = this.injector.get<Platform>(Platform);
    this.route = this.injector.get<ActivatedRoute>(ActivatedRoute);
    this.navCtrl = this.injector.get<NavController>(NavController);
    this.formBuilder =
      this.injector.get<UntypedFormBuilder>(UntypedFormBuilder);
    this.facade = this.injector.get<AuthStepsFacade>(AuthStepsFacade);
    this.alertService = this.injector.get<AlertService>(AlertService);
    this.translate = this.injector.get<TranslateService>(TranslateService);
    this.analytics = this.injector.get<AnalyticsService>(AnalyticsService);
    this.secureStorage = this.injector.get<AdlSecureStorageService>(
      AdlSecureStorageService
    );
  }

  ionViewWillEnter(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => this.showExitModal()
    );
  }

  ionViewWillLeave(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public showExitModal(): void {
    this.alertService.create(AUTH_STEPS_EXIT_DATA).then((confirm) => {
      if (!!confirm) {
        this.closeModal();
      }
    });
  }

  public closeModal(): void {
    this.navCtrl.navigateBack(HOME);
  }
}
