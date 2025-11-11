import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { Observable } from 'rxjs';

import { NotificationPermissionsComponent } from './notification-permissions.component';
import * as pushNotificationRegisterActions from '@store/actions/push-notification-register.actions';

describe('NotificationPermissionsComponent', () => {
  let component: NotificationPermissionsComponent;
  let fixture: ComponentFixture<NotificationPermissionsComponent>;
  const actions$ = new Observable<Action>();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPermissionsComponent, ImageUrlPipe],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        provideMockActions(() => actions$),
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: {
                  data: { title: '' },
                  method: () => {
                    return;
                  }
                }
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call run', () => {
    expect(component.run(null)).toBeUndefined();
  });

  it('should call ngOnInit', () => {
    const componentAny = component as any;
    componentAny.actionsGroup$ = new Observable((subscriber) => {
      subscriber.next({
        type: pushNotificationRegisterActions
          .togglePushNotificationsSuccessAction.type,
        deviceToken: '33'
      });
    });
    expect(componentAny.ngOnInit()).toBeUndefined();

    componentAny.actionsGroup$ = new Observable((subscriber) => {
      subscriber.next({
        type: pushNotificationRegisterActions.togglePushNotificationsErrorAction
          .type
      });
    });
    expect(componentAny.ngOnInit()).toBeUndefined();
  });
});
