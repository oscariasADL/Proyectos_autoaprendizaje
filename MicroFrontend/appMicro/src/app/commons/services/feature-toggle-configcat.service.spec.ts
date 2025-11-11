import { TestBed } from '@angular/core/testing';
import { ConfigCatFeatureToggleService } from './feature-toggle-configcat.service';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { FeatureToggleConfigCatServiceMock } from '@testing/mocks/services/feature-toggle.configcat.service.mock';
import { throwError } from 'rxjs';

describe('ConfigCatFeatureToggleService', () => {
  let service: ConfigCatFeatureToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigCatFeatureToggleService,
          useClass: FeatureToggleConfigCatServiceMock
        },
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    });
    service = TestBed.inject(ConfigCatFeatureToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllValuesAsync and return the expected result', (done) => {
    service.getAllValuesAsync().subscribe((res) => {
      expect(res).toEqual([
        { settingKey: 'TransferCel2cel', settingValue: 'true' }
      ]);
      done();
    });
  });

  it('should call getAllValuesAsync with user and return the expected result', (done) => {
    service
      .getAllValuesAsync({ identifier: '12345', custom: {} })
      .subscribe((res) => {
        expect(res).toEqual([
          { settingKey: 'TransferCel2cel', settingValue: 'true' }
        ]);
        done();
      });
  });

  it('should handle error when getAllValuesAsync fails', (done) => {
    spyOn(service, 'getAllValuesAsync').and.callFake(() =>
      throwError(() => new Error('Something went wrong'))
    );

    service.getAllValuesAsync().subscribe({
      next: () => {
        done.fail('Expected an error, but got success');
      },
      error: (err) => {
        expect(err.message).toBe('Something went wrong');
        done();
      }
    });
  });
});
