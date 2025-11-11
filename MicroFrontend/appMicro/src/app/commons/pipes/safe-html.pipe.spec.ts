import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const DomSanitizerMock = { sanitize: (val) => val };
    pipe = new SafeHtmlPipe(DomSanitizerMock as any);
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
