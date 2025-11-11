import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';
import { AppContainer } from './app.container';
import { AppFacade } from './app.facade';
import { AlertService } from '@commons/services/alert.service';

describe('AppComponent', () => {
  let platformReadySpy, platformSpy;

  beforeEach(waitForAsync(() => {
    platformReadySpy = Promise.resolve();

    const backButtonMock = {
      subscribeWithPriority: jasmine.createSpy('subscribeWithPriority')
    };

    platformSpy = jasmine.createSpyObj(
      'Platform',
      {
        ready: platformReadySpy
      },
      {
        backButton: backButtonMock
      }
    );

    TestBed.configureTestingModule({
      declarations: [AppContainer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TestingModule, HttpClientTestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: AppFacade, useClass: AppFacadeMock },
        { provide: AlertService, useClass: AlertServiceMock }
      ]
    }).compileComponents();
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppContainer);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppContainer);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });

  // TODO: add more tests!
});
