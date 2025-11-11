import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { UnblockProductComponent } from './unblock-product.component';

describe('UnblockProductComponent', () => {
  let component: UnblockProductComponent;
  let fixture: ComponentFixture<UnblockProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnblockProductComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UnblockProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submitPassword', () => {
    spyOn(component.continue, 'emit');
    spyOn((component as any).facade, 'boundsByKey').and.returnValue(4);
    component.newPassword.setValue('1241');
    component.confirmPassword.setValue('1241');
    component.submitPassword();
    expect(component.continue.emit).toHaveBeenCalled();
  });
});
