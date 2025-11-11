import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockAccountMediaCardComponent } from './block-account-media-card.component';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { BlockAccountFacadeMock } from '@testing/mocks/facade/block-account.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/testing.module';
import { ACTIVATION_STATUS_CLASS } from '@modules/security/security-media-activation/constants/security-media-activation.constants';
import { ActivationStatusDescription } from '@modules/security/security-media-activation/entities/security-media.interface';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';

describe('BlockAccountMediaCardComponent', () => {
  let component: BlockAccountMediaCardComponent;
  let fixture: ComponentFixture<BlockAccountMediaCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BlockAccountMediaCardComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: BlockAccountFacade,
          useClass: BlockAccountFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockAccountMediaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call all gets', () => {
    expect(component.status).toBeFalse();
    expect(component.class).toEqual(
      ACTIVATION_STATUS_CLASS[
        ActivationStatusDescription.BLOCKED.toLocaleLowerCase()
      ]
    );
    expect(component.label).toEqual(ActivationStatusDescription.BLOCKED);
  });

  it('should validate class', () => {
    spyOnProperty(component, 'status').and.returnValue(true);
    const product = new ActivationProductFactory().create();
    product.status = ActivationStatusDescription.TO_ACTIVATE;
    component.product = product;
    expect(component.class).toEqual(
      ACTIVATION_STATUS_CLASS[product.status.toLowerCase()]
    );
    expect(component.label.toLowerCase()).toEqual(product.status.toLowerCase());
    expect(component.status).toBeTrue();
  });

  it('should validate class false', () => {
    spyOnProperty(component, 'status').and.returnValue(false);
    const product = new ActivationProductFactory().create();
    product.status = 'NA';
    component.product = product;
    expect(component.class).toEqual('avv-alert-status-error');
    expect(component.label.toLowerCase()).toEqual(
      ActivationStatusDescription.BLOCKED.toLowerCase()
    );
    expect(component.status).toBeFalsy();
  });

  it('should mediaName', () => {
    component.mediaName('M');
    expect(component.mediaName).toBeTruthy();
  });
});
