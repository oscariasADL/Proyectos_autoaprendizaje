import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { FirstWordPipe } from './first-word.pipe';

describe('FirstWordPipe', () => {
  let pipe: FirstWordPipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const CapitalizePipeMock = { transform: () => 'myTransform' };
    pipe = new FirstWordPipe(CapitalizePipeMock as any);
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    expect(pipe.transform('my transform')).toEqual('myTransform');
  });

  it('should be correct null', () => {
    expect(pipe.transform(null)).toEqual(null);
  });
});
