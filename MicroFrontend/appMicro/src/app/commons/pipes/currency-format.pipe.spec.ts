import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new CurrencyFormatPipe('en-US');
  });

  it('should be transform', () => {
    expect(pipe.transform(1000)).toEqual(
      '<span aria-hidden="true">$ 1.000</span>'
    );
  });

  it('should be transform string', () => {
    expect(pipe.transform(' ')).toEqual(' ');
  });

  it('should be transform null', () => {
    expect(pipe.transform(null)).toEqual(undefined);
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
