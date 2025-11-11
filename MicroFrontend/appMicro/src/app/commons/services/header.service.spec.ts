import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { HeaderService } from '@commons/services/header.service';
import { TestingModule } from '@testing/testing.module';
import { ReplaySubject } from 'rxjs';
import { PRODUCTS, TRUST_RELATION } from '../constants/navigate.constants';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderService', () => {
  let service: HeaderService;
  const eventSubject = new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable(),
    url: 'container',
    routerState: { snapshot: { url: PRODUCTS.toString() } }
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [HeaderService, { provide: Router, useValue: routerMock }],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  beforeEach(() => {
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call listenRouterEvents', async () => {
    spyOn(service, 'setHeader').and.returnValue();
    eventSubject.next(new NavigationEnd(1, 'container', 'container'));
    service.listenRouterEvents();
    expect(service.listenRouterEvents()).toBeUndefined();
  });

  it('should set header', async () => {
    expect(service.setHeader('/')).toBeUndefined();
    expect(service.setHeader(PRODUCTS.toString())).toBeUndefined();
    expect(service.setHeader(TRUST_RELATION.toString())).toBeUndefined();
  });
});
