import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { POPUP_ERROR_LOGIN } from '@app/commons/components/popup-error-login/constants/popup.constant';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { CapacitorUtilitiesService } from '@app/commons/services/capacitor-utilities-service.service';
import {
  SpiKeyType,
  Tag
} from '@app/modules/product/entities/product-spi-user-key';
import { PopupErrorLoginComponent } from '@commons/components/popup-error-login/popup-error-login.component';
import { resetForm } from '@commons/utils/forms';
import { ModalController } from '@ionic/angular';
import { loginPasswordValidators } from '@modules/auth/login/helpers/login-validator.helpers';
import { catchError, from, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPasswordComponent implements OnInit, AfterViewInit {
  @Input() working: boolean;
  @Input() userName: string;
  @Input() showSpiKeyOnLoginPage: boolean = false;

  @Output() loginUser: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  redirectForgotPassword: EventEmitter<void> = new EventEmitter<void>();

  public passwordForm: UntypedFormGroup;
  public tagAval$: Observable<Tag> = new Observable();
  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController,
    private capacitorUtilities: CapacitorUtilitiesService,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit() {
    this.initPasswordForm();
    this.tagAval$ = this.getTagAval();
  }

  ngAfterViewInit(): void {
    this.loaded.emit();
  }

  public emitPassword(): void {
    if (this.passwordForm.valid && !this.working) {
      this.loginUser.emit(this.password.value);
      resetForm(this.passwordForm);
    }
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      password: [
        null,
        [Validators.required, loginPasswordValidators.bind(this)]
      ]
    });
  }

  public getTagAval(): Observable<Tag> {
    const tag = from(this.secureStorage.get(SecureKeys.tagAval)).pipe(
      map((value) => {
        const tag: Tag = JSON.parse(value);
        return tag;
      }),
      catchError((error) => {
        console.error('key not available');
        return of(null);
      })
    );

    return tag;
  }

  public copyTagAval(tag: string) {
    this.capacitorUtilities.copyToClipboard(tag);
  }

  public getTagIcon(tag: Tag) {
    const path = `assets/img/aval-icons/${
      tag.type !== SpiKeyType.AlphanumericIdentifier
        ? 'bre-b.svg'
        : 'tag-aval-colored.svg'
    }`;
    return path;
  }

  public async openPopUpErrorLogin(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PopupErrorLoginComponent,
      mode: 'md',
      cssClass: 'avv-custom-modal',
      componentProps: {
        popUpData: POPUP_ERROR_LOGIN,
        onClick: async () => await modal.dismiss()
      }
    });
    await modal.present();
  }

  get password(): AbstractControl {
    return this.passwordForm.get('password');
  }
}
