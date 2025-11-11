import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FranchiseImagePipe } from '@commons/pipes/franchise-image.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';
import { TestingModule } from '@testing/testing.module';
import { getYear } from 'date-fns';
import { ActivateProductFromComponent } from './activate-product-from.component';

describe('ActivateProductFromComponent', () => {
  let component: ActivateProductFromComponent;
  let fixture: ComponentFixture<ActivateProductFromComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivateProductFromComponent,
        ImageUrlPipe,
        FranchiseImagePipe
      ],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateProductFromComponent);
    component = fixture.componentInstance;
    component.product = new ActivationProductFactory().create();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate gets', () => {
    expect(component.expiration.value).toBeNull();
    expect(component.cvc.value).toBeNull();
  });

  it('should call activateProduct', () => {
    const today = new Date();
    const isCreditCardOrMasterDebitSpy = spyOnProperty(
      component,
      'isCreditCardOrMasterDebit',
      'get'
    );
    component.expiration.setValue(
      '09/' + getYear(today).toString().substr(2, 2)
    );
    component.cvc.setValue('123');
    isCreditCardOrMasterDebitSpy.and.returnValue(true);
    expect(component.activateProduct()).toBeUndefined();

    isCreditCardOrMasterDebitSpy.and.returnValue(false);
    expect(component.activateProduct()).toBeUndefined();

    spyOnProperty(component.form, 'valid').and.returnValue(false);
    isCreditCardOrMasterDebitSpy.and.returnValue(false);
    expect(component.activateProduct()).toBeUndefined();
  });

  it('should call setFace', () => {
    const swiperMock = {
      swiperRef: {
        slideTo: jasmine.createSpy('slideTo') // 👈 solución
      }
    };

    component.setFace('-cvc', swiperMock as any);
    expect(swiperMock.swiperRef.slideTo).toHaveBeenCalledWith(1, 500);

    component.setFace('-expiration', swiperMock as any);
    expect(swiperMock.swiperRef.slideTo).toHaveBeenCalledWith(0, 500);

    expect(component.face).toEqual('-expiration');
  });

  it('should to return boolean, hasImg', () => {
    expect(component.hasImg).toEqual(jasmine.any(Boolean));
  });
});
