import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '@commons/services/alert.service';
import { NavController } from '@ionic/angular';
import { ChangePasswordScreenType } from '@modules/change-password/entities/change-password.entities';
import { ChangePasswordFacadeMock } from '@testing/mocks/facade/change-password.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';
import { ChangePasswordFacade } from './change-password.facade';
import { ChangePasswordPage } from './change-password.page';

describe('ChangePasswordPage', () => {
  let navControlSpy, modalControlSpy;
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);
    modalControlSpy = jasmine.createSpyObj('ModalController', ['navigateRoot']);
    TestBed.configureTestingModule({
      declarations: [ChangePasswordPage],
      imports: [TestingModule, ReactiveFormsModule],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        { provide: ChangePasswordFacade, useClass: ChangePasswordFacadeMock },
        { provide: AlertService, useClass: AlertServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call changeScreenType', () => {
    expect(
      component.changeScreenType(ChangePasswordScreenType.completed)
    ).toBeUndefined();
  });

  it('should be call goToHome', () => {
    expect(component.goToHome()).toBeUndefined();
  });

  it('should be call changePassword', () => {
    const formSpy = spyOnProperty(component.form, 'valid');
    spyOn(component, 'changePassword').and.callThrough();
    component.form.get('currentPassword').setValue('4312');
    component.newPassword.setValue('1243');
    component.confirmPassword.setValue('1243');
    formSpy.and.returnValue(true);

    component.changePassword();
    expect(component.changePassword).toHaveBeenCalled();

    formSpy.and.returnValue(false);
    component.changePassword();
    expect(component.changePassword).toHaveBeenCalled();
  });

  it('should call showModal()', (done) => {
    (component as any).showModal().then((d) => {
      expect(d).toBeDefined();
      done();
    });
  });
});
