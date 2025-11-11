import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MailboxDatePipe } from '@commons/pipes/mailbox-date.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import {
  HomeAlertIds,
  HomeAlertPriority
} from '../../entities/home-alert.entities';
import { HomeAlertsComponent } from './home-alerts.component';

describe('HomeAlertComponent', () => {
  let component: HomeAlertsComponent;
  let fixture: ComponentFixture<HomeAlertsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAlertsComponent, MailboxDatePipe],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAlertsComponent);
    component = fixture.componentInstance;
    component.alerts = [
      {
        id: HomeAlertIds.COMPLEMENTARY_SERVICES,
        description: '',
        priority: HomeAlertPriority.COMPLEMENTARY_SERVICES
      }
    ];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onAction', () => {
    spyOn(component.goAction, 'emit');
    const id = HomeAlertIds.COMPLEMENTARY_SERVICES;
    component.onAction(id);
    expect(component.goAction.emit).toHaveBeenCalledWith(id);
  });
});
