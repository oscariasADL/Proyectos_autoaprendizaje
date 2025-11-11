import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { IonInfiniteScroll } from '@ionic/angular';
import { InfiniteScrollService } from '@modules/movement/services/infinite-scroll.service';

describe('InfiniteScrollService', () => {
  const setup = (): {
    service: InfiniteScrollService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(InfiniteScrollService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InfiniteScrollService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: InfiniteScrollService = TestBed.inject(
      InfiniteScrollService
    );
    expect(service).toBeTruthy();
  });

  it('should get infiniteScroll', () => {
    const { service } = setup();
    expect(service.infiniteScroll).toBeUndefined();
  });

  it('should set infiniteScroll', () => {
    const { service } = setup();
    service.infiniteScroll = {} as IonInfiniteScroll;
    expect(service.infiniteScroll).toBeDefined();
  });
});
