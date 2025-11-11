import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateService as TranslateServiceSource } from '@ngx-translate/core';
import { TestingModule } from '@testing/testing.module';
import { TranslateService } from '../services/translate.service';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      providers: [
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: () => '' }
        },
        {
          provide: TranslateService,
          useValue: { bounds: () => '' }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const service: TranslateService = TestBed.inject(TranslateService);
    const _ref: ChangeDetectorRef = TestBed.inject(ChangeDetectorRef);
    const _translate: TranslateServiceSource = TestBed.inject(
      TranslateServiceSource
    );
    pipe = new TranslatePipe(_ref as any, _translate as any, service as any);
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    expect(pipe.transform('TRANSFORM')).toEqual('TRANSFORM');
  });
});
