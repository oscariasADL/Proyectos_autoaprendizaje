import { TestBed } from '@angular/core/testing';
import { AdlSecureStorageService } from './adl-secure-storage.service';

describe('AdlSecureStorageService', () => {
  let service: AdlSecureStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlSecureStorageService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AdlSecureStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initDB', () => {
    expect(service.initDB('1234')).toBeTruthy();
  });

  it('should be put, get, delete item', async () => {
    const name = 'david';
    try {
      expect(await service.put('name', name)).toBeTruthy();
      expect(await service.put('name', name, true)).toBeTruthy();
      expect(await service.get('name')).toEqual(name);
      expect(await service.remove('name')).toBeTruthy();
    } catch (error) {
      fail(`Error in put, get, delete item: ${error}`);
    }
  });

  it('should call cleanAllDB()', async () => {
    spyOn(service, 'cleanAllDB').and.callThrough();
    await service.cleanAllDB();
    expect(service.cleanAllDB).toHaveBeenCalled();
  });
});
