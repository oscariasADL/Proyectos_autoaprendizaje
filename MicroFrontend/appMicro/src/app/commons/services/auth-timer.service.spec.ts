import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { UserIdleService } from 'angular-user-idle';
import { AuthTimerService } from './auth-timer.service';

describe('AuthTimerService', () => {
  let service: AuthTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthTimerService,
        UserIdleService,
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    });
    service = TestBed.inject(AuthTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call stopWatching', () => {
    try {
      expect(service.stopWatching()).toBeUndefined();
      expect(service.stop()).toBeUndefined();
    } catch (error) {
      fail(`stopWatching threw an error: ${error}`);
    }
  });
});
