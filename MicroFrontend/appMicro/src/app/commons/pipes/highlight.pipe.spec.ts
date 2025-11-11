import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    expect(pipe.transform('my', 'transform')).toEqual('my');
  });

  it('should return the original text if text is provided but empty', () => {
    expect(pipe.transform('', 'search')).toEqual('');
  });

  it('should return the original text if text is provided but search is empty', () => {
    expect(pipe.transform('some text', '')).toEqual('some text');
  });

  it('should return the original text if text is provided but search is null', () => {
    expect(pipe.transform('some text', null)).toEqual('some text');
  });

  it('should return the original text if text is null but search is provided', () => {
    expect(pipe.transform(null, 'search')).toBeNull();
  });
});
