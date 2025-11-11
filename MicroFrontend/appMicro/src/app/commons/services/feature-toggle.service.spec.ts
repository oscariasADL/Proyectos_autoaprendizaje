import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { AlertService } from '@commons/services/alert.service';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { of } from 'rxjs';
import { FeatureToggleService } from './feature-toggle.service';

describe('FeatureToggleService', () => {
  let service: FeatureToggleService;
  let routerSpy;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['url']);
    TestBed.configureTestingModule({
      providers: [
        FeatureToggleService,
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: AppFacade, useClass: AppFacadeMock },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(FeatureToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call listenFeatureEvents', () => {
    routerSpy.events = of(new NavigationEnd(1, '', ''));
    expect(service.listenFeatureEvents()).toBeUndefined();
  });
});
