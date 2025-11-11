import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';

import { CustomizeAvalTagPage } from './customize-aval-tag.page';
import { TestingModule } from '@testing/testing.module';
import { CustomizeAvalTagFacade } from '@modules/product-options/customize-aval-tag/customize-aval-tag.facade';
import {
  ProductSpiUserKey,
  SpiKeyType,
  StatusDirectory
} from '@modules/product/entities/product-spi-user-key';
import { ModalController } from '@commons/controllers/modal.controller';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { UtagDirective } from '@app/commons/directives/tealium/utag.directive';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { SafeHtmlPipe } from '@commons/pipes/safe-html.pipe';

describe('CustomizeAvalTagPage', () => {
  let component: CustomizeAvalTagPage;
  let fixture: ComponentFixture<CustomizeAvalTagPage>;
  let customizeAvalTagFacadeMock: jasmine.SpyObj<CustomizeAvalTagFacade>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  const mockProductSpiUserKey: ProductSpiUserKey = {
    numberProduct: '8723732',
    accountId: '8723732',
    accountType: TypeAccount.SDA,
    keyId: '@AVVJCP626',
    keyType: SpiKeyType.AlphanumericIdentifier,
    preferredIndicator: 'N',
    statusDesc: 'ACTIVA',
    effDt: '2023-11-14T00:00:00',
    statusDirectory: StatusDirectory.DICE
  };

  const paramMapSubject = new BehaviorSubject<ParamMap>(
    convertToParamMap({ aval_tag: '@AVVJCP626' })
  );

  beforeEach(waitForAsync(() => {
    customizeAvalTagFacadeMock = jasmine.createSpyObj(
      'CustomizeAvalTagFacade',
      ['findSpiUserKeyByKey', 'modifyAvalTag', 'termsAndConditionsByKey']
    );
    customizeAvalTagFacadeMock.findSpiUserKeyByKey.and.returnValue(
      of(mockProductSpiUserKey)
    );
    navCtrlSpy = jasmine.createSpyObj('NavController', [
      'pop',
      'navigateForward'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);

    TestBed.configureTestingModule({
      declarations: [
        CustomizeAvalTagPage,
        UtagDirective,
        ImageUrlPipe,
        SafeHtmlPipe
      ],
      imports: [
        IonicModule,
        TestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: CustomizeAvalTagFacade,
          useValue: customizeAvalTagFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMapSubject.asObservable() }
        },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeAvalTagPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set avalTag from route', () => {
    expect(component.avalTag).toBe('@AVVJCP626');
  });

  it('should initialize the form with the correct values', () => {
    expect(component['form']).toBeTruthy();
    expect(component.newKeyIdControl.value).toBe('AVVJCP626'); // slice(1)
  });

  it('should call cancelAction and pop navigation', () => {
    component.cancelAction();
    expect(navCtrlSpy.pop).toHaveBeenCalled();
  });

  it('should expose currentSpiUserKey$ that emits the correct value', (done) => {
    component.currentSpiUserKey$.subscribe((val) => {
      expect(val).toEqual(mockProductSpiUserKey);
      done();
    });
  });

  it('should call modifyAvalTag', () => {
    const formSpy = spyOnProperty(component.form, 'valid');
    formSpy.and.returnValue(true);
    component.modifyAvalTagAction();
    expect(customizeAvalTagFacadeMock.modifyAvalTag).toHaveBeenCalled();
  });

  it('should show modal of terms and conditions', async () => {
    customizeAvalTagFacadeMock.termsAndConditionsByKey.and.returnValue({
      id: '',
      title: '',
      content: '<p>Terms and conditions</p>'
    } as any);

    const modalSpy = jasmine.createSpyObj('HTMLIonModalElement', [
      'present',
      'onWillDismiss'
    ]);
    modalSpy.present.and.returnValue(Promise.resolve());
    modalSpy.onWillDismiss.and.returnValue(Promise.resolve({ data: null }));

    modalCtrlSpy.create.and.returnValue(Promise.resolve(modalSpy));

    await component.showTermsAndConditions();

    expect(modalCtrlSpy.create).toHaveBeenCalled();
  });
});
