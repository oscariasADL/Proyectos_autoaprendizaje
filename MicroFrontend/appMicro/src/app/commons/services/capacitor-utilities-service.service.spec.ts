import { TestBed } from '@angular/core/testing';
import { CapacitorUtilitiesService } from './capacitor-utilities-service.service';
import { AppFacade } from '@app/app.facade';
import { ToastType } from '../entities/toast/toast.entities';
import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('CapacitorUtilitiesService', () => {
  let service: CapacitorUtilitiesService;
  let facadeSpy: jasmine.SpyObj<AppFacade>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AppFacade', ['closeToast', 'showToast']);

    TestBed.configureTestingModule({
      providers: [
        CapacitorUtilitiesService,
        { provide: AppFacade, useValue: spy, useClass: AppFacadeMock }
      ]
    });

    service = TestBed.inject(CapacitorUtilitiesService);
    facadeSpy = TestBed.inject(AppFacade) as jasmine.SpyObj<AppFacade>;

    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    spyOn(Clipboard, 'write').and.returnValue(Promise.resolve());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call closeToast and showToast with correct parameters', async () => {
    const text = 'Test text';
    await service.copyToClipboard(text);

    expect(facadeSpy.closeToast).toHaveBeenCalled();
    expect(facadeSpy.showToast).toHaveBeenCalledWith({
      type: ToastType.success,
      title: text
    });
  });

  it('should write to clipboard if not native platform', async () => {
    spyOn(Capacitor, 'isNativePlatform').and.returnValue(false);

    const text = 'Test text';
    await service.copyToClipboard(text);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
  });
});
