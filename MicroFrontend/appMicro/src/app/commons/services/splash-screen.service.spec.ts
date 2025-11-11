import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppFacade } from '@app/app.facade';
import { LoadingComponent } from '@commons/components/loading/loading.component';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('SplashScreenService', () => {
  let service: SplashScreenService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [LoadingComponent, ImageUrlPipe],
      imports: [BrowserModule],
      providers: [
        SplashScreenService,
        { provide: AppFacade, useClass: AppFacadeMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );
  beforeEach(() => (service = TestBed.inject(SplashScreenService)));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hide splashScreen', async () => {
    await service.hideSplashScreen();
    expect(service.hideSplashScreen).toBeDefined();
  });
});
