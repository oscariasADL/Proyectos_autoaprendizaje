import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule, NavController } from '@ionic/angular';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';
import {
  ActivationProduct,
  MediaActivationType,
  ProductType,
  ProductTypeActivation
} from '../../entities/security-media.interface';
import { MediaActivationHomeComponent } from './media-activation-home.component';

describe('MediaActivationHomeComponent', () => {
  let component: MediaActivationHomeComponent;
  let fixture: ComponentFixture<MediaActivationHomeComponent>;
  let modalSpy;
  let modalCtrlSpy;
  let navControlSpy;

  beforeEach(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateForward'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [MediaActivationHomeComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        },
        {
          provide: AlertService,
          useClass: AlertServiceMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: NavController,
          useValue: navControlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaActivationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should be go to home', async () => {
    expect(component.goHome()).toBeUndefined();
  });

  it('should go to activate product', async () => {
    expect(component.activateProduct('1')).toBeUndefined();
  });

  it('should show the information', async () => {
    expect(component.showInformation()).toBeTruthy();
  });

  it('should verify a activate product', async () => {
    modalSpy.onWillDismiss.and.callFake(async () => ({
      data: { type: MediaActivationType.ConfigurePassword }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    const product: ActivationProduct = {
      activationType: ProductTypeActivation.D,
      type: ProductType.D,
      id: '',
      parentType: TypeAccount.CCA,
      parentId: '',
      status: '',
      cardId: ''
    };
    component.productToActivate$.subscribe();
    component.otherProducts$.subscribe();
    expect(component.showOptions(product)).toBeTruthy();
    expect(component.optionIcon(product)).toBeNull();
  });

  it('should unlockProduct', async () => {
    const product: ActivationProduct = {
      activationType: ProductTypeActivation.D,
      type: ProductType.D,
      id: '',
      parentType: TypeAccount.CCA,
      parentId: '',
      status: '',
      cardId: ''
    };
    component.unlockProduct(product);
    expect(component.unlockProduct(product)).toBeUndefined();
  });

  it('should optionIcon active', async () => {
    spyOn(component, 'optionIcon').and.callThrough();
    const product: any = {
      activationType: ProductTypeActivation.D,
      type: ProductType.D,
      id: '123456',
      parentType: TypeAccount.SDA,
      parentId: '123456',
      status: 'ACTIVA',
      cardId: '12345'
    };
    component.optionIcon(product);
    expect(component.optionIcon).toHaveBeenCalled();
  });

  it('should optionIcon to active', async () => {
    spyOn(component, 'optionIcon').and.callThrough();
    const product: any = {
      activationType: ProductTypeActivation.D,
      type: ProductType.D,
      id: '123456',
      parentType: TypeAccount.SDA,
      parentId: '123456',
      status: 'BLOQUEO_PREVENTIVO',
      cardId: '12345'
    };
    component.optionIcon(product);
    expect(component.optionIcon).toHaveBeenCalled();
  });

  it('should verify a BlockTemporary', async () => {
    modalSpy.onWillDismiss.and.callFake(async () => ({
      data: { type: MediaActivationType.BlockTemporary }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    const product: ActivationProduct = {
      activationType: ProductTypeActivation.D,
      type: ProductType.D,
      id: '',
      parentType: TypeAccount.CCA,
      parentId: '',
      status: '',
      cardId: ''
    };
    component.productToActivate$.subscribe();
    component.otherProducts$.subscribe();
    expect(component.showOptions(product)).toBeTruthy();
    expect(component.optionIcon(product)).toBeNull();
  });

  it('should verify a BlockCard', async () => {
    modalSpy.onWillDismiss.and.callFake(async () => ({
      data: { type: MediaActivationType.BlockCard }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    const product: ActivationProduct = {
      activationType: ProductTypeActivation.D,
      type: ProductType.D,
      id: '',
      parentType: TypeAccount.CCA,
      parentId: '',
      status: '',
      cardId: ''
    };
    component.productToActivate$.subscribe();
    component.otherProducts$.subscribe();
    expect(component.showOptions(product)).toBeTruthy();
    expect(component.optionIcon(product)).toBeNull();
  });
});
