import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { HiddenFormatPipe } from './hidden-format.pipe';
import { ProductFacade } from '@modules/product/product.facade';
import { of } from 'rxjs';

describe('HiddenFormatPipe', () => {
  let pipe: HiddenFormatPipe;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestingModule],
      providers: [
        { provide: ProductFacade, useClass: ProductFacadeMock },
        ElementRef
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const facade = new ProductFacadeMock() as any;
    const btn = document.createElement('BUTTON');
    const el = new ElementRef(btn);
    pipe = new HiddenFormatPipe(facade, el);
  });

  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be correct', async () => {
    pipe.transform('1000').subscribe((val) => {
      expect(val).toEqual('1000');
    });
  });

  it('should call animate', () => {
    expect(pipe.animate()).toBeUndefined();
  });
  it('should call animate when working is true', waitForAsync(() => {
    pipe['facade'].workingHiddenBalance$ = of(true);
    pipe['facade'].hiddenBalance$ = of(true);
    const animateSpy = spyOn(pipe, 'animate').and.callThrough();
    pipe.transform('1000').subscribe((result) => {
      expect(animateSpy).toHaveBeenCalled();
      expect(result).toEqual('***');
    });
  }));
});
