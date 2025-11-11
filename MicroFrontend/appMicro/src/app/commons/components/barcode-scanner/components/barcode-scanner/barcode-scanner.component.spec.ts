import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarcodeScannerComponent } from './barcode-scanner.component';
import { TestingModule } from '@testing/testing.module';
import { BarcodeScannerServiceMock } from '@testing/mocks/services/barcode-scanner.service.mock';
import { BarcodeScannerService } from '@commons/components/barcode-scanner/services/barcode-scanner.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';

describe('BarcodeScannerComponent', () => {
  let component: BarcodeScannerComponent;
  let fixture: ComponentFixture<BarcodeScannerComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const alertService = jasmine.createSpyObj('AlertService', ['create']);
  const barcodeScannerServiceMock = new BarcodeScannerServiceMock();

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(BarcodeScannerComponent, {
      add: {
        imports: [TestingModule],
        providers: [
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: AlertService,
            useClass: AlertServiceMock
          },
          {
            provide: BarcodeScannerService,
            useValue: barcodeScannerServiceMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    });

    fixture = TestBed.createComponent(BarcodeScannerComponent);
    component = fixture.componentInstance;

    component['SCANNER_TIMEOUT_MS'] = 0;
    alertService.create.and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be to closeModal', async () => {
    await component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should call be to toggleFlashlight', () => {
    barcodeScannerServiceMock.flashlightStatus = true;
    component.toggleFlashlight();
    fixture.detectChanges();
    expect(component.flashlightStatus).toBeFalsy();

    barcodeScannerServiceMock.flashlightStatus = false;
    component.toggleFlashlight();
    fixture.detectChanges();
    expect(component.flashlightStatus).toBeTruthy();
  });

  it('should call be to get flashlightStatus', () => {
    barcodeScannerServiceMock.flashlightStatus = false;
    expect(component.flashlightStatus).toBeFalsy();
  });

  it('should call be to handleBarcodeResults', () => {
    const componentAny = component as any;
    componentAny.handleBarcodeResults('123456789');
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
