import { TestBed } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { AlertService } from './alert.service';
import { AlertComponentType } from '../entities/alert/alert-sheet.entities';
import { AlertComponent } from '../components/alert/alert.component';

describe('AlertService', () => {
  let service: AlertService;
  let modalSpy;
  let modalCtrlSpy;

  beforeEach(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'getTop'
    ]);
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call create', () => {
    modalSpy.onWillDismiss.and.callFake(async () => ({
      data: modalSpy
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(
      service.create({
        title: 'Test',
        description: 'Test'
      })
    ).toBeTruthy();
  });

  it('should be call close', () => {
    service.close();
    expect(service.alreadyPresent).toEqual(false);
  });
  it('should create a modal with alertCenter type and use correct cssClass and component', async () => {
    const fakeData = { result: 'success' };
    modalSpy.present.and.returnValue(Promise.resolve());
    modalSpy.onWillDismiss.and.returnValue(Promise.resolve({ data: fakeData }));
    modalCtrlSpy.create.and.returnValue(Promise.resolve(modalSpy));
    const props = {
      title: 'Test Alert Center',
      description: 'Prueba tipo alert center',
      componentType: AlertComponentType.alertCenter
    };
    const result = await service.create(props);
    expect(modalCtrlSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        component: AlertComponent,
        componentProps: { props },
        cssClass: 'avv-custom-center-modal',
        mode: 'md'
      })
    );
    expect(result).toEqual(fakeData);
  });
  it('should call dismiss on this.alert if it exists', async () => {
    modalSpy.dismiss = jasmine.createSpy('dismiss');

    (service as any).alert = modalSpy;

    await service.close();

    expect(modalSpy.dismiss).toHaveBeenCalled();
    expect(service.alreadyPresent).toEqual(false);
  });

  it('should call modalCtrl.dismiss if this.alert is null but getTop returns a modal', async () => {
    (service as any).alert = null;

    modalCtrlSpy.getTop.and.returnValue(Promise.resolve({ id: 'fakeModal' }));

    modalCtrlSpy.dismiss = jasmine.createSpy('dismiss');

    await service.close();

    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
    expect(service.alreadyPresent).toBe(false);
  });
});
