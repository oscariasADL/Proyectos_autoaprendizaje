import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { TranslateService } from './translate.service';
import { ParameterType } from '@store/state/parameter.state';

describe('TranslateService', () => {
  let service: TranslateService;
  let facade: AppFacadeMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        {
          provide: AppFacade,
          useClass: AppFacadeMock
        }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(TranslateService);
    facade = TestBed.inject(AppFacade) as unknown as AppFacadeMock;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call bounds and initialize boundsCache when bounds are not null and length > 0', () => {
    const mockBounds = [
      { label: 'someLabel', value: '100' },
      { label: '$someOtherLabel', value: '200' }
    ];

    spyOn(facade, 'parameterByKey').and.returnValue(of(mockBounds));

    const result = service.bounds;

    expect(facade.parameterByKey).toHaveBeenCalledWith(ParameterType.bounds);
    expect(result).toEqual({
      someLabel: '100',
      $someOtherLabel: '200'
    });
  });

  it('should return an empty object when bounds is null or empty', () => {
    spyOn(facade, 'parameterByKey').and.returnValue(of(null));

    const result = service.bounds;

    expect(facade.parameterByKey).toHaveBeenCalledWith(ParameterType.bounds);
    expect(result).toEqual({});
  });
});
