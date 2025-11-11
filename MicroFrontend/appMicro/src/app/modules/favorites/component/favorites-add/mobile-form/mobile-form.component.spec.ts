import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileFormComponent } from './mobile-form.component';
import { FavoritesFacade } from '@app/modules/favorites/favorites.facade';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FavoritesTransferType,
  UTAG_FOR_ADD_FAVORITE_MOBILE,
  UTAG_FOR_ADD_FAVORITE_TRANSFIYA
} from '@app/modules/favorites/pages/constants/add-to-favorites.constants';
import { TransferType } from '@app/modules/transfers/entities/transfers.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/testing.module';

describe('MobileFormComponent', () => {
  let component: MobileFormComponent;
  let fixture: ComponentFixture<MobileFormComponent>;
  const formMock = new FormGroup({
    product: new FormControl({
      id: '12345',
      type: 'CDA'
    }),
    phoneNumber: new FormControl('313678912'),
    transferType: new FormControl(FavoritesTransferType.cellphone),
    favoriteName: new FormControl('Mi favorito'),
    towardProduct: new FormControl(null),
    towardType: new FormControl()
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MobileFormComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: AppFacade,
          useClass: AppFacadeMock
        },
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileFormComponent);
    component = fixture.componentInstance;
    component.form = formMock;
    component.utagEvent = UTAG_FOR_ADD_FAVORITE_MOBILE;
    component.transfiyaUtagEvent = UTAG_FOR_ADD_FAVORITE_TRANSFIYA;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit payloadChanged with correct values when phoneNumber is filled', () => {
    const spy = spyOn(component.payloadChanged, 'emit');

    formMock.patchValue({
      phoneNumber: '3121231234',
      towardProduct: {
        account: {
          accountId: '73',
          accountType: '2232',
          bankInfo: {
            bankId: '052'
          }
        },
        personInfo: {
          name: 'Conrad Hopkins'
        }
      }
    });

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should set the correct values when setTransferType is called', () => {
    const spy = spyOn(component.payloadChanged, 'emit');
    component.setTransferType();

    expect(spy).toHaveBeenCalled();
  });

  it('should set the correct values when setTowardBankInfo is called', () => {
    const bank = { id: '0052', name: 'Banco AV Villas' };
    component.setTowardBankInfo(bank);

    expect(component.productIdSelected).toBeDefined();
  });

  it('should return false if transfersCel2celBankIds is an empty array', () => {
    const result = component.bankInList('8946878');

    expect(result).toBe(false);
  });
  it('should return transfiyaType', () => {
    expect(component.transfiyaType).toBe(TransferType.SEND_TRANSFIYA);
  });
});
