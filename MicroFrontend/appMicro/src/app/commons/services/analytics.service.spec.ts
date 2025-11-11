import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(0, '', '')),
            routerState: { snapshot: { url: '' } }
          }
        }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call initAnalytics', () => {
    expect(service.initAnalytics('1.0.0')).toBeTruthy();
  });

  it('should setUserDocument', () => {
    expect(service.setUserDocument('123456789')).toBeUndefined();
  });

  it('should sendError', async () => {
    service.setUserDocument('123456789');
    expect(await service.setUserDocument).toBeDefined();
  });
});
