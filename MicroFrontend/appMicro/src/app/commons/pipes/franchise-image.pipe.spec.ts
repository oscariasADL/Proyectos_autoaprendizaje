import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { FRANCHISE_ICONS, FRANCHISE_IMAGES } from '../constants/card.constants';
import { FranchiseImagePipe } from './franchise-image.pipe';

describe('FranchiseImagePipe', () => {
  let pipe: FranchiseImagePipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new FranchiseImagePipe();
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', () => {
    expect(pipe.transform('VISA')).toEqual(
      './assets/img/' + FRANCHISE_IMAGES.VISA
    );
    expect(pipe.transform('VISA', true)).toEqual(
      './assets/img/' + FRANCHISE_ICONS.VISA
    );
  });
  it('should return an empty string if type is not provided', () => {
    expect(pipe.transform('')).toEqual('');
    expect(pipe.transform(null)).toEqual('');
  });
});
