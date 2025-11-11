import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TransfersDefaultAccountPage } from './transfers-default-account.page';
import { TestingModule } from '@testing/testing.module';
import { TransfersDefaultAccountFacade } from '@modules/transfers/pages/transfers-default-account/transfers-default-account.facade';
import { TransfersDefaultAccountFacadeMock } from '@testing/mocks/facade/transfers-default-account.facade.mock';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';

describe('TransfersDefaultAccountPage', () => {
  let component: TransfersDefaultAccountPage;
  let fixture: ComponentFixture<TransfersDefaultAccountPage>;
  let transfersDefaultAccountFacadeMock: TransfersDefaultAccountFacadeMock;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);

  beforeEach(waitForAsync(() => {
    transfersDefaultAccountFacadeMock = new TransfersDefaultAccountFacadeMock();
    TestBed.configureTestingModule({
      declarations: [TransfersDefaultAccountPage],
      imports: [TestingModule, IonicModule],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy },
        {
          provide: TransfersDefaultAccountFacade,
          useValue: transfersDefaultAccountFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(TransfersDefaultAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to ngOnDestroy', () => {
    const ngOnDestroySpy = spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(ngOnDestroySpy).toHaveBeenCalled();
  });

  it('should call to deleteDefaultAccount', async () => {
    alertServiceSpy.create.and.returnValue(Promise.resolve(true));
    const deleteDefaultAccountSpy = spyOn(
      transfersDefaultAccountFacadeMock,
      'deleteDefaultAccount'
    );
    await component.deleteDefaultAccount();
    expect(deleteDefaultAccountSpy).toHaveBeenCalled();
  });

  it('should be defined working$', () => {
    expect(component.working$).toBeDefined();
  });

  it('should be defined defaultAccount$', () => {
    expect(component.completed$).toBeDefined();
  });

  it('should be defined defaultAccount$', () => {
    expect(component.defaultAccount$).toBeDefined();
  });
});
