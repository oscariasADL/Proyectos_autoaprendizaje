import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { LastWordPipe } from '@commons/pipes/last-word.pipe';
import { TestingModule } from '@testing/testing.module';

const value = 'Last word';
const transformedValue = 'Word';

let pipe: LastWordPipe;

describe('LastWordPipe', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalizePipe],
      imports: [TestingModule],
      providers: [CapitalizePipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const capitalizePipe: CapitalizePipe = TestBed.inject(CapitalizePipe);
    pipe = new LastWordPipe(capitalizePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be a string', () => {
    expect(typeof pipe.transform(value)).toBe('string');
  });

  it('should be null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should be correct', () => {
    expect(pipe.transform(value)).toEqual(transformedValue);
  });
});
