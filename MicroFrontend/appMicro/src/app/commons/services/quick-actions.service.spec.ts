import { TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { QuickActionsService } from './quick-actions.service';

describe('QuickActionsService', () => {
  let navControlSpy;
  let service: QuickActionsService;

  beforeEach(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    TestBed.configureTestingModule({
      providers: [{ provide: NavController, useValue: navControlSpy }]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(QuickActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call init', () => {
    expect(service.init).toBeTruthy();
  });
});
