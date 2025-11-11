import { NotificationsEmptyStateComponent } from './notifications-empty-state.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { IonicModule } from '@ionic/angular';
import { CommonsModule } from '@app/commons/commons.module';

describe('NotificationsEmptyStateComponent', () => {
  let component: NotificationsEmptyStateComponent;
  let fixture: ComponentFixture<NotificationsEmptyStateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(NotificationsEmptyStateComponent, {
      add: {
        imports: [IonicModule, TestingModule, NotificationsEmptyStateComponent]
      },
      remove: {
        imports: [CommonsModule]
      }
    }).compileComponents();
    fixture = TestBed.createComponent(NotificationsEmptyStateComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update notifications', () => {
    spyOn(component.notificationsUpdated, 'emit');

    component.updateNotifications();

    expect(component.notificationsUpdated.emit).toHaveBeenCalled();
  });

  it('should go back', () => {
    spyOn(component.navigateBack, 'emit');

    component.goBack();

    expect(component.navigateBack.emit).toHaveBeenCalled();
  });
});
