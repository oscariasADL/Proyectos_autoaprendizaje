import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { MailboxDatePipe } from './mailbox-date.pipe';

const value = '2021-09-06T09:15:02';
const transformedValue = '6/Sep';

describe('MailboxDatePipe', () => {
  let pipe: MailboxDatePipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new MailboxDatePipe();
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    expect(pipe.transform(value)).toEqual(transformedValue);
  });

  it('should be correct null', () => {
    expect(pipe.transform(null)).toEqual(null);
  });
});
