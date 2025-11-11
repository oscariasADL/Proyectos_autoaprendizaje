import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockAccountInfoComponent } from './block-account-info.component';
import { TestingModule } from '@testing/testing.module';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { BlockAccountFacadeMock } from '@testing/mocks/facade/block-account.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { FranchiseImagePipe } from '@commons/pipes/franchise-image.pipe';
import { ModalController } from '@commons/controllers/modal.controller';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';
import { of } from 'rxjs';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';

describe('BlockAccountInfoComponent', () => {
  let component: BlockAccountInfoComponent;
  let fixture: ComponentFixture<BlockAccountInfoComponent>;
  let modalSpy;
  let modalCtrlSpy;
  let service;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'present'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        BlockAccountInfoComponent,
        ImageUrlPipe,
        ImageUrlPipe,
        FranchiseImagePipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: BlockAccountFacade,
          useClass: BlockAccountFacadeMock
        },
        {
          provide: HomeFacade,
          useClass: HomeFacadeMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: AlertService,
          useClass: AlertServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockAccountInfoComponent);
    service = TestBed.inject(AlertService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue', () => {
    spyOn(service, 'create').and.returnValue(Promise.resolve(true));
    component.state = false;
    component.continue();
    expect(component).toBeDefined();
    component.state = true;
    component.continue();
    expect(component).toBeDefined();
  });

  it('should blockAccountForm$', () => {
    expect(component.blockAccountForm$).toBeDefined();
  });

  it('should setBlockAccountForm', () => {
    expect(component.setBlockAccountForm).toBeDefined();
    component.setBlockAccountForm('12', '21');
    spyOn(component, 'setBlockAccountForm').and.callThrough();
    expect(component.setBlockAccountForm).toBeDefined();
  });

  it('should setSelectedProduct', () => {
    expect(component.setSelectedProduct).toBeDefined();
    component.setSelectedProduct({});
    spyOn(component, 'setSelectedProduct').and.callThrough();
    expect(component.setSelectedProduct).toBeDefined();
  });

  it('should setSelectedProduct', () => {
    expect(component.setSelectedProduct).toBeDefined();
  });

  it('should selectedProduct$', () => {
    expect(component.selectedProduct$).toBeDefined();
  });

  it('should response$', () => {
    expect(component.response$).toBeDefined();
  });

  it('should error$', () => {
    expect(component.error$).toBeDefined();
  });

  it('should sendRequest', () => {
    spyOnProperty(component, 'blockAccountForm$').and.returnValue(
      of({ relativeId: '12345', lockId: '12345' })
    );
    component.sendRequest(true);
    expect(component.sendRequest).toBeDefined();
    component.sendRequest(false);
    expect(component.sendRequest).toBeDefined();
  });
  it('should showAlertSuccess', () => {
    modalSpy.onDidDismiss.and.callFake(async () => true);
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });

    expect(
      component.showAlertSuccess(
        true,
        {
          props: {
            approvalId: '12345',
            transactionDate: new Date(),
            name: 'Test'
          }
        },
        { productType: 'SDA', numberProduct: '12345' }
      )
    ).toBeUndefined();
  });

  it('should showAlertSuccess not show', () => {
    expect(
      component.showAlertSuccess(
        false,
        { approvalId: '12345', transactionDate: new Date(), name: 'Test' },
        { productType: 'SDA', numberProduct: '12345' }
      )
    ).toBeUndefined();
  });
  it('should showAlertError', () => {
    modalSpy.onDidDismiss.and.callFake(async () => true);
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(
      component.showAlertError(true, {
        approvalId: '12345',
        transactionDate: new Date()
      })
    ).toBeUndefined();
  });

  it('should showAlertError not show', () => {
    expect(
      component.showAlertError(false, {
        approvalId: '12345',
        transactionDate: new Date()
      })
    ).toBeUndefined();
  });
});
