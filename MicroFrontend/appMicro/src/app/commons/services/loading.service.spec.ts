import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingComponent } from '../components/loading/loading.component';
import { ImageUrlPipe } from '../pipes/image-url.pipe';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [LoadingComponent, ImageUrlPipe],
      imports: [BrowserModule],
      providers: [LoadingService],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );
  beforeEach(() => (service = TestBed.inject(LoadingService)));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should enable Loading', () => {
    expect(service.enableLoading()).toBeUndefined();
    expect(service.disableLoading()).toBeUndefined();
  });
});
