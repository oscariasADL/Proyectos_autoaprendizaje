import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FavoritesAmountInputComponent } from '@modules/favorites/component/favorites-amount-input/favorites-amount-input';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { SubtypeOperations } from '@modules/favorites/entities/favorites.interface';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ParameterKey } from '@app/commons/entities/parameters/parameter.entities';

describe('FavoritesAmountInputComponent', () => {
  let component: FavoritesAmountInputComponent;
  let fixture: ComponentFixture<FavoritesAmountInputComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesAmountInputComponent],
      imports: [TestingModule, FormsAvvModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesAmountInputComponent);
    component = fixture.componentInstance;
    component.subTypeOperation = SubtypeOperations.TRANSFIYA;
    component.initValue = 0;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call saveChanges', async () => {
    expect(await component.saveChanges()).toBeUndefined();
    spyOn(component, 'saveChanges').and.callThrough();
    spyOn(component, 'closeModal').and.callThrough();
    const input = component.amountFormControl;
    input.setValue(10000);
    await component.saveChanges();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should validators to TRANSFERAVVACC', () => {
    component.subTypeOperation = SubtypeOperations.TRANSFER_AVV_ACC;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should validators to TRANSFERAVVPHONE', () => {
    component.subTypeOperation = SubtypeOperations.TRANSFER_AVV_PHONE;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should validators to RECHARGES', async () => {
    component.subTypeOperation = SubtypeOperations.RECHARGES;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should validators to MONEY_ORDER', async () => {
    component.subTypeOperation = SubtypeOperations.MONEY_ORDER;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call closeModal', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal({ someData: 'value' });
    expect(component.closeModal).toHaveBeenCalled();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith({ someData: 'value' });
  });
  it('should use transfersFavoriteTransfiyaAmountValidators for TRANSFIYA', async () => {
    component.subTypeOperation = SubtypeOperations.TRANSFIYA;
    component.ngOnInit();

    expect(component).toBeTruthy();

    component.amountFormControl.setValue(10000);
    expect(component.amountFormControl.valid).toBeTruthy();

    component.amountFormControl.setValue(0);
    expect(component.amountFormControl.valid).toBeFalsy();
  });

  it('should use servicePayAmountValidators for REGISTERED_SERVICES', async () => {
    const facadeMock = TestBed.inject(FavoritesFacade);

    const minAmount = 1000;
    const maxAmount = 100000;

    spyOn(facadeMock, 'boundsByKey').and.callFake((key) => {
      if (key === 'servicePayAmountMin') return minAmount;
      if (key === 'paymentRegisteredServiceAmountMax') return maxAmount;
      return 0;
    });

    spyOn(facadeMock, 'boundsValue').and.returnValue({ value: '1.000' });

    component.subTypeOperation = SubtypeOperations.REGISTERED_SERVICES;
    component.ngOnInit();

    expect(component).toBeTruthy();

    component.amountFormControl.setValue(minAmount);
    expect(component.amountFormControl.valid).toBeFalsy();

    component.amountFormControl.setValue(maxAmount + 1);
    expect(component.amountFormControl.valid).toBeFalsy();
  });
});
