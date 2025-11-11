import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QrScannerTemplateComponent } from './qr-scanner-template.component';
import { TestingModule } from '@testing/testing.module';

describe('QrScannerTemplateComponent', () => {
  let component: QrScannerTemplateComponent;
  let fixture: ComponentFixture<QrScannerTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(QrScannerTemplateComponent, {
      add: {
        imports: [TestingModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(QrScannerTemplateComponent);
    component = fixture.componentInstance;
    component.userGuidanceOptions = {
      title: 'Lectura de código',
      cancelButtonText: 'Cancelar'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be closeScannerModal', () => {
    expect(component.closeScannerModal.emit()).toBe(void 0);
  });

  it('should call be toggleFlashlight', () => {
    expect(component.toggleFlashlight.emit()).toBe(void 0);
  });
});
