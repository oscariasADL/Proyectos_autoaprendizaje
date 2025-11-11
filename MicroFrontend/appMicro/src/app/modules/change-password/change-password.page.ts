import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { HOME } from '@commons/constants/navigate.constants';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { resetForm } from '@commons/utils/forms';
import { removeSubscriptions } from '@commons/utils/util';
import { NavController } from '@ionic/angular';
import {
  authConfirmPasswordValidators,
  authCurrentPasswordValidators,
  authNewPasswordValidators
} from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { CHANGE_PASSWORD_ERROR_ALERT } from '@modules/change-password/constants/change-password.constants';
import { ChangePasswordScreenType } from '@modules/change-password/entities/change-password.entities';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordPage implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public currentScreen: ChangePasswordScreenType =
    ChangePasswordScreenType.currentPassword;

  private subscriptions: Subscription[] = [];

  constructor(
    private alert: AlertService,
    private navCtrl: NavController,
    private formBuilder: UntypedFormBuilder,
    private cdRef: ChangeDetectorRef,
    private facade: ChangePasswordFacade
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public isScreen(type: ChangePasswordScreenType): boolean {
    return this.currentScreen === type;
  }

  public changeScreenType(type: ChangePasswordScreenType): void {
    this.currentScreen = type;
    this.cdRef.detectChanges();
  }

  public goToHome(): void {
    this.navCtrl.navigateRoot(HOME);
  }

  public changePassword(): void {
    if (this.form.valid) {
      const {
        currentPassword,
        newPassword,
        confirmPassword: confirmedPassword
      } = this.form.value;

      this.facade.changePassword({
        currentPassword,
        newPassword,
        confirmedPassword
      });

      this.listenChangePasswordResponse();
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      currentPassword: [
        null,
        [Validators.required, authCurrentPasswordValidators.bind(this)]
      ],
      newPassword: [
        null,
        [Validators.required, authNewPasswordValidators.bind(this)]
      ],
      confirmPassword: [
        null,
        [Validators.required, authConfirmPasswordValidators.bind(this)]
      ]
    });
  }

  private listenChangePasswordResponse(): void {
    removeSubscriptions(this.subscriptions);

    this.subscriptions.push(
      this.facade.changePassword$
        .pipe(
          filter(
            (state) =>
              !state.working &&
              (state.completed ||
                (!state.completed && !isNullOrUndefinedOrEmpty(state.message)))
          ),
          take(1)
        )
        .subscribe((state) => {
          if (state.completed) {
            this.changeScreenType(ChangePasswordScreenType.completed);
          } else {
            resetForm(this.form);
            this.changeScreenType(ChangePasswordScreenType.currentPassword);
            this.showModal(state.message).then();
          }
          this.cdRef.detectChanges();
        })
    );
  }

  private showModal(error: string): Promise<void> {
    return this.alert.create({
      ...CHANGE_PASSWORD_ERROR_ALERT,
      description: error
    });
  }

  get screenType(): typeof ChangePasswordScreenType {
    return ChangePasswordScreenType;
  }

  get newPassword(): AbstractControl {
    return this.form.get('newPassword');
  }

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword');
  }
}
