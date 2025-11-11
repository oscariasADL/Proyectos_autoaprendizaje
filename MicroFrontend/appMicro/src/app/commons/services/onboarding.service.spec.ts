import { TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { AdlSecureStorageService } from './adl-secure-storage.service';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
  let service: OnboardingService;
  let nacControlSpy;

  beforeEach(() => {
    nacControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'pop'
    ]);
    TestBed.configureTestingModule({
      providers: [
        OnboardingService,
        AdlSecureStorageService,
        { provide: NavController, useValue: nacControlSpy }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(OnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be checkOnboarding', () => {
    expect(service.checkOnboarding()).toBeTruthy();
  });

  it('should be setOnboardingComplete', () => {
    expect(service.setOnboardingComplete()).toBeTruthy();
  });
});
