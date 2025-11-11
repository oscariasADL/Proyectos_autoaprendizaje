import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CalendarTypes,
  DateType
} from '@commons/components/calendar/entities/calendar.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [IonicModule, RouterTestingModule, TestingModule],
      providers: [{ provide: ModalController, useValue: modalCtrlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
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

  it('should call selectDay', async () => {
    spyOn(component, 'selectDay').and.callThrough();
    try {
      component.selectDay({
        value: 12,
        date: new Date(),
        week: 1,
        type: DateType.current,
        isToday: false,
        isWeekend: false,
        identifier: '',
        formatted: ''
      });
      await component.closeModal([new Date()]);
      expect(component.selectDay).toBeDefined();
    } catch (error) {
      fail(`selectDay threw an error: ${error}`);
    }
  });

  it('should call selectDay to', async () => {
    spyOn(component, 'selectDay').and.callThrough();
    component.activeType = CalendarTypes.to;
    try {
      component.selectDay({
        value: 12,
        date: new Date(),
        week: 1,
        type: DateType.current,
        isToday: false,
        isWeekend: false,
        identifier: '',
        formatted: ''
      });
      component.closeModal([new Date()]);
      expect(component.selectDay).toBeDefined();
    } catch (error) {
      fail(`selectDay to threw an error: ${error}`);
    }
  });

  it('should call selectDay disabled', async () => {
    spyOn(component, 'selectDay').and.callThrough();
    try {
      component.selectDay({
        value: 12,
        date: new Date(),
        week: 1,
        type: DateType.current,
        isToday: false,
        isWeekend: false,
        identifier: '',
        formatted: '',
        disabled: true
      });
      await component.closeModal([new Date()]);
      expect(component.selectDay).toBeDefined();
    } catch (error) {
      fail(`selectDay disabled threw an error: ${error}`);
    }
  });
  it('should call closeModal with null', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    try {
      component.closeModal();
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(null);
      expect(component.closeModal).toHaveBeenCalled();
    } catch (error) {
      fail(`closeModal with null threw an error: ${error}`);
    }
  });
  it('should scroll to correct position when monthHeight is less than 300', () => {
    const mockMonthElement = {
      offsetTop: 250
    };

    const mockMonthContainer = {
      offsetHeight: 200
    };

    spyOn(
      component.calendarMatrix.nativeElement,
      'querySelector'
    ).and.returnValue(mockMonthElement);
    spyOn(document, 'getElementsByClassName').and.returnValue([
      mockMonthContainer
    ] as any);

    const scrollToMonthElementMethod =
      component['scrollToMonthElement']('someAnchor');

    expect(component.calendarMatrix.nativeElement.scrollTop).toBe(
      mockMonthElement.offsetTop
    );
  });
});
