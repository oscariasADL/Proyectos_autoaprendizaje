import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { IonicModule } from '@ionic/angular';
import { UpdatePasswordFacade } from '@modules/auth/update-password/update-password.facade';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { UpdatePasswordFacadeMock } from '@testing/mocks/facade/update-password.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { UpdatePasswordPage } from './update-password.page';

describe('UpdatePasswordPage', () => {
  let component: UpdatePasswordPage;
  let fixture: ComponentFixture<UpdatePasswordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordPage],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        { provide: UpdatePasswordFacade, useClass: UpdatePasswordFacadeMock },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToHome', () => {
    fixture.ngZone.run(() => expect(component.goToHome()).toBeUndefined());
  });

  it('should call changePassword', () => {
    expect(component.changePassword()).toBeTruthy();
  });
});
