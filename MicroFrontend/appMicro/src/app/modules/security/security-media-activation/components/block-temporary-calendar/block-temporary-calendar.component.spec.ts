import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { BlockTemporaryCalendarComponent } from './block-temporary-calendar.component';
import {
  CalendarTypes,
  Day,
  DateType
} from '@commons/components/calendar/entities/calendar.entities';
import { Calendar } from '@app/commons/components/calendar/utils/calendar';

describe('BlockTemporaryCalendarComponent', () => {
  let component: BlockTemporaryCalendarComponent;
  let fixture: ComponentFixture<BlockTemporaryCalendarComponent>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.configureTestingModule({
      declarations: [BlockTemporaryCalendarComponent],
      imports: [IonicModule, TestingModule],
      providers: [{ provide: ModalController, useValue: modalCtrlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockTemporaryCalendarComponent);
    component = fixture.componentInstance;
    component.data = {
      date: new Date(),
      minDate: new Date(),
      maxDate: new Date(),
      monthsBackward: 3,
      monthsForward: 1,
      setMinRange: new Date(),
      setMaxRange: new Date(),
      format: 'yyyy',
      calendarType: CalendarTypes.from,
      description: ''
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', async () => {
    expect(component.closeModal()).toBeUndefined();
  });

  it('should select day', () => {
    expect(
      component.selectDay({
        value: 1,
        date: new Date(),
        week: 1,
        type: DateType.current,
        isToday: false,
        isWeekend: false,
        identifier: '2024-01-01',
        formatted: '01/01/2024'
      } as Day)
    ).toBeUndefined();
  });

  it('should initialize max date selected', () => {
    component.maxDateSelected = '01/01/2025';

    const initMaxDateSelectedSpy = spyOn<any>(
      component,
      'initMaxDateSelected'
    ).and.callThrough();
    (component as any).initMaxDateSelected();

    expect(initMaxDateSelectedSpy).toHaveBeenCalled();
    expect(component.dateControl.value).toBe('01/01/2025');
  });

  it('should not set date control value if maxDateSelected is not provided', () => {
    component.maxDateSelected = null;

    const initMaxDateSelectedSpy = spyOn<any>(
      component,
      'initMaxDateSelected'
    ).and.callThrough();
    (component as any).initMaxDateSelected();

    expect(initMaxDateSelectedSpy).toHaveBeenCalled();
    expect(component.dateControl.value).toBeNull();
  });
});
