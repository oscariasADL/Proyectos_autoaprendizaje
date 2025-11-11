import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { QrAuthorizationFacade } from '@modules/qr/pages/qr-authorization/qr-authorization.facade';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { mapDecryptedData } from '@modules/qr/pages/qr-authorization/mappers/qr-authorization.mapper';
import { ModalTimeExpiredComponent } from './components/modal-time-expired/modal-time-expired.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { FA2Payload } from '@app/commons/entities/notifications/notification.entities';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { ModalTimeExpiredSameDeviceComponent } from './components/modal-time-expired-same-device/modal-time-expired-same-device.component';

@Component({
  selector: 'app-qr-authorization',
  templateUrl: './qr-authorization.page.html',
  styleUrls: ['./qr-authorization.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrAuthorizationPage implements OnInit, OnDestroy {
  public timer: ReturnType<typeof setInterval>;
  public timeValue: number;
  public counter: number = 0;
  private dynamicCodeSubscription: Subscription;
  private destroy$ = new Subject<void>();
  private modalCtrl = inject(ModalController);
  public hasToken = false;
  private routeParams: Params = {};
  public timeStamp: number =
    new Date().getTime() +
    this.facade.boundsByKey(ParameterKey.qrAuthorizationMaxOtpTime) * 1000;
  constructor(
    private cdRef: ChangeDetectorRef,
    private facade: QrAuthorizationFacade,
    private route: ActivatedRoute,
    private secureStorage: AdlSecureStorageService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.routeParams = params;
      const dateString = params['timestamp'];

      if (dateString) {
        this.timeStamp =
          new Date(dateString).getTime() +
          this.facade.boundsByKey(ParameterKey.qrAuthorizationMaxOtpTime) *
            1000;
        this.updateTimeValue();
        const token = params['token'];
        if (token) {
          this.hasToken = true;
        }
      }
    });
  }

  public async handleToken() {
    const params = this.routeParams;
    const token = params['token'];

    if (token) {
      const secretQr = this.facade.dynamicCode$.currentValue();

      try {
        const db = await this.secureStorage.getAll();
        const { document } = JSON.parse(getDBValue(db, SecureKeys.loginData));
        const txId = params['txId'];
        const payload: FA2Payload = {
          document,
          secretQr,
          txId
        };
        this.facade.closeToast();
        this.facade.validate2FA(payload);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  ngOnInit(): void {
    this.dynamicCodeSubscription = this.dynamicCode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.initCountdown();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.facade.closeToast();
    clearInterval(this.timer);
    if (this.dynamicCodeSubscription) {
      this.dynamicCodeSubscription.unsubscribe();
    }
  }

  private updateTimeValue(): void {
    const currentTimestamp = Date.now();
    const timeRemaining = this.timeStamp - currentTimestamp;
    this.timeValue = Math.floor(timeRemaining / 1000);
    this.timeValue = this.timeValue < 0 ? 0 : this.timeValue;
    this.counter = this.qrAuthorizationMaxOtpTime - this.timeValue;
  }

  private initCountdown(): void {
    const targetTime = this.timeStamp;
    let lastUpdateTime = Date.now();
    this.timer = setInterval(() => {
      const currentTimestamp = Date.now();
      lastUpdateTime = currentTimestamp;
      const timeRemaining = targetTime - currentTimestamp;
      this.timeValue = Math.floor(timeRemaining / 1000);
      this.timeValue = this.timeValue < 0 ? 0 : this.timeValue;
      this.counter = this.qrAuthorizationMaxOtpTime - this.timeValue;
      this.cdRef.detectChanges();

      if (
        this.timeValue === 0 ||
        this.counter >= this.qrAuthorizationMaxOtpTime ||
        !this.timeValue
      ) {
        clearInterval(this.timer);
        this.showExpiredModal();
      }
    }, 1000);
  }

  private async showExpiredModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: this.hasToken
        ? ModalTimeExpiredSameDeviceComponent
        : ModalTimeExpiredComponent,
      mode: 'md',
      showBackdrop: true,
      backdropDismiss: false,
      cssClass: 'avv-custom-modal expired-qr-modal'
    });
    await modal.present();
  }

  get qrAuthorizationMaxOtpTime(): number {
    return this.facade.boundsByKey(ParameterKey.qrAuthorizationMaxOtpTime);
  }

  get transactionTitle$(): Observable<string> {
    return this.facade.transactionTitle$;
  }

  get decryptedData$(): Observable<string[]> {
    return this.facade.decryptedData$.pipe(map(mapDecryptedData));
  }

  get decryptedDataTest$(): Observable<Record<string, string>> {
    return this.facade.decryptedData$;
  }

  get dynamicCode$(): Observable<string> {
    return this.facade.dynamicCode$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }
}
