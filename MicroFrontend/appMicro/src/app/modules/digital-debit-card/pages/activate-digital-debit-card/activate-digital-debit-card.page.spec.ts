import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ActivateDigitalDebitCardPage } from './activate-digital-debit-card.page';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardFacadeMock } from '@testing/mocks/facade/digital-debit-card.facade.mock';
import { of } from 'rxjs';
import { Product } from '@app/commons/entities/product/product.interface';

describe('ActivateDigitalDebitCardPage', () => {
  let component: ActivateDigitalDebitCardPage;
  let fixture: ComponentFixture<ActivateDigitalDebitCardPage>;
  let facade: DigitalDebitCardFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateDigitalDebitCardPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: DigitalDebitCardFacade,
          useClass: DigitalDebitCardFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateDigitalDebitCardPage);
    component = fixture.componentInstance;
    spyOnProperty(component, 'productSelected$').and.returnValue(
      of({ id: '23232' })
    );
    facade = TestBed.inject(DigitalDebitCardFacade);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be call activateDigitalDebitCard', () => {
    const createDigitalDebitCardSpy = spyOn(facade, 'createDigitalDebitCard');
    component.form.setValue({
      productOrigin: { id: '78348743' },
      nickName: 'Mi TDD',
      amount: '23233',
      confirmation: null
    });
    fixture.detectChanges();
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    component.activateDigitalDebitCard();
    expect(createDigitalDebitCardSpy).toHaveBeenCalled();
  });

  it('should call showFrequentQuestions()', () => {
    const showFrequentQuestionsSpy = spyOn(facade, 'showFrequentQuestions');
    component.showFrequentQuestions();
    expect(showFrequentQuestionsSpy).toHaveBeenCalled();
  });
  it('should return products$ from facade', fakeAsync(() => {
    const productsMock: Product[] = [
      { id: '1', description: 'Product 1' },
      { id: '2', description: 'Product 2' }
    ];

    Object.defineProperty(facade, 'products$', {
      get: jasmine.createSpy().and.returnValue(of(productsMock))
    });

    let products: Product[] = [];
    component.products$.subscribe((result) => {
      products = result;
    });

    tick();

    expect(products).toEqual(productsMock);
  }));
  it('should return productSelected$ from facade', fakeAsync(() => {
    const productMock: Product = { id: '23232' };

    Object.defineProperty(facade, 'productSelected$', {
      get: jasmine.createSpy().and.returnValue(of(productMock))
    });

    let product: Product | null = null;

    component.productSelected$.subscribe((result) => {
      product = result;
    });

    tick();

    expect(product).toEqual(productMock);
  }));
});
