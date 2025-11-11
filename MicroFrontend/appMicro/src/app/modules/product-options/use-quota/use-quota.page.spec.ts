import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UseQuotaService } from '@modules/product-options/use-quota/service/use-quota.service';
import { UseQuotaFacade } from '@modules/product-options/use-quota/use-quota.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { UseQuotaFacadeMock } from '@testing/mocks/facade/use-quota.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { UseQuotaServiceMock } from '@testing/mocks/services/use-quota.service.mock';
import { UseQuotaPage } from './use-quota.page';
import { UseQuotaSlide } from '@modules/product-options/use-quota/constants/use-quota.constants';

describe('UseQuotaPage', () => {
  let component: UseQuotaPage;
  let fixture: ComponentFixture<UseQuotaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UseQuotaPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        { provide: UseQuotaFacade, useClass: UseQuotaFacadeMock },
        { provide: UseQuotaService, useClass: UseQuotaServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UseQuotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.feePayload().accountId.toString()).toEqual(
      prod.id.toString()
    );
  });

  it('should call useQuota', () => {
    component.form.get('fromProduct').patchValue(new ProductFactory().create());
    component.form
      .get('towardProduct')
      .patchValue(new ProductFactory().create());
    component.form.get('amount').patchValue(10000);
    expect((component as any).useQuota()).toBeUndefined();
  });

  it('should call setNextStep', () => {
    spyOn(component, 'setNextStep').and.callThrough();
    component.setNextStep({ slide: UseQuotaSlide.toward });
    expect(component.setNextStep).toHaveBeenCalled();
  });
});
