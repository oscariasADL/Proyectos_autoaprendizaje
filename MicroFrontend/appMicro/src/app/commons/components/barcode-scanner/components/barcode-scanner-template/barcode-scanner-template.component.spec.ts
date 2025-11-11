import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarcodeScannerTemplateComponent } from './barcode-scanner-template.component';
import { TestingModule } from '@testing/testing.module';

describe('BarcodeScannerTemplateComponent', () => {
  let component: BarcodeScannerTemplateComponent;
  let fixture: ComponentFixture<BarcodeScannerTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(BarcodeScannerTemplateComponent, {
      add: {
        imports: [TestingModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(BarcodeScannerTemplateComponent);
    component = fixture.componentInstance;
    component.userGuidanceOptions = {
      title: 'Scan your barcode',
      cancelButtonText: 'Cancel'
    };

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be closeScannerModal', () => {
    expect(component.closeScannerModal.emit()).toBe(void 0);
  });
});
