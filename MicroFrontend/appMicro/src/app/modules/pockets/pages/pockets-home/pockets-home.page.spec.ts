import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketFactory } from '@testing/factories/pocket.factory';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PocketsHomePage } from './pockets-home.page';
import {
  POCKET_TYPE_FILTER_LABEL,
  PocketTypeEnum,
  PocketTypeFilter
} from '../../entities/pockets.interface';
import { ModalController } from '@commons/controllers/modal.controller';
import { ProductsFacade } from '@app/modules/products/products.facade';
import { ProductsFacadeMock } from '@testing/mocks/facade/products.facade.mock';
import { StoreModule } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

describe('PocketsHomePage', () => {
  let component: PocketsHomePage;
  let fixture: ComponentFixture<PocketsHomePage>;
  let navControlSpy;
  let modalSpy;
  let modalCtrlSpy;
  let productsFacade: ProductsFacade;
  beforeEach(async () => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    await TestBed.configureTestingModule({
      declarations: [PocketsHomePage, ImageUrlPipe],
      imports: [
        IonicModule,
        TestingModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot()
      ],
      providers: [
        { provide: PocketsFacade, useClass: PocketsFacadeMock },
        { provide: NavController, useValue: navControlSpy },
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: ProductsFacade, useValue: ProductsFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    productsFacade = TestBed.inject(ProductsFacade);
    fixture = TestBed.createComponent(PocketsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeToast when ionViewWillLeave is called', () => {
    const pocketsFacade = TestBed.inject(PocketsFacade);
    spyOn(pocketsFacade, 'closeToast');
    component.ionViewWillLeave();
    expect(pocketsFacade.closeToast).toHaveBeenCalled();
  });

  it('should call navigateToDetail', () => {
    component.navigateToDetail(new PocketFactory().create());
    expect(navControlSpy.navigateForward).toHaveBeenCalled();
  });

  it('should call navigateToDetail with pocket with returns', () => {
    component.navigateToDetail({
      ...new PocketFactory().create(),
      pocketType: PocketTypeEnum.PocketWithReturns
    });
    expect(navControlSpy.navigateForward).toHaveBeenCalled();
  });

  it('should call closePage', () => {
    component.closePage();
    expect(navControlSpy.pop).toHaveBeenCalled();
  });

  it('should call to showFinancialEducationModal', async () => {
    modalCtrlSpy.create.and.returnValue(Promise.resolve(modalSpy));
    modalSpy.present.and.returnValue(Promise.resolve());
    await component.showFinancialEducationModal();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
  });

  it('should be defined ifPocketsExist$', () => {
    expect(component.ifPocketsExist$).toBeDefined();
  });

  it('should be defined pockets$', () => {
    expect(component.pockets$).toBeDefined();
  });

  it('should be defined working$', () => {
    expect(component.working$).toBeDefined();
  });

  it('should be defined completed$', () => {
    expect(component.completed$).toBeDefined();
  });

  it('should be defined balanceInfo$', () => {
    expect(component.balanceInfo$).toBeDefined();
  });

  it('should be defined pocketsCategories', () => {
    expect(component.pocketsCategories).toBeDefined();
  });
  it('should return the correct pocket types', () => {
    const translateService = TestBed.inject(TranslateService);

    spyOn(translateService, 'instant').and.callFake((key: string) => {
      switch (key) {
        case 'POCKETS.HOME.FILTER.POCKET_TYPE.ALL':
          return 'Todos';
        case 'POCKETS.HOME.FILTER.POCKET_TYPE.TO_ORGANIZE':
          return 'Para Organizar';
        case 'POCKETS.HOME.FILTER.POCKET_TYPE.WITH_RETURNS':
          return 'Con Rentabilidad';
        default:
          return key;
      }
    });

    const pocketTypes = component.pocketTypes;

    expect(pocketTypes).toEqual([
      { label: 'Todos', value: PocketTypeFilter.all.toUpperCase() },
      {
        label: 'Para Organizar',
        value: PocketTypeFilter.traditional.toUpperCase()
      },
      {
        label: 'Con Rentabilidad',
        value: PocketTypeFilter.profitability.toUpperCase()
      }
    ]);
  });
});
