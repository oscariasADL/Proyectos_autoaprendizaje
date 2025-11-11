import { TestBed } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { TransfiyaInfoService } from './transfiya-info.service';

describe('TransfiyaInfoService', () => {
  let service: TransfiyaInfoService;
  let modalCtrlSpy;
  let modalSpy;

  beforeEach(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    });
    service = TestBed.inject(TransfiyaInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call showTransfiyaInfo', async () => {
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    spyOn(service, 'showTransfiyaInfo').and.callThrough();
    try {
      await service.showTransfiyaInfo();
      expect(service.showTransfiyaInfo).toHaveBeenCalled();
    } catch (error) {
      fail(`showTransfiyaInfo threw an error: ${error}`);
    }
  });
});
