import { TestBed } from '@angular/core/testing';
import { SpiConsentService } from './spi-consent.service';
import { HomeFacade } from '@app/modules/home/home.facade';
import { ModalController } from '@ionic/angular';
import { AdlSecureStorageService } from '../adl-secure-storage.service';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { SpiTransferConsentComponent } from '@app/modules/transfers/components/spi-transfer-consent/spi-transfer-consent.component';

describe('SpiConsentService', () => {
  let service: SpiConsentService;
  let facadeSpy: jasmine.SpyObj<HomeFacade>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;
  let secureStorageSpy: jasmine.SpyObj<AdlSecureStorageService>;

  beforeEach(() => {
    facadeSpy = jasmine.createSpyObj('HomeFacade', [
      'featureFlagsByKey',
      'fetchSPIAuthorization',
      'acceptSpiConsent'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'getTop'
    ]);
    secureStorageSpy = jasmine.createSpyObj('AdlSecureStorageService', [
      'getAll'
    ]);
    TestBed.configureTestingModule({
      providers: [
        SpiConsentService,
        { provide: HomeFacade, useValue: facadeSpy },
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: AdlSecureStorageService, useValue: secureStorageSpy }
      ]
    });
    service = TestBed.inject(SpiConsentService);
  });

  describe('fetchSpiConsent', () => {
    it('should NOT call checkSPIConsentInStorage when feature flag ShowSPITransferConsentModal is false', () => {
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (key === FeatureFlagsKey.ShowSPITransferConsentModal) {
          return null;
        }
        return null;
      });
      spyOn<any>(service, 'checkSPIConsentInStorage');
      service.fetchSpiConsent();
      expect(facadeSpy.featureFlagsByKey).toHaveBeenCalledWith(
        FeatureFlagsKey.ShowSPITransferConsentModal
      );
      expect(service['checkSPIConsentInStorage']).not.toHaveBeenCalled();
    });

    it('should call checkSPIConsentInStorage when feature flag ShowSPITransferConsentModal is true', () => {
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (key === FeatureFlagsKey.ShowSPITransferConsentModal) {
          return true;
        }
        return null;
      });
      spyOn<any>(service, 'checkSPIConsentInStorage');
      service.fetchSpiConsent();
      expect(facadeSpy.featureFlagsByKey).toHaveBeenCalledWith(
        FeatureFlagsKey.ShowSPITransferConsentModal
      );
      expect(service['checkSPIConsentInStorage']).toHaveBeenCalled();
    });
  });

  describe('presentSpiConsentModal', () => {
    let modalSpy: jasmine.SpyObj<any>;

    beforeEach(() => {
      modalSpy = jasmine.createSpyObj('HTMLIonModalElement', [
        'present',
        'onDidDismiss'
      ]);

      modalCtrlSpy.create.and.returnValue(Promise.resolve(modalSpy));
    });

    it('should present the modal and accept consent if onDidDismiss returns data true', async () => {
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (
          key === FeatureFlagsKey.SkipSPITransferConsent ||
          key === FeatureFlagsKey.SkipSPITransferConsentXOption
        ) {
          return true;
        }
        return null;
      });

      modalSpy.onDidDismiss.and.returnValue(Promise.resolve({ data: true }));
      await service.presentSpiConsentModal();
      expect(modalCtrlSpy.create).toHaveBeenCalledWith({
        id: 'spi-transfer-consent-modal',
        component: SpiTransferConsentComponent,
        componentProps: {
          skipSPITransferConsent: true,
          skipSPITransferConsentXOption: true
        },
        mode: 'md',
        cssClass: 'avv-custom-modal',
        backdropDismiss: true
      });
      expect(modalSpy.present).toHaveBeenCalled();
      expect(modalSpy.onDidDismiss).toHaveBeenCalled();
      expect(facadeSpy.acceptSpiConsent).toHaveBeenCalled();
    });

    it('should present the modal and NOT accept consent if onDidDismiss returns data false', async () => {
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (
          key === FeatureFlagsKey.SkipSPITransferConsent ||
          key === FeatureFlagsKey.SkipSPITransferConsentXOption
        ) {
          return;
        }
        return null;
      });

      modalSpy.onDidDismiss.and.returnValue(Promise.resolve({ data: false }));
      await service.presentSpiConsentModal();
      expect(modalCtrlSpy.create).toHaveBeenCalledWith({
        id: 'spi-transfer-consent-modal',
        component: SpiTransferConsentComponent,
        componentProps: {
          skipSPITransferConsent: false,
          skipSPITransferConsentXOption: false
        },
        mode: 'md',
        cssClass: 'avv-custom-modal',
        backdropDismiss: false
      });
      expect(modalSpy.present).toHaveBeenCalled();
      expect(modalSpy.onDidDismiss).toHaveBeenCalled();
      expect(facadeSpy.acceptSpiConsent).not.toHaveBeenCalled();
    });
  });

  describe('checkSPIConsentInStorage', () => {
    it('should do nothing if consent is already accepted (spiAuthorization true)', async () => {
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (key === FeatureFlagsKey.ShowSPITransferConsentModal) {
          return true;
        }
        return null;
      });

      const dbFake = [
        {
          key: SecureKeys.spiAuthorization,
          value: true
        },
        { key: SecureKeys.isSpiConsentCalled, value: false }
      ];

      secureStorageSpy.getAll.and.returnValue(Promise.resolve(dbFake));
      spyOn<any>(service, 'presentSpiConsentModal');

      await service.fetchSpiConsent();
      expect(secureStorageSpy.getAll).toHaveBeenCalled();
      expect(service['presentSpiConsentModal']).not.toHaveBeenCalled();
      expect(facadeSpy.fetchSPIAuthorization).not.toHaveBeenCalled();
    });

    it('should present the modal if consent is NOT accepted and isSpiConsentCalled is true', async () => {
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (key === FeatureFlagsKey.ShowSPITransferConsentModal) {
          return true;
        }
        return null;
      });

      const dbFake = [
        {
          key: SecureKeys.spiAuthorization,
          value: false
        },
        { key: SecureKeys.isSpiConsentCalled, value: true }
      ];

      secureStorageSpy.getAll.and.returnValue(Promise.resolve(dbFake));
      spyOn<any>(service, 'presentSpiConsentModal');

      await service.fetchSpiConsent();
      expect(secureStorageSpy.getAll).toHaveBeenCalled();
      expect(service['presentSpiConsentModal']).toHaveBeenCalled();
      expect(facadeSpy.fetchSPIAuthorization).not.toHaveBeenCalled();
    });

    it('should call facade.fetchSPIAuthorization if consent is NOT accepted and isSpiConsentCalled is false', async () => {
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (key === FeatureFlagsKey.ShowSPITransferConsentModal) {
          return true;
        }
        return null;
      });

      const dbFake = [
        {
          key: SecureKeys.spiAuthorization,
          value: false
        },
        { key: SecureKeys.isSpiConsentCalled, value: false }
      ];

      secureStorageSpy.getAll.and.returnValue(Promise.resolve(dbFake));
      spyOn<any>(service, 'presentSpiConsentModal');

      await service.fetchSpiConsent();
      expect(secureStorageSpy.getAll).toHaveBeenCalled();
      expect(facadeSpy.fetchSPIAuthorization).toHaveBeenCalled();
      expect(service['presentSpiConsentModal']).not.toHaveBeenCalled();
    });

    it('should catch and log errors if getAll throws an exception', async () => {
      const consoleErrorSpy = spyOn(console, 'error');
      facadeSpy.featureFlagsByKey.and.callFake((key: FeatureFlagsKey) => {
        if (key === FeatureFlagsKey.ShowSPITransferConsentModal) {
          return true;
        }
        return null;
      });

      secureStorageSpy.getAll.and.returnValue(Promise.reject('error'));

      await service.fetchSpiConsent();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al obtener el consentimiento SPI del almacenamiento:',
        'error'
      );
    });
  });
});
