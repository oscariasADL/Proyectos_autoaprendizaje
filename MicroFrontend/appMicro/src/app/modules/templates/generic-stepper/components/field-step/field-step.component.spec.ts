import {
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { ContactsStepFacade } from '@modules/templates/generic-stepper/facades/contacts-step.facade';
import { ContactsStepFacadeMock } from '@testing/mocks/facade/contacts-step.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { FieldStepComponent } from './field-step.component';

describe('FieldStepComponent', () => {
  let component: FieldStepComponent;
  let fixture: ComponentFixture<FieldStepComponent>;
  let modalSpy;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [FieldStepComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: ContactsStepFacade,
          useClass: ContactsStepFacadeMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldStepComponent);
    component = fixture.componentInstance;
    component.data = {
      control: new UntypedFormControl(),
      displayName: new UntypedFormControl(),
      addenda: new UntypedFormControl(),
      showAccordionSourceDataStep: true
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSelectCellPhoneContacts', () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: {
        displayName: '',
        phoneNumber: ''
      }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    const input = document.createElement('input');
    component.inputField = { input: new ElementRef(input) } as any;
    expect(component.onSelectCellPhoneContacts()).toBeUndefined();
  });

  it('should call toggleAccordion', () => {
    component.toggleAccordion();
    expect(component.activeAccordion).toEqual(false);
  });
});
