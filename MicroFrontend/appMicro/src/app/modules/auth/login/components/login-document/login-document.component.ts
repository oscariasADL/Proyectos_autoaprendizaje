import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
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
import { PopupErrorLoginComponent } from '@commons/components/popup-error-login/popup-error-login.component';
import {
  isNullOrUndefined,
  sanitizeDocument
} from '@commons/helpers/text.helpers';
import { ModalController } from '@ionic/angular';
import { LoginDocumentFields } from '@modules/auth/login/entities/login-user-payload.interface';
import { LoginFacade } from '@modules/auth/login/login.facade';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ParameterType } from '@store/state/parameter.state';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-login-document',
  templateUrl: './login-document.component.html',
  styleUrls: ['./login-document.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDocumentComponent implements OnInit, AfterViewInit {
  @Output() loaded: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  setDocument: EventEmitter<LoginDocumentFields> =
    new EventEmitter<LoginDocumentFields>();

  public documentForm: UntypedFormGroup;
  public documentTypes: DropdownList[];

  constructor(
    private facade: LoginFacade,
    private cdRef: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.initDocumentForm();
    this.listenDocumentTypes();
  }

  ngAfterViewInit(): void {
    this.loaded.emit();
  }

  public async loginDocument(): Promise<void> {
    if (this.documentForm.valid && !this.working$.currentValue()) {
      this.setDocument.emit({
        typeDocument: this.typeDocument.value.value,
        document: sanitizeDocument(this.document.value)
      });
    }
  }

  private listenDocumentTypes(): void {
    this.documentTypes$
      .pipe(
        filter(
          (documentTypes: DropdownList[]) => !isNullOrUndefined(documentTypes)
        ),
        take(1)
      )
      .subscribe((documentTypes: DropdownList[]) => {
        this.documentTypes = documentTypes.filter(
          (item) => item.value !== 'NIT'
        );
        this.typeDocument.setValue(this.documentTypes[0]);
        this.cdRef.detectChanges();
      });
  }

  private initDocumentForm(): void {
    this.documentForm = this.formBuilder.group({
      typeDocument: [null, [Validators.required]],
      document: [null, [Validators.required]]
    });
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

  get workingParameters$(): Observable<boolean> {
    return this.facade.workingParameters$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get documentTypes$(): Observable<DropdownList[]> {
    return this.facade.parameterByKey(ParameterType.documents);
  }

  get typeDocument(): AbstractControl {
    return this.documentForm.get('typeDocument');
  }

  get document(): AbstractControl {
    return this.documentForm.get('document');
  }
}
