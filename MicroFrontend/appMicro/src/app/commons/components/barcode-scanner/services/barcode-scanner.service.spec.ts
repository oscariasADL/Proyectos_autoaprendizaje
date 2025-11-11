import { TestBed } from '@angular/core/testing';

import { BarcodeScannerService } from './barcode-scanner.service';

describe('BarcodeScannerService', () => {
  let service: BarcodeScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarcodeScannerService]
    });
    service = TestBed.inject(BarcodeScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call be prepareScanner', async () => {
    expect(await service.prepareScanner()).toBeTruthy();
  });

  it('should call be initialize', async () => {
    expect(await service.initialize()).toBe(void 0);
  });

  it('should call be getLicenseInfo', async () => {
    const license = await service.getLicenseInfo();
    expect(license).toBeDefined();
    expect(license.status).toBeDefined();
    expect(typeof license.status).toBe('string');
    expect(license.isValid).toBeDefined();
    expect(typeof license.isValid).toBe('function');
  });

  it('should call be createBarcodeScanner', async () => {
    expect(await service.createBarcodeScanner({})).toBe(void 0);
  });

  it('should call be pause', () => {
    expect(service.pause()).toBe(void 0);
  });

  it('should call be dispose', () => {
    expect(service.dispose()).toBe(void 0);
  });

  it('should call be turnOnTorch', () => {
    expect(service.turnOnTorch()).toBe(void 0);
  });

  it('should call be turnOffTorch', () => {
    expect(service.turnOffTorch()).toBe(void 0);
  });
});
