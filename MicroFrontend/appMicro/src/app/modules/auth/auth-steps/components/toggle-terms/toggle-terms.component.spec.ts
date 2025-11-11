import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ToggleTermsComponent } from './toggle-terms.component';

describe('ToggleTermsComponent', () => {
  let component: ToggleTermsComponent;
  let fixture: ComponentFixture<ToggleTermsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleTermsComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleTermsComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormControl(false);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set toggleAuthorizeTerms', () => {
    component.toggleAuthorizeTerms();
    expect(component.authorizeTerms).toBeTrue();
  });

  it('should set toggleAcceptTerms', () => {
    component.toggleAcceptTerms();
    expect(component.acceptTerms).toBeTrue();
  });

  it('should set toggleAcceptTerms', () => {
    (component as any).toggleTerms();
    expect(component.control.value).toBeFalse();
  });
});
