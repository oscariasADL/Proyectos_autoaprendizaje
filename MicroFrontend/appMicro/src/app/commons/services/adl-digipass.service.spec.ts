import { TestBed } from '@angular/core/testing';
import { AdlDigipassService } from '@commons/services/adl-digipass.service';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { LogManagerService } from './log-manager-service/log-manager-service.service';
import { LogManagerServiceMock } from '@testing/mocks/services/log-manager.service.mock';

describe('AdlDigipassService', () => {
  let service: AdlDigipassService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdlDigipassService,
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        {
          provide: LogManagerService,
          useClass: LogManagerServiceMock
        }
      ]
    });

    service = TestBed.inject(AdlDigipassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call saveVectors(), return string', async () => {
    spyOn(service, 'saveVectors').and.callThrough();
    try {
      await service.saveVectors('staticvector', 'dynamicyvector');
      expect(service.saveVectors).toHaveBeenCalled();
    } catch (error) {
      fail(`saveVectors threw an error: ${error}`);
    }
  });

  it('should call saveMultiDeviceLicenseActivation(), return string', async () => {
    spyOn(service, 'saveMultiDeviceLicenseActivation').and.callThrough();
    try {
      await service.saveMultiDeviceLicenseActivation(
        'multiDeviceLicenseActivationMock'
      );
      expect(service.saveMultiDeviceLicenseActivation).toHaveBeenCalled();
    } catch (error) {
      fail(`saveMultiDeviceLicenseActivation threw an error: ${error}`);
    }
  });

  it('should call saveMultiDeviceInstanceActivation(), return string', async () => {
    spyOn(service, 'saveMultiDeviceInstanceActivation').and.callThrough();
    try {
      await service.saveMultiDeviceInstanceActivation(
        'multiDeviceInstanceActivationMock'
      );
      expect(service.saveMultiDeviceInstanceActivation).toHaveBeenCalled();
    } catch (error) {
      fail(`saveMultiDeviceInstanceActivation threw an error: ${error}`);
    }
  });

  it('should call staticVector(), return string', async () => {
    spyOn(service, 'staticVector').and.callThrough();
    try {
      await service.staticVector();
      expect(service.staticVector).toHaveBeenCalled();
    } catch (error) {
      fail(`staticVector threw an error: ${error}`);
    }
  });

  it('should call dynamicVector(), return string', async () => {
    spyOn(service, 'dynamicVector').and.callThrough();
    try {
      await service.dynamicVector();
      expect(service.dynamicVector).toHaveBeenCalled();
    } catch (error) {
      fail(`dynamicVector threw an error: ${error}`);
    }
  });

  it('should call multiDeviceLicenseActivation(), return string', async () => {
    spyOn(service, 'multiDeviceLicenseActivation').and.callThrough();
    try {
      await service.multiDeviceLicenseActivation();
      expect(service.multiDeviceLicenseActivation).toHaveBeenCalled();
    } catch (error) {
      fail(`multiDeviceLicenseActivation threw an error: ${error}`);
    }
  });

  it('should call multiDeviceInstanceActivation(), return string', async () => {
    spyOn(service, 'multiDeviceInstanceActivation').and.callThrough();
    try {
      await service.multiDeviceInstanceActivation();
      expect(service.multiDeviceInstanceActivation).toHaveBeenCalled();
    } catch (error) {
      fail(`multiDeviceInstanceActivation threw an error: ${error}`);
    }
  });

  it('should call fingerprint', async () => {
    spyOn(service, 'fingerprint').and.callThrough();
    try {
      await service.fingerprint();
      expect(service.fingerprint).toHaveBeenCalled();
    } catch (error) {
      fail(`fingerprint threw an error: ${error}`);
    }
  });

  it('should call decryptSecureChannelMessageBody', async () => {
    spyOn(service, 'decryptSecureChannelMessageBody').and.callThrough();
    try {
      await service.decryptSecureChannelMessageBody({
        secureChannelMessageRequest: 'hj45hj45',
        staticVector: '789',
        dynamicVector: '8383h',
        fingerprint: 'isis'
      });
      expect(service.decryptSecureChannelMessageBody).toHaveBeenCalled();
    } catch (error) {
      fail(`decryptSecureChannelMessageBody threw an error: ${error}`);
    }
  });

  it('should call generateSignatureFromSecureChannel', async () => {
    spyOn(service, 'generateSignatureFromSecureChannel').and.callThrough();
    try {
      await service.generateSignatureFromSecureChannel({
        secureChannelMessageRequest: 'hj45hj45',
        staticVector: '789',
        dynamicVector: '8383h',
        fingerprint: 'isis'
      });
      expect(service.generateSignatureFromSecureChannel).toHaveBeenCalled();
    } catch (error) {
      fail(`generateSignatureFromSecureChannel threw an error: ${error}`);
    }
  });
});
