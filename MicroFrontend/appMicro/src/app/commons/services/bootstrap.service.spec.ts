import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingComponent } from '@commons/components/loading/loading.component';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { BootstrapService } from '@commons/services/bootstrap.service';
import { NewAppUpdateService } from '@commons/services/new-app-update.service';
import { OnboardingService } from '@commons/services/onboarding.service';
import { NewAppUpdateServiceMock } from '@testing/mocks/services/new-app-update.service.mock';
import { OnboardingServiceMock } from '@testing/mocks/services/onboarding.service.mock';

describe('BootstrapService', () => {
  let service: BootstrapService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [LoadingComponent, ImageUrlPipe],
      imports: [BrowserModule],
      providers: [
        BootstrapService,
        {
          provide: OnboardingService,
          useClass: OnboardingServiceMock
        },
        {
          provide: NewAppUpdateService,
          useClass: NewAppUpdateServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );
  beforeEach(() => (service = TestBed.inject(BootstrapService)));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should checkInit', async () => {
    try {
      await service.checkInit();
      expect(service.checkInit).toBeDefined();
    } catch (error) {
      fail(`Error in put, get, delete item: ${error}`);
    }
  });
});
