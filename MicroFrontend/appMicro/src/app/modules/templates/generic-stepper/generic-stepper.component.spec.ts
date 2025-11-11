import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { StepperExceptions } from './entities/generic-stepper.entity';
import { GenericStepperComponent } from './generic-stepper.component';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { UtagDirective } from '@commons/directives/tealium/utag.directive';

describe('GenericStepperComponent', () => {
  let component: GenericStepperComponent;
  let fixture: ComponentFixture<GenericStepperComponent>;
  let modalSpy;
  let modalCtrlSpy;
  let alertService;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [GenericStepperComponent, UtagDirective],
      imports: [IonicModule, RouterTestingModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        { provide: AlertService, useClass: AlertServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericStepperComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({});
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify backClick', () => {
    const componentAny = component as any;
    componentAny.slideStack.push(...['from', 'data', 'settings']);
    fixture.detectChanges();
    spyOn(componentAny, 'backClick').and.callThrough();
    componentAny.backClick();
    expect(componentAny.backClick).toHaveBeenCalled();
  });

  it('should verify ngOnChanges', () => {
    expect(
      component.ngOnChanges({ currentSlide: { currentValue: '' } } as any)
    ).toBeUndefined();
    expect(component.backClick()).toBeUndefined();
  });

  it('should verify runNextStep', () => {
    modalSpy.onWillDismiss.and.callFake(async () => ({
      data: modalSpy
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    component.form.markAsDirty();
    expect(
      component.runNextStep({ value: StepperExceptions.closeStepper })
    ).toBeUndefined();
    expect(component.runNextStep({ value: null })).toBeUndefined();
  });

  it('should call closeClick', async () => {
    spyOnProperty(component.form, 'dirty').and.returnValue(true);
    spyOn(alertService, 'create').and.returnValue(Promise.resolve(true));
    spyOnProperty(alertService, 'alreadyPresent').and.returnValue(false);
    expect(await component.closeClick()).toBeUndefined();
  });

  it('should call setSlideStack()', () => {
    const componentAny = component as any;
    componentAny.slideStack.push(...['from', 'data', 'settings']);
    fixture.detectChanges();
    spyOn(componentAny, 'setSlideStack').and.callThrough();
    componentAny.setSlideStack('data');
    expect(componentAny.setSlideStack).toHaveBeenCalled();
  });

  it('should call ngOnDestroy', () => {
    const componentAny = component as any;
    componentAny.subscription = null;
    spyOn(componentAny, 'ngOnDestroy').and.callThrough();
    componentAny.ngOnDestroy();
    expect(componentAny.ngOnDestroy).toHaveBeenCalled();
  });

  it('should call ngOnInit()', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });
});
