import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ActivateProductPasswordComponent } from './activate-product-password.component';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { SafeHtmlPipe } from '@app/commons/pipes/safe-html.pipe';

describe('ActivateProductPasswordComponent', () => {
  let component: ActivateProductPasswordComponent;
  let fixture: ComponentFixture<ActivateProductPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivateProductPasswordComponent,
        ImageUrlPipe,
        SafeHtmlPipe
      ],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateProductPasswordComponent);
    component = fixture.componentInstance;
    component.product = new ActivationProductFactory().create();

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
