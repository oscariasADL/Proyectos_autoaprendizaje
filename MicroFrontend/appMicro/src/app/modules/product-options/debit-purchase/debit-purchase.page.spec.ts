import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DebitPurchaseFacade } from '@modules/product-options/debit-purchase/debit-purchase.facade';
import { DebitPurchaseService } from '@modules/product-options/debit-purchase/service/debit-purchase.service';
import { ProductFactory } from '@testing/factories/product.factory';
import { DebitPurchaseFacadeMock } from '@testing/mocks/facade/debit-purchase.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { DebitPurchaseServiceMock } from '@testing/mocks/services/debit-purchase.service.mock';
import { DebitPurchasePage } from './debit-purchase.page';

describe('DebitPurchasePage', () => {
  let component: DebitPurchasePage;
  let fixture: ComponentFixture<DebitPurchasePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DebitPurchasePage],
      imports: [IonicModule, GenericStepperMockModule, TestingModule],
      providers: [
        {
          provide: DebitPurchaseFacade,
          useClass: DebitPurchaseFacadeMock
        },
        {
          provide: DebitPurchaseService,
          useClass: DebitPurchaseServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DebitPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should call setConfirmationData', async () => {
    spyOnProperty(component, 'isLOC').and.returnValue(true);
    component.ngOnInit();
    expect((component as any).setConfirmationData('')).toBeTruthy();
  });

  it('should call sendDebitPurchase', async () => {
    expect((component as any).sendDebitPurchase()).toBeUndefined();
  });

  it('should call feePayload', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.feePayload().accountId.toString()).toEqual(
      prod.id.toString()
    );
  });
});
