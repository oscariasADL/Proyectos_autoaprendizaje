import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FranchiseImagePipe } from '@commons/pipes/franchise-image.pipe';
import { IonicModule } from '@ionic/angular';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';
import { ACTIVATION_STATUS_CLASS } from '../../constants/security-media-activation.constants';
import { ActivationStatusDescription } from '../../entities/security-media.interface';
import { MediaActivationCardComponent } from './media-activation-card.component';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';

describe('MediaActivationCardComponent', () => {
  let component: MediaActivationCardComponent;
  let fixture: ComponentFixture<MediaActivationCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MediaActivationCardComponent, FranchiseImagePipe],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaActivationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call all gets', () => {
    expect(component.validStatus).toBeFalse();
    expect(component.digitalDebitCards).toEqual([]);
    expect(component.statusClass).toEqual(
      ACTIVATION_STATUS_CLASS[
        ActivationStatusDescription.BLOCKED.toLocaleLowerCase()
      ]
    );
    expect(component.statusLabel).toEqual(ActivationStatusDescription.BLOCKED);
  });

  it('should isDigitalDebitCard', () => {
    expect(component.isDigitalDebitCard('123456')).toBeFalse();
  });

  it('should validate statusClass', () => {
    spyOnProperty(component, 'validStatus').and.returnValue(true);
    const product = new ActivationProductFactory().create();
    product.status = ActivationStatusDescription.TO_ACTIVATE;
    component.product = product;
    expect(component.statusClass).toEqual(
      ACTIVATION_STATUS_CLASS[product.status.toLowerCase()]
    );
    expect(component.statusLabel.toLowerCase()).toEqual(
      product.status.toLowerCase()
    );
    expect(component.validStatus).toBeTrue();
  });

  it('should validate statusClass false', () => {
    spyOnProperty(component, 'validStatus').and.returnValue(false);
    const product = new ActivationProductFactory().create();
    product.status = 'NA';
    component.product = product;
    expect(component.statusClass).toEqual('avv-alert-status-error');
    expect(component.statusLabel.toLowerCase()).toEqual(
      ActivationStatusDescription.BLOCKED.toLowerCase()
    );
    expect(component.validStatus).toBeFalsy();
  });
});
