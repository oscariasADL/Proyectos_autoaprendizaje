import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { BANK_GROUP } from '@commons/constants/card.constants';
import { SecureKeys } from '@commons/constants/keys.constants';
import { HOME } from '@commons/constants/navigate.constants';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { NavController } from '@ionic/angular';
import {
  authConfirmPasswordValidators,
  authCurrentPasswordValidators,
  authNewPasswordValidators
} from '@modules/auth/auth-steps/helpers/auth-steps-validators.helpers';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { UpdatePasswordFacade } from '@modules/auth/update-password/update-password.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatePasswordPage implements OnInit {
  public form: UntypedFormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: UntypedFormBuilder,
    private cdRef: ChangeDetectorRef,
    private facade: UpdatePasswordFacade,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit(): void {
    this.facade.resetUpdatePassword();
    this.initForm();
  }

  public goToHome(): void {
    this.navCtrl.navigateRoot(HOME);
  }

  public async changePassword(): Promise<void> {
    const db = await this.secureStorage.getAll();

    const { typeDocument: documentType, document: documentNumber } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );
    const fingerprint = getDBValue(db, SecureKeys.fingerprint);

    this.facade.updatePassword({
      documentType,
      documentNumber,
      deviceSerial: fingerprint,
      password: this.currentPassword.value,
      newPassword: this.newPassword.value,
      confirmedPassword: this.confirmPassword.value,
      companyId: BANK_GROUP.VILLAS_CODE
    });
  }

  private async initForm(): Promise<void> {
    const db = await this.secureStorage.getAll();
    const loginData: LoginUserPayload = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );

    this.form = this.formBuilder.group({
      currentPassword: [
        loginData.password,
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
    this.cdRef.detectChanges();
  }

  get updatePasswordCompleted$(): Observable<boolean> {
    return this.facade.updatePasswordCompleted$;
  }

  get loginWithBiometric$(): Observable<boolean> {
    return this.facade.loginWithBiometric$;
  }

  get currentPassword(): AbstractControl {
    return this.form.get('currentPassword');
  }

  get newPassword(): AbstractControl {
    return this.form.get('newPassword');
  }

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword');
  }
}
