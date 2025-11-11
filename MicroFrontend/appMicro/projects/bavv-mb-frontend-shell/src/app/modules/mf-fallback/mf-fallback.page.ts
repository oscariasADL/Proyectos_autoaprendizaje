import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import {
  HOME,
  REQUEST_PRODUCTS
} from '@app/commons/constants/navigate.constants';
import { HeaderType } from '@app/commons/entities/header/header.interface';
import { LinkKey } from '@app/commons/entities/parameters/links.entities';
import { AlertService } from '@app/commons/services/alert.service';
import {
  LogMessageDetails,
  LogSeverity
} from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import { REQUEST_PRODUCTS_ALERT } from '@app/modules/products/pages/request-products/constants/request-products.constants';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mf-fallback',
  templateUrl: './mf-fallback.page.html',
  styleUrls: ['./mf-fallback.page.sass']
})
export class MfFallbackPage implements OnInit, OnDestroy {
  public label = '';
  public isSPI = false;
  public headerType: HeaderType;
  public headerConfig = {
    whiteSecondary: HeaderType.whiteSecondary,
    redTertiary: HeaderType.redTertiary
  };

  private retryUrl = '';
  private externalUrl: LinkKey;
  private logManagerService = inject(LogManagerService);
  private error = '';

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private facade: AppFacade,
    private alertService: AlertService
  ) {
    this.initializeFromParams();
  }

  ngOnInit() {
    this.logError();
  }

  ngOnDestroy(): void {
    this.facade.disableLoading();
  }

  private initializeFromParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.label = params['label'];
      this.retryUrl = params['retryUrl'];
      this.isSPI = this.retryUrl.includes('spi');
      this.externalUrl = params['externalUrl'];
      this.error = params['error'];

      this.headerType = this.isSPI
        ? HeaderType.redTertiary
        : HeaderType.whiteSecondary;
    });
  }

  private logError(): void {
    const logMssg: LogMessageDetails = {
      severity: LogSeverity.ERROR,
      fileName: 'mf-fallback',
      functionName: `remote entry ${this.label}`,
      customMessage: `Error al cargar ${this.label}, ${this.retryUrl}, ${this.error}`
    };
    this.logManagerService.log(logMssg);
  }

  public openExternal(): void {
    this.alertService.create(REQUEST_PRODUCTS_ALERT).then((confirm) => {
      if (!!confirm) {
        this.facade.logout();
        this.facade.redirectExternal(this.externalUrl as LinkKey);
      }
    });
  }

  public goBack(): void {
    this.navCtrl.navigateForward(HOME);
  }

  public onRetry(): void {
    this.facade.enableLoading();
    this.navCtrl.navigateForward(this.retryUrl);

    setTimeout(() => {
      this.facade.disableLoading();
    }, 3000);
  }
}
