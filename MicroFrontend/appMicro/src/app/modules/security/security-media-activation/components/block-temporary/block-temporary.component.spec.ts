import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { BlockTemporaryStep } from '@modules/security/security-media-activation/entities/security-media.interface';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { addDays, parseISO } from 'date-fns';
import { BlockTemporaryCalendarComponent } from '@modules/security/security-media-activation/components/block-temporary-calendar/block-temporary-calendar.component';
import { BlockTemporaryComponent } from './block-temporary.component';

describe('BlockTemporaryComponent', () => {
  let component: BlockTemporaryComponent;
  let fixture: ComponentFixture<BlockTemporaryComponent>;
  let modalCtrlSpy;
  let modalSpy;
  let facadeMock: SecurityMediaActivationFacadeMock;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);

    TestBed.configureTestingModule({
      declarations: [BlockTemporaryComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockTemporaryComponent);
    component = fixture.componentInstance;
    facadeMock = TestBed.inject(
      SecurityMediaActivationFacade
    ) as SecurityMediaActivationFacadeMock;
    fixture.detectChanges();
  }));

  it('should set monthsForward to 1 when date range spans different months', async () => {
    const currentDate = '2024-01-30';
    const date = parseISO(currentDate);
    const maxDate = addDays(date, 7);

    spyOn(facadeMock.date$, 'currentValue').and.returnValue(currentDate);

    modalCtrlSpy.create.and.returnValue(Promise.resolve(modalSpy));
    modalSpy.present.and.returnValue(Promise.resolve());
    modalSpy.onDidDismiss.and.returnValue(Promise.resolve({ data: null }));

    await component.openCalendar();

    expect(modalCtrlSpy.create).toHaveBeenCalledWith({
      component: BlockTemporaryCalendarComponent,
      componentProps: {
        data: {
          date: date,
          minDate: date,
          maxDate: maxDate,
          setMinRange: date,
          monthsBackward: 0,
          monthsForward: 1,
          format: 'dd/MM/yyyy'
        },
        maxDateSelected: null,
        id: 'temporary-block-calendar-modal'
      }
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change step', () => {
    component.changeStep(BlockTemporaryStep.ChooseDate);
    expect(component.step).toEqual(BlockTemporaryStep.ChooseDate);
  });

  it('should open calendar', () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: new Date()
    }));
    modalCtrlSpy.create.and.callFake(() => modalSpy);
    expect(component.openCalendar()).toBeTruthy();
  });

  it('should block product', () => {
    component.dateControl = new UntypedFormControl('2021/02/08');
    expect(component.blockProduct()).toBeUndefined();
  });
});
