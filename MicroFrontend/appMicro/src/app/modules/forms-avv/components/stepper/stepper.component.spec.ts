import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepperComponent],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call isCurrentStep', () => {
    expect(
      component.isCurrentStep({
        id: 1,
        label: 'Desde'
      })
    ).toBeTruthy();
  });

  it('should call isCompletedStep', () => {
    expect(
      component.isCompletedStep({
        id: 1,
        label: 'Desde'
      })
    ).toBeFalse();
  });

  it('should call click', () => {
    expect(
      component.click({
        id: 0,
        label: 'Desde'
      })
    ).toBeUndefined();
    expect(
      component.click({
        id: 1,
        label: 'Hacia'
      })
    ).toBeUndefined();
  });
});
