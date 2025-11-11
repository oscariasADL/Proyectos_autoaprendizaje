import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { of } from 'rxjs';

import { BreBTransfersConfirmationComponent } from './bre-b-transfers-confirmation.component';
import { BreBTransfersForm } from '../../entities/bre-b-transfers.interface';
import { TransferType } from '@app/modules/transfers/entities/transfers.interface';
import { TestingModule } from '@testing/testing.module';
import { BreBTransfersFacade } from '../../bre-b-transfers.facade';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';

describe('BreBTransfersConfirmationComponent', () => {
  let component: BreBTransfersConfirmationComponent;
  let fixture: ComponentFixture<BreBTransfersConfirmationComponent>;
  let facade: jasmine.SpyObj<BreBTransfersFacade>;

  const mockBasicData = {
    firstName: 'John',
    lastName: 'Doe',
    documentNumber: '12345678'
  };

  beforeEach(waitForAsync(() => {
    const facadeSpy = jasmine.createSpyObj('BreBTransfersFacade', [], {
      basicData$: of(mockBasicData)
    });

    TestBed.configureTestingModule({
      declarations: [BreBTransfersConfirmationComponent],
      imports: [
        IonicModule,
        GlobalPipesModule,
        TestingModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: BreBTransfersFacade, useValue: facadeSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BreBTransfersConfirmationComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(
      BreBTransfersFacade
    ) as jasmine.SpyObj<BreBTransfersFacade>;

    component.form = new FormGroup<BreBTransfersForm>({
      towardAvalKey: new FormControl('ASDASD'),
      towardProduct: new FormControl({
        fullName: 'John Doe',
        productId: '609053300',
        productType: 'SDA',
        bank: '0052',
        identSerialNum: '',
        govIssueIdentType: '',
        key: '',
        type: TypeAccount.SDA,
        bankName: 'Nequi',
        cameraReference: 'asdasd',
        receiverCamera: 'dsadas',
        personType: 'PJ',
        personCategory: '2',
        name: 'Jo** D**'
      }),
      amount: new FormControl('5.000'),
      fromProduct: new FormControl({
        fullName: 'Test Account',
        productId: '123456789',
        productType: 'SDA',
        bank: '0001',
        identSerialNum: '',
        govIssueIdentType: '',
        key: '',
        type: TypeAccount.SDA,
        bankName: 'Test Bank'
      }),
      addenda: new FormControl({
        note: 'Test note'
      }),
      fee: new FormControl('Gratis'),
      transferType: new FormControl(TransferType.SEND_BRE_B),
      contactName: new FormControl('John Doe'),
      isFavoriteContact: new FormControl(null),
      isSavedContact: new FormControl(null),
      gmfData: new FormControl(null)
    });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breBTransfers and firstName on ngOnInit', () => {
    expect(component.breBTransfers.amount).toBe('5.000');
    expect(component.breBTransfers.contactName).toBe('John Doe');
    expect(component.firstName).toBe('John');
  });

  it('should emit transferCompleted when continue is called', () => {
    spyOn(component.transferCompleted, 'emit');
    component.continue();
    expect(component.transferCompleted.emit).toHaveBeenCalled();
  });

  it('should emit modifyTransfer when modify is called', () => {
    spyOn(component.modifyTransfer, 'emit');
    component.modify();
    expect(component.modifyTransfer.emit).toHaveBeenCalled();
  });

  it('should sanitize GMF info correctly', () => {
    const result = component.gmfInfoSanitized('50');
    expect(result).toBe('GMF.VALUE ');
  });

  it('should return notificationType enum', () => {
    expect(component.notificationType).toBeTruthy();
  });
});
