import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TestingModule } from '@testing/testing.module';
import { SecureQuestionPipe } from './secure-question.pipe';

const value = '4';
const transformedValue = '4';

describe('SecureQuestionPipe', () => {
  let pipe: SecureQuestionPipe;
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
    pipe = new SecureQuestionPipe(translateService);
  });

  it('Create an instance', async () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', async () => {
    expect(pipe.transform(value)).toEqual(transformedValue);
  });
});
