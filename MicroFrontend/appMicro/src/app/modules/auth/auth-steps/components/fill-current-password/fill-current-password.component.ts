import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AbstractControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { Keyboard, KeyboardInfo } from '@capacitor/keyboard';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { SecureKeys } from '@commons/constants/keys.constants';
import { FORGOT_PASSWORD } from '@commons/constants/navigate.constants';
import { AlertComponentType } from '@commons/entities/alert/alert-sheet.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AuthStepsBase } from '@modules/auth/auth-steps/auth-steps.base';
import {
  AuthStepResponse,
  AuthStepType
} from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { LOGIN_MENU_LIST } from '@modules/auth/login/constants/login-tab-routes.constants';
import { loginPasswordValidators } from '@modules/auth/login/helpers/login-validator.helpers';
import { MenuList } from '@modules/layout/entities/tabs.interface';
import { DeviceData } from '@commons/entities/device/device.interface';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';

export enum FillCurrentPasswordErrorType {
  Retry = '1611',
  Office = '85',
  ChangePassword = '1603'
}

export const FillCurrentPasswordErrorButton = {
  [FillCurrentPasswordErrorType.Retry]:
    'AUTH.STEP.FILL_CURRENT_PASSWORD.ERROR_BUTTON.RETRY',
  [FillCurrentPasswordErrorType.Office]:
    'AUTH.STEP.FILL_CURRENT_PASSWORD.ERROR_BUTTON.OFFICE',
  [FillCurrentPasswordErrorType.ChangePassword]:
    'AUTH.STEP.FILL_CURRENT_PASSWORD.ERROR_BUTTON.OFFICE'
  /*[FillCurrentPasswordErrorType.ChangePassword]:
    'AUTH.STEP.FILL_CURRENT_PASSWORD.ERROR_BUTTON.CHANGE_PASSWORD'*/
};

export const FillCurrentPasswordErrorLink = {
  /*[FillCurrentPasswordErrorType.Retry]:
    'AUTH.STEP.FILL_CURRENT_PASSWORD.ERROR_LINK.RETRY',*/
  [FillCurrentPasswordErrorType.Retry]:
    'AUTH.STEP.FILL_CURRENT_PASSWORD.ERROR_LINK.CHANGE_PASSWORD',
  [FillCurrentPasswordErrorType.Office]:
    'AUTH.STEP.FILL_CURRENT_PASSWORD.ERROR_LINK.OFFICE',
  [FillCurrentPasswordErrorType.ChangePassword]: 'ACTIONS.CANCEL'
};

export const FillCurrentPasswordErrorIcon = {
  [FillCurrentPasswordErrorType.Retry]: 'icon-seguridad-2',
  [FillCurrentPasswordErrorType.Office]: 'icon-ubicacion',
  [FillCurrentPasswordErrorType.ChangePassword]: ''
};

@Component({
  selector: 'app-fill-current-password',
  templateUrl: './fill-current-password.component.html',
  styleUrls: ['./fill-current-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillCurrentPasswordComponent
  extends AuthStepsBase
  implements OnInit, OnDestroy
{
  public pageHeight: number;
  public keyboardShown: boolean = false;
  public keyboardWillShowListener: PluginListenerHandle;
  public keyboardWillHideListener: PluginListenerHandle;
  public passwordForm: UntypedFormGroup;
  public menuListLeft: MenuList[] = LOGIN_MENU_LIST.filter(
    (i) => i.position === 'left'
  );
  public menuListRight: MenuList[] = LOGIN_MENU_LIST.filter(
    (i) => i.position === 'right'
  );

  public isForgotPasswordEnabled: boolean = false;

  private db: any;
  private loginData: any;

  constructor(protected injector: Injector, private cdRef: ChangeDetectorRef) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.showErrorModalIfNecessary();
    this.initPasswordForm();
    this.pageHeight = window.innerHeight;

    this.db = await this.secureStorage.getAll();
    const loginData = getDBValue(this.db, SecureKeys.loginData);
    this.loginData = JSON.parse(loginData);
    if (Capacitor.isNativePlatform()) {
      this.keyboardWillShowListener = await Keyboard.addListener(
        'keyboardWillShow',
        (info: KeyboardInfo) => {
          this.keyboardShown = true;
          this.cdRef.detectChanges();
        }
      );
      this.keyboardWillHideListener = await Keyboard.addListener(
        'keyboardWillHide',
        () => {
          this.keyboardShown = false;
          this.cdRef.detectChanges();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (Capacitor.isNativePlatform()) {
      void this.keyboardWillShowListener.remove();
      void this.keyboardWillHideListener.remove();
    }
  }

  public redirectForgotPassword(): void {
    void this.navCtrl.navigateRoot(FORGOT_PASSWORD);
  }

  public run(): void {
    if (this.passwordForm.valid) {
      const { typeDocument, document } = this.loginData;
      this.method({
        processId: this.data.processId,
        content: {
          id: document,
          idType: typeDocument,
          currentPassword: this.password.value
        }
      });
      if (this.isSilentEnrollment) {
        this.savePasswordForSilentEnrollment(this.password.value).then();
      }
    }
  }

  private async savePasswordForSilentEnrollment(
    password: string
  ): Promise<any> {
    const db = await this.secureStorage.getAll();
    const silentEnrollmentData = JSON.parse(
      getDBValue(db, SecureKeys.silentEnrollmentData)
    );
    await this.secureStorage.put(
      SecureKeys.silentEnrollmentData,
      JSON.stringify({
        ...silentEnrollmentData,
        password
      }),
      true
    );
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      password: [null, [Validators.required, loginPasswordValidators]]
    });

    this.facade
      .isFeatureFlagEnabled(FeatureFlagsKey.ForgotPasswordWithBiometrics)
      .pipe(
        take(1),
        tap((isEnabled) => (this.isForgotPasswordEnabled = isEnabled))
      )
      .subscribe();
  }

  private showErrorModalIfNecessary(): void {
    if (!this.data.success) {
      const buttonOne = FillCurrentPasswordErrorButton[this.data.errorCode];
      const buttonTwo = FillCurrentPasswordErrorLink[this.data.errorCode];

      this.alertService
        .create({
          id: 'alert-fill-current-password-error',
          componentType: AlertComponentType.alertCenter,
          title: 'AUTH.STEP.FILL_CURRENT_PASSWORD.ALERT.TITLE',
          description:
            this.data.errorMessage ||
            'AUTH.STEP.FILL_CURRENT_PASSWORD.ALERT.ERROR',
          buttons: [
            buttonOne
              ? buttonOne
              : FillCurrentPasswordErrorButton[
                  FillCurrentPasswordErrorType.Retry
                ],
            buttonTwo
              ? buttonTwo
              : FillCurrentPasswordErrorLink[
                  FillCurrentPasswordErrorType.Office
                ]
          ],
          buttonIconLink: FillCurrentPasswordErrorIcon[this.data.errorCode]
        })
        .then((response) => {
          if (!isNullOrUndefined(response)) {
            switch (this.data.errorCode) {
              case FillCurrentPasswordErrorType.Office:
                if (!response) {
                  this.facade.redirectExternal(LinkKey.linkOfficeMap);
                }
                break;
              default:
                break;
            }
          }
        });
    }
  }

  /*private showErrorModalIfNecessary(): void {
    if (!this.data.success) {
      if (this.data.errorCode === FillCurrentPasswordErrorType.ChangePassword) {
        this.navCtrl.navigateRoot(FORGOT_PASSWORD);
      } else {
        const buttonOne = FillCurrentPasswordErrorButton[this.data.errorCode];
        const buttonTwo = FillCurrentPasswordErrorLink[this.data.errorCode];
        this.alertService
          .create({
            id: 'alert-fill-current-password-error',
            componentType: AlertComponentType.alertCenter,
            title: 'AUTH.STEP.FILL_CURRENT_PASSWORD.ALERT.TITLE',
            description:
              this.data.errorMessage ||
              'AUTH.STEP.FILL_CURRENT_PASSWORD.ALERT.ERROR',
            buttons: [
              !!buttonOne
                ? buttonOne
                : FillCurrentPasswordErrorButton[
                    FillCurrentPasswordErrorType.Retry
                  ],
              !!buttonTwo
                ? buttonTwo
                : FillCurrentPasswordErrorLink[
                    FillCurrentPasswordErrorType.ChangePassword
                  ]
            ],
            buttonIconLink: FillCurrentPasswordErrorIcon[this.data.errorCode]
          })
          .then((response) => {
            if (!isNullOrUndefined(response)) {
              switch (this.data.errorCode) {
                case FillCurrentPasswordErrorType.Retry:
                  if (!response) {
                    this.navCtrl.navigateRoot(FORGOT_PASSWORD);
                  }
                  break;
                case FillCurrentPasswordErrorType.Office:
                  if (!response) {
                    this.facade.redirectExternal(LinkKey.linkOfficeMap);
                  }
                  break;
                case FillCurrentPasswordErrorType.ChangePassword:
                  if (response) {
                    this.navCtrl.navigateRoot(FORGOT_PASSWORD);
                  }
                  break;
              }
            }
          });
      }
    }
  }*/

  get password(): AbstractControl {
    return this.passwordForm.get('password');
  }

  get method(): any {
    return this.routeData.method;
  }

  get data(): AuthStepResponse {
    return this.routeData.data;
  }

  get routeData(): any {
    return this.route.snapshot.data.data;
  }

  get type(): AuthStepType {
    return this.routeData.type;
  }

  get isSilentEnrollment(): boolean {
    return this.type === AuthStepType.silentEnrollment;
  }

  get version$(): Observable<string> {
    return this.facade.deviceInfo$.pipe(
      map((data: DeviceData) => data?.appVersion)
    );
  }
}
