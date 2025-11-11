import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule, NavController } from '@ionic/angular';
import { ProductsFacadeMock } from '@testing/mocks/facade/products.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';
import { ProductsFacade } from '../../products.facade';
import { RequestProductsPage } from './request-products.page';
import { REQUEST_PRODUCTS_SLIDERS } from '@modules/products/pages/request-products/constants/request-products.constants';
import { DIGITAL_DEBIT_CARD } from '@commons/constants/navigate.constants';
import { of } from 'rxjs';

describe('RequestProductsPage', () => {
  let component: RequestProductsPage;
  let alertService: AlertService;
  let productsFacade: ProductsFacade;
  let fixture: ComponentFixture<RequestProductsPage>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RequestProductsPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: ProductsFacade, useClass: ProductsFacadeMock },
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestProductsPage);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    productsFacade = TestBed.inject(ProductsFacade);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirectLink', () => {
    const sliders = REQUEST_PRODUCTS_SLIDERS;
    const slideTDD = {
      img: 'solicitar-productos/tarjeta-debito-digital.jpg',
      btn: 'Activa tu tarjeta debito digital',
      url: DIGITAL_DEBIT_CARD.toString(),
      isExternal: false
    };
    const alertServiceSpy = spyOn(alertService, 'create');

    spyOn(component, 'selectProduct').and.callThrough();
    alertServiceSpy.and.returnValue(Promise.resolve(true));
    component.selectProduct(sliders[0]);
    expect(component.selectProduct).toHaveBeenCalled();

    alertServiceSpy.and.returnValue(Promise.resolve(false));
    component.selectProduct(sliders[0]);
    expect(component.selectProduct).toHaveBeenCalled();

    sliders.unshift(slideTDD);
    component.selectProduct(sliders[0]);
    expect(component.selectProduct).toHaveBeenCalled();
  });

  it('should call addDigitalDebitCard()', () => {
    const componentAny = component as any;
    spyOn(componentAny, 'addDigitalDebitCard').and.callThrough();

    productsFacade.isLogged$ = of(true);
    componentAny.addDigitalDebitCard();
    expect(componentAny.addDigitalDebitCard).toHaveBeenCalled();

    productsFacade.isLogged$ = of(false);
    componentAny.addDigitalDebitCard();
    expect(componentAny.addDigitalDebitCard).toHaveBeenCalled();
  });
});
