import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TestingModule } from '@testing/testing.module';
import { AvalStocksDetailTitlePipe } from './aval-stocks-detail-title.pipe';

describe('AvalStocksDetailTitlePipe', () => {
  let pipe: AvalStocksDetailTitlePipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      providers: [
        {
          provide: TranslateService,
          useValue: { instant: () => 'myKey' }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const translateService: TranslateService = TestBed.inject(TranslateService);
    pipe = new AvalStocksDetailTitlePipe(translateService);
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    const val = { date: '01072021', type: 'O' };
    expect(pipe.transform(val)).toEqual('myKey myKey myKey 0107');
  });
});
