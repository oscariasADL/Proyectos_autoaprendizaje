import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarTypes } from '@commons/components/calendar/entities/calendar.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { FilterMove } from '@commons/entities/product/movement.interface';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { MovementsDatePickerComponent } from './movements-date-picker.component';

describe('MovementsDatePickerComponent', () => {
  let component: MovementsDatePickerComponent;
  let fixture: ComponentFixture<MovementsDatePickerComponent>;
  let modalSpy, modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', ['present', 'onDidDismiss']);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [MovementsDatePickerComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsDatePickerComponent);
    component = fixture.componentInstance;
    component.date = new Date();
    component.params = {
      page: 1,
      pageSize: 15,
      state: FilterMove.All,
      refreshMovements: true,
      currency: 'COP',
      endDate: '2021-01-22',
      startDate: '2021-01-15'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be formatDate', () => {
    expect(component.formatDate(new Date('2021-02-08'))).toEqual('2021-02-07');
  });

  it('should be get calendarTypes', () => {
    expect(component.calendarTypes.from).toEqual(CalendarTypes.from);
  });

  it('should be openCalendar', () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: [new Date(), new Date()]
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(component.openCalendar()).toBeTruthy();
  });
});
