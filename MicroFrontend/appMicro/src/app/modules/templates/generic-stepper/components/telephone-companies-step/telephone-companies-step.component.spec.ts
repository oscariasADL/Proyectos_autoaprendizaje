import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TelephoneCompaniesStepFacade } from '@modules/templates/generic-stepper/components/telephone-companies-step/telephone-companies-step.facade';
import { TelephoneCompaniesStepFacadeMock } from '@testing/mocks/facade/telephone-companies-step.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { TelephoneCompaniesStepComponent } from './telephone-companies-step.component';

describe('TelephoneCompaniesStepComponent', () => {
  let component: TelephoneCompaniesStepComponent;
  let fixture: ComponentFixture<TelephoneCompaniesStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TelephoneCompaniesStepComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: TelephoneCompaniesStepFacade,
          useClass: TelephoneCompaniesStepFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TelephoneCompaniesStepComponent);
    component = fixture.componentInstance;
    component.data = { control: new UntypedFormControl() };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setMobileOperator', () => {
    spyOn(component.nextStep, 'emit');
    component.setMobileOperator('claro Que si!');
    expect(component.nextStep.emit).toHaveBeenCalled();
  });
});
