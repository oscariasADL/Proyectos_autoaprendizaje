/* eslint-disable max-lines */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardInfo } from '@capacitor/keyboard';
import { Preferences } from '@capacitor/preferences';
import { MenuController, NavController } from '@ionic/angular';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { differenceInMinutes } from 'date-fns';

import { SecureKeys } from '@commons/constants/keys.constants';
import {
  FORGOT_PASSWORD,
  REGISTER,
  SILENT_ENROLLMENT
} from '@commons/constants/navigate.constants';
import { KONY_APP } from '@commons/constants/one-span.constants';
import {
  getDBValue,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { buildKonyId } from '@commons/utils/encrypt';
import { environment as ENV } from '@environment';
import { LoginType } from '@modules/auth/login/constants/login.constants';
import {
  LoginDocumentFields,
  LoginUserPayload
} from '@modules/auth/login/entities/login-user-payload.interface';
import { LoginFacade } from '@modules/auth/login/login.facade';
import { MenuList } from '@modules/layout/entities/tabs.interface';
import { LOGIN_MENU_LIST } from './constants/login-tab-routes.constants';
import { DeviceData } from '@commons/entities/device/device.interface';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { removeSubscriptions } from '@commons/utils/util';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import { logLoginEvent, showSpiKeyOnLoginPage } from './helpers/login.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit, OnDestroy {
  public hasSeed: boolean;
  public userName: string;
  public pageHeight: number;
  public imageLoaded: boolean = false;
  public contentLoaded: boolean = false;
  public keyboardShown: boolean = false;
  public currentLoginType: LoginType;

  public menuListLeft: MenuList[] = LOGIN_MENU_LIST.filter(
    (i) => i.position === 'left'
  );
  public menuListCenter: MenuList = null;
  public menuListRight: MenuList[] = LOGIN_MENU_LIST.filter(
    (i) => i.position === 'right'
  );
  private subscriptions: Subscription[] = [];

  constructor(
    private facade: LoginFacade,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private cdRef: ChangeDetectorRef,
    private splashScreen: SplashScreenService,
    private secureStorage: AdlSecureStorageService,
    private logManagerService: LogManagerService
  ) {}

  async ngOnInit(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
        this.keyboardShown = true;
        this.cdRef.detectChanges();
      });
      Keyboard.addListener('keyboardWillHide', () => {
        this.keyboardShown = false;
        this.cdRef.detectChanges();
      });
    }
    await this.initCentralMenu();
  }

  ngOnDestroy(): void {
    if (Capacitor.isNativePlatform()) {
      Keyboard.removeAllListeners();
    }
    removeSubscriptions(this.subscriptions);
  }

  public async ionViewWillEnter(): Promise<void> {
    this.pageHeight = window.innerHeight;
    await this.determineInitialScreen();
    removeSubscriptions(this.subscriptions);
  }

  public ionViewDidLeave(): void {
    this.facade.disableLoading();
  }

  public setContentLoaded(): void {
    this.contentLoaded = true;
    this.checkLoaded();
  }

  private checkLoaded(): void {
    if (this.contentLoaded) {
      this.splashScreen.hideSplashScreen();
    }
  }
  public showSpiKeyOnLoginPage() {
    return showSpiKeyOnLoginPage(this.facade);
  }
  public redirectForgotPassword(): void {
    this.navCtrl.navigateForward(FORGOT_PASSWORD);
  }

  public changeLoginType(type: LoginType): void {
    this.facade.setLoginType(type);
    this.cdRef.detectChanges();
  }

  public async login(
    password: string,
    loginWithBiometric: boolean
  ): Promise<void> {
    const db = await this.secureStorage.getAll();
    const deviceData = await firstValueFrom(this.facade.deviceInfo$);
    const fingerprint = getDBValue(db, SecureKeys.fingerprint);
    const { typeDocument, document } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );
    const loginUserPayload: LoginUserPayload = {
      typeDocument,
      document,
      deviceSerial: fingerprint,
      deviceName: deviceData?.deviceName,
      password
    };

    const keyInterchangeValidation = await this.isKeyInterchangeValid();
    logLoginEvent(
      this.logManagerService,
      document,
      `[UserID]=${document} Testing login function with [keyInterchangeValidation]=${keyInterchangeValidation}`
    );

    if (!keyInterchangeValidation) {
      this.facade.enableLoading();
      this.facade.initInterchangeKey();
      this.subscriptions.push(
        this.facade.interchangeCompleted$.subscribe((completed) => {
          this.facade.disableLoading();
          const hasSessionHash = getDBValue(db, SecureKeys.sessionHash);

          if (completed && hasSessionHash) {
            this.facade.login(loginUserPayload);
            this.facade.setLoginWithBiometric(loginWithBiometric);
          }
        })
      );
      return;
    }

    this.facade.login(loginUserPayload);
    this.facade.setLoginWithBiometric(loginWithBiometric);
  }

  public async setDocument(data: LoginDocumentFields): Promise<void> {
    const deviceData = await firstValueFrom(this.facade.deviceInfo$);
    await this.secureStorage.put(
      SecureKeys.loginData,
      JSON.stringify(data),
      true
    );

    const isSilentEnrollment = await this.validateSilentEnrollment(
      deviceData,
      data.typeDocument,
      data.document
    );

    if (isSilentEnrollment) {
      this.navCtrl.navigateForward(SILENT_ENROLLMENT);
    } else {
      this.navCtrl.navigateForward(REGISTER);
    }
  }

  public async validateSilentEnrollment(
    deviceInfo: DeviceData,
    typeDocument: string,
    document: string
  ): Promise<boolean> {
    try {
      const auxValidate = async (SecDevFP, ServComp, deviceId) => {
        if (!!SecDevFP && !isNullOrUndefined(ServComp) && !!deviceId) {
          const konyId = buildKonyId(
            deviceInfo,
            typeDocument,
            document,
            KONY_APP.appVersion,
            KONY_APP.appName
          );
          if (SecDevFP === konyId) {
            this.facade.setComplementaryServicesState(
              ServComp.toString() === 'true'
            );
            await this.secureStorage.put(
              SecureKeys.silentEnrollmentData,
              JSON.stringify({
                typeDocument,
                document,
                SecDevFP,
                ServComp,
                deviceId
              }),
              true
            );
            return true;
          }
          return false;
        }
        return false;
      };

      if (ENV.silent_enrollment) {
        const SecDevFP = buildKonyId(
          deviceInfo,
          typeDocument,
          document,
          KONY_APP.appVersion,
          KONY_APP.appName
        );
        const ServComp = ENV.complementary_services.toString();
        const deviceId = deviceInfo.uuid;
        return await auxValidate(SecDevFP, ServComp, deviceId);
      } else {
        const { value: SecDevFP } = await Preferences.get({
          key: KONY_APP.SecureDeviceFingerprint
        });
        const { value: ServComp } = await Preferences.get({
          key: KONY_APP.complementaryServices
        });
        const { value: deviceId } = await Preferences.get({
          key: KONY_APP.deviceId
        });
        return await auxValidate(SecDevFP, ServComp, deviceId);
      }
    } catch {
      return false;
    }
  }

  private async determineInitialScreen(): Promise<void> {
    const db = await this.secureStorage.getAll();

    this.hasSeed = !isNullOrUndefinedOrEmpty(getDBValue(db, SecureKeys.seed));
    this.changeLoginType(
      this.hasSeed ? LoginType.Password : LoginType.Document
    );
    const basicData = getDBValue(db, SecureKeys.basicData);
    if (!isNullOrUndefinedOrEmpty(basicData)) {
      this.userName = (JSON.parse(basicData) as DataBasicClientDto)?.clientName;
    }

    this.cdRef.detectChanges();
  }

  private async initCentralMenu() {
    const db = await this.secureStorage.getAll();
    const isEnrolled = getDBValue(db, SecureKeys.isEnrolled);
    this.facade
      .isFeatureFlagEnabled(FeatureFlagsKey.MenuQRLoginAlt)
      .pipe(take(1))
      .subscribe((isEnabled) => {
        if (isEnabled && !isNullOrUndefinedOrEmpty(isEnrolled)) {
          this.menuListCenter = LOGIN_MENU_LIST.find(
            (i) => i.position === 'center'
          );
          this.cdRef.detectChanges();
        }
      });
  }

  private async isKeyInterchangeValid(): Promise<boolean> {
    if (!ENV.encrypt) return true;

    const db = await this.secureStorage.getAll();
    const hasPublicKey = getDBValue(db, SecureKeys.publicKey);
    const hasRandomKey = getDBValue(db, SecureKeys.randomKey);
    const hasSessionHash = getDBValue(db, SecureKeys.sessionHash);

    if (!hasPublicKey && !hasRandomKey && !hasSessionHash) return false;

    const interchangeDate = await firstValueFrom(this.facade.interchangeDate$);
    const difference = differenceInMinutes(new Date(), interchangeDate);

    return difference < ENV.interchange_key.interval_in_minutes;
  }

  get loginType$(): Observable<LoginType> {
    return this.facade.loginType$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get isProduction(): boolean {
    return ENV.production;
  }

  get loginType(): typeof LoginType {
    return LoginType;
  }

  get version$(): Observable<string> {
    return this.facade.deviceInfo$.pipe(
      map((data: DeviceData) => data?.appVersion)
    );
  }

  get isLoginTypePassword$(): Observable<boolean> {
    return this.loginType$.pipe(
      map((loginType) => loginType === this.loginType.Password)
    );
  }
}
