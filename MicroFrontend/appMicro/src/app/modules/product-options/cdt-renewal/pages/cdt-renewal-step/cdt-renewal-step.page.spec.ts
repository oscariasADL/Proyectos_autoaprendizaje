import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { CdtRenewalFacade } from '@modules/product-options/cdt-renewal/cdt-renewal.facade';
import { CdtRenewalFacadeMock } from '@testing/mocks/facade/cdt-renewal.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { CdtRenewalStepPage } from './cdt-renewal-step.page';

describe('CdtRenewalStepPage', () => {
  let component: CdtRenewalStepPage;
  let fixture: ComponentFixture<CdtRenewalStepPage>;

  const navControlSpy = jasmine.createSpyObj('NavController', ['pop']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CdtRenewalStepPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: CdtRenewalFacade, useClass: CdtRenewalFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CdtRenewalStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirectLink', () => {
    spyOn(component, 'redirectLink').and.callThrough();
    component.redirectLink();
    expect(component.redirectLink).toHaveBeenCalled();
  });

  it('should call renewalCdt', () => {
    spyOn(component, 'renewalCdt').and.callThrough();
    component.renewalCdt();
    expect(component.renewalCdt).toHaveBeenCalled();
  });

  it('should call cancelRenewalCdt', () => {
    spyOn(component, 'cancelRenewalCdt').and.callThrough();
    component.cancelRenewalCdt();
    expect(component.cancelRenewalCdt).toHaveBeenCalled();
  });

  it('should call navigateBack', () => {
    spyOn(component, 'navigateBack').and.callThrough();
    component.navigateBack();
    expect(component.navigateBack).toHaveBeenCalled();
  });

  it('should return CdtRenewalRequest ', () => {
    expect(component.cdtRequest).toBeDefined();
  });
});
