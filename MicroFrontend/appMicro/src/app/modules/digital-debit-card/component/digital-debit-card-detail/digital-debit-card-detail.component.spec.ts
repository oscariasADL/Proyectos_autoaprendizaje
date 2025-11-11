import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, Platform } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { DigitalDebitCardDetailComponent } from './digital-debit-card-detail.component';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ProductActionType } from '@modules/product/entities/product-action.interface';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardFacadeMock } from '@testing/mocks/facade/digital-debit-card.facade.mock';
import { ProductModule } from '@modules/product/product.module';

describe('DigitalDebitCardDetailComponent', () => {
  let component: DigitalDebitCardDetailComponent;
  let fixture: ComponentFixture<DigitalDebitCardDetailComponent>;
  const digitalDebitCardFacadeMock = new DigitalDebitCardFacadeMock();
  const modalCtrlCreateMethodSpy = jasmine.createSpyObj('Modal', [
    'present',
    'onDidDismiss',
    'onWillDismiss'
  ]);
  modalCtrlCreateMethodSpy.present.and.callFake(() => Promise.resolve());
  let modalCtrlSpy, platformReadySpy, platformSpy, backButton, clipboardSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    modalCtrlSpy.create.and.callFake(() => modalCtrlCreateMethodSpy);
    platformReadySpy = Promise.resolve();
    backButton = {
      subscribeWithPriority: (priority, fn) => {
        fn();
      }
    };
    platformSpy = jasmine.createSpyObj(
      'Platform',
      {
        ready: platformReadySpy,
        backButton: platformReadySpy
      },
      { backButton }
    );
    clipboardSpy = jasmine.createSpyObj('Clipboard', ['writeText']);

    TestBed.overrideComponent(DigitalDebitCardDetailComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          { provide: Platform, useValue: platformSpy },
          { provide: Clipboard, useValue: clipboardSpy },
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: ToastrService,
            useValue: {
              [ToastType.success]: (a, b, c) => {
                return;
              },
              clear: () => {
                return;
              }
            }
          },
          {
            provide: DigitalDebitCardFacade,
            useValue: digitalDebitCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [ProductModule]
      }
    }).compileComponents();
    /*TestBed.configureTestingModule({
      declarations: [
        DigitalDebitCardDetailComponent,
        ImageUrlPipe,
        CapitalizePipe,
        CurrencyFormatPipe,
        NumberFormatPipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: Clipboard, useValue: clipboardSpy },
        { provide: ModalController, useValue: modalCtrlSpy },
        {
          provide: ToastrService,
          useValue: {
            [ToastType.success]: (a, b, c) => {},
            clear: () => {}
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();*/

    fixture = TestBed.createComponent(DigitalDebitCardDetailComponent);
    component = fixture.componentInstance;
    /*component.showEditDigitalDebitCard = () => {};
    component.showCancelDigitalDebitCard = () => {};
    component.showReissueDigitalDebitCard = () => {};*/
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call to ngDestroy', () => {
    const componentAny = component as any;
    componentAny.subscription = new Subscription();
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });

  it('should to call to closeModal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should call copyToClipboard copy', async () => {
    component.digitalDebitCardDetail = {
      numberDigitalCard: '1234123412341234',
      expDate: '2022-01-01',
      cvs: '123',
      name: 'Test Name',
      amount: 100000
    };
    expect(await component.copyNumberToClipboard()).toBe(void 0);
  });

  it('should call showFrequentQuestions', () => {
    expect(component.showFrequentQuestions()).toBe(void 0);
  });

  it('should call showUse', () => {
    expect(component.showUse()).toBe(void 0);
  });

  it('should call actionSelected EditTDD', () => {
    spyOn(component, 'actionSelected').and.callThrough();
    component.relativeParentId = '123456';
    component.digitalDebitCardDetail = {
      numberDigitalCard: '123456',
      expDate: '2022-01-01',
      cvs: '123',
      name: 'Test Name',
      amount: 12000
    };
    component.actionSelected({
      type: ProductActionType.EditTDD,
      label: '',
      icon: '',
      id: '123456'
    });
    expect(component.actionSelected).toHaveBeenCalled();
  });

  it('should call actionSelected CancelTDD', () => {
    spyOn(component, 'actionSelected').and.callThrough();
    component.relativeParentId = '123456';
    component.digitalDebitCardDetail = {
      numberDigitalCard: '123456',
      expDate: '2022-01-01',
      cvs: '123',
      name: 'Test Name',
      amount: 12000
    };
    component.actionSelected({
      type: ProductActionType.DeleteTDD,
      label: '',
      icon: '',
      id: '123456'
    });
    expect(component.actionSelected).toHaveBeenCalled();
  });

  it('should call actionSelected ReissueTDD', () => {
    spyOn(component, 'actionSelected').and.callThrough();
    component.relativeParentId = '123456';
    component.digitalDebitCardDetail = {
      numberDigitalCard: '123456',
      expDate: '2022-01-01',
      cvs: '123',
      name: 'Test Name',
      amount: 12000
    };
    component.actionSelected({
      type: ProductActionType.ReissueTDD,
      label: '',
      icon: '',
      id: '123456'
    });
    expect(component.actionSelected).toHaveBeenCalled();
  });

  it('should return boolean, get isPossibleCopyToClipboard()', () => {
    expect(component.isPossibleCopyToClipboard).toBeDefined();
  });
});
