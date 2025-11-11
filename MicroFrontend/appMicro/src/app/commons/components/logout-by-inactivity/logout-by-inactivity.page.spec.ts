import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestComponent } from '@testing/component/test.component';
import { TestingModule } from '@testing/testing.module';

import { LogoutByInactivityPage } from './logout-by-inactivity.page';

describe('LogoutByInactivityPage', () => {
  let component: LogoutByInactivityPage;
  let fixture: ComponentFixture<LogoutByInactivityPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutByInactivityPage, ImageUrlPipe],
      imports: [
        IonicModule,
        TestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'auth/login',
            component: TestComponent
          }
        ])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutByInactivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirectToLogin', () => {
    fixture.ngZone.run(() =>
      expect(
        expect(component.redirectToLogin()).toBeUndefined()
      ).toBeUndefined()
    );
  });
});
