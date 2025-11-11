import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {
  ActivationStatusDescription,
  BlockTemporaryStep
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { UnlockProductComponent } from './unlock-product.component';

describe('UnlockProductComponent', () => {
  let component: UnlockProductComponent;
  let fixture: ComponentFixture<UnlockProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnlockProductComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UnlockProductComponent);
    component = fixture.componentInstance;
    const product = new ActivationProductFactory().create();
    product.status = ActivationStatusDescription.PREVENTIVE_BLOCK;
    component.product = product;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call unlockProduct', () => {
    spyOn(component.continue, 'emit');
    component.unlockProduct();
    component.block();
    expect(component.continue.emit).toHaveBeenCalled();
  });

  it('should call gets', () => {
    expect(component.currentDate).toBeDefined();
    expect(component.blockTemporaryStep.ChooseDate).toEqual(
      BlockTemporaryStep.ChooseDate
    );
  });
});
