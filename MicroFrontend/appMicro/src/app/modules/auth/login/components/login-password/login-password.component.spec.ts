import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPasswordComponent } from './login-password.component';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { CapacitorUtilitiesService } from '@app/commons/services/capacitor-utilities-service.service';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginPasswordComponent', () => {
  let component: LoginPasswordComponent;
  let fixture: ComponentFixture<LoginPasswordComponent>;
  let capacitorUtilitiesService: CapacitorUtilitiesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPasswordComponent],
      imports: [IonicModule, ReactiveFormsModule, TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppFacade, useClass: AppFacadeMock },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        CapacitorUtilitiesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPasswordComponent);
    capacitorUtilitiesService = TestBed.inject(CapacitorUtilitiesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call emitPassword', () => {
    spyOn(component.loginUser, 'emit');
    component.password.setValue('1254');
    component.emitPassword();
    expect(component.loginUser.emit).toHaveBeenCalled();
  });
  it('should call copyToClipboard when copyTagAval is called', () => {
    const copyToClipboardSpy = spyOn(
      capacitorUtilitiesService,
      'copyToClipboard'
    );
    const tag = 'someTag';

    component.copyTagAval(tag);

    expect(copyToClipboardSpy).toHaveBeenCalledWith(tag);
  });
});
