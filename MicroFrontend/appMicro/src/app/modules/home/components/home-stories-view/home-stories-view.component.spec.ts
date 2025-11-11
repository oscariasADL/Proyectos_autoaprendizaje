import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStoriesViewComponent } from './home-stories-view.component';
import {
  AngularDelegate,
  IonicModule,
  ModalController,
  NavController
} from '@ionic/angular';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { ProductsFacade } from '@modules/products/products.facade';
import { ProductsFacadeMock } from '@testing/mocks/facade/products.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ImageUrlAltPipe } from '@commons/pipes/image-url-alt.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';

describe('HomeStoriesViewComponent', () => {
  let component: HomeStoriesViewComponent;
  let fixture: ComponentFixture<HomeStoriesViewComponent>;
  let navCtrl: NavController;
  let productsFacade: ProductsFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStoriesViewComponent, ImageUrlAltPipe],
      imports: [IonicModule, TestingModule, PreloadImageDirective],
      providers: [
        NavController,
        AngularDelegate,
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: ProductsFacade, useClass: ProductsFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeStoriesViewComponent);
    navCtrl = TestBed.inject(NavController);
    productsFacade = TestBed.inject(ProductsFacade);
    component = fixture.componentInstance;
    component.test = true;
    component.story = {
      id: 1,
      previewTitle: 'Ofertas',
      title: 'Déjate sorprender',
      subtitle: '',
      previewImg: '/',
      image: '/',
      itemList: [],
      description:
        'Conoce todas las alianzas en productos y servicios que tenemos con beneficios especiales para nuestros clientes.',
      buttonText: 'CONOCER MÁS',
      buttonAction: '',
      enable: true,
      typeProduct: 0,
      productFilter: -1
    };
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should redirect url when no exists products', async () => {
    component.story.typeProduct = 1;
    component.story.redirectUrlWithoutProducts = '/';
    spyOn(component.balances, 'find').and.returnValue(null);
    component.redirectUrl();
    expect(component.balances.find).toHaveBeenCalled();
  });

  it('should redirect url when exists products', async () => {
    component.story.typeProduct = 1;
    component.story.redirectUrlWithProducts = '/';
    spyOn(component.balances, 'find').and.returnValue({
      products: [{}],
      balanceTotal: 20000,
      description: 'lorem ipsum dolor sit amet',
      name: 'lorem',
      pointsPerBank: [],
      quantity: 1,
      typeProduct: 1
    });
    spyOn(navCtrl, 'navigateForward');
    component.redirectUrl();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith(['/']);
  });

  it('should show specific products', async () => {
    component.story.typeProduct = 0;
    component.story.productFilter = 1;
    spyOn(productsFacade, 'setProductFilter');
    component.redirectUrl();
    expect(productsFacade.setProductFilter).toHaveBeenCalled();
  });

  it('should navigate inside app', async () => {
    component.story.typeProduct = 0;
    component.story.productFilter = -1;
    component.story.redirectUrl = '/';
    spyOn(navCtrl, 'navigateForward');
    component.redirectUrl();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/');
  });

  it('should navigate outside app', async () => {
    component.story.typeProduct = 0;
    component.story.productFilter = -1;
    component.story.redirectExternalUrl = '/';
    spyOn(productsFacade, 'openExternalLinks');
    component.redirectUrl();
    expect(productsFacade.openExternalLinks).toHaveBeenCalled();
  });
});
