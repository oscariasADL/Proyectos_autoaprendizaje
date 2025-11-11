import { TestBed } from '@angular/core/testing';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { SecureKeys } from '../constants/keys.constants';
import { AdlSecureStorageService } from './adl-secure-storage.service';
import { AlertService } from './alert.service';
import { InformationService } from './information.service';

describe('InformationService', () => {
  let service: InformationService;
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AlertService, useClass: AlertServiceMock },
        {
          provide: AdlSecureStorageService,
          useValue: {
            getAll: () => async () => ({
              [SecureKeys.hiddenDirectedPaymentInfo]: ''
            }),
            put: () => async (a, b, c) => true
          }
        }
      ]
    });
    service = TestBed.inject(InformationService);
    alertService = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call showPanelIfNecessary', () => {
    expect(
      service.showPanelIfNecessary({
        panelKey: SecureKeys.hiddenDirectedPaymentInfo
      })
    ).toBeTruthy();
  });

  xit('should call showPanelIfNecessary async', async () => {
    spyOn(alertService, 'create').and.returnValue(Promise.resolve(null));
    try {
      const result = await service.showPanelIfNecessary(
        {
          panelKey: SecureKeys.hiddenDirectedPaymentInfo
        },
        true
      );
      expect(result).toBeNull();
    } catch (error) {
      fail(`showPanelIfNecessary threw an error: ${error}`);
    }
  });

  it('should call showPanel', () => {
    expect(
      service.showPanel({
        panelKey: SecureKeys.hiddenDirectedPaymentInfo
      })
    ).toBeTruthy();
  });
});
