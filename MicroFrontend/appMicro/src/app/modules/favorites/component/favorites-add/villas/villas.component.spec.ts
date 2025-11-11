import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VillasComponent } from './villas.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { FormsAvvModule } from '@app/modules/forms-avv/forms-avv.module';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { UTAG_FOR_ADD_FAVORITE_VILLAS } from '@app/modules/favorites/pages/constants/add-to-favorites.constants';

describe('VillasComponent', () => {
  let component: VillasComponent;
  let fixture: ComponentFixture<VillasComponent>;

  const formMock = new FormGroup({
    product: new FormControl({
      id: '12345',
      type: 'CDA'
    }),
    accountType: new FormControl(TypeAccount.SDA),
    accountNumber: new FormControl('67890'),
    transferType: new FormControl(2),
    favoriteName: new FormControl('Mi favorito')
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillasComponent],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VillasComponent);
    component = fixture.componentInstance;
    component.form = formMock;
    component.utagEvent = UTAG_FOR_ADD_FAVORITE_VILLAS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT emit payloadChanged if accountNumber or accountType are missing', () => {
    const spy = spyOn(component.payloadChanged, 'emit');

    formMock.patchValue({
      accountNumber: '',
      accountType: TypeAccount.SDA
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    const unsubscribeSpy = spyOn(component['formChangesSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
