import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { EnableNotificationsComponent } from './enable-notifications.component';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('EnableNotificationsComponent', () => {
  let component: EnableNotificationsComponent;
  let fixture: ComponentFixture<EnableNotificationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        RouterTestingModule,
        TestingModule,
        EnableNotificationsComponent,
        GlobalPipesModule
      ],
      providers: [{ provide: AppFacade, useValue: AppFacadeMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(EnableNotificationsComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should enable notifications', () => {
    spyOn(component.notificationsEnabled, 'emit');

    component.enableNotifications();

    expect(component.notificationsEnabled.emit).toHaveBeenCalled();
  });
});
