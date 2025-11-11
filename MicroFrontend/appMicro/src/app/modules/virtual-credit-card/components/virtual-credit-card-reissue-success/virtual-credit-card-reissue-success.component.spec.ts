import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtualCreditCardReissueSuccessComponent } from './virtual-credit-card-reissue-success.component';
import { TestingModule } from '@testing/testing.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('VirtualCreditCardReissueSuccessComponent', () => {
  let component: VirtualCreditCardReissueSuccessComponent;
  let fixture: ComponentFixture<VirtualCreditCardReissueSuccessComponent>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.overrideComponent(VirtualCreditCardReissueSuccessComponent, {
      add: {
        imports: [IonicModule, TestingModule, GlobalPipesModule],
        providers: [{ provide: ModalController, useValue: modalCtrlSpy }]
      }
    });

    fixture = TestBed.createComponent(VirtualCreditCardReissueSuccessComponent);
    component = fixture.componentInstance;
    component.response = {
      approvalId: '34343434',
      transactionDate: '2020-04-23T15:55:00.000Z'
    } as any;
    component.numberProductTCV = '4111111111111111';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call to closeModal', () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should to be defined franchiseImage', () => {
    expect(component.franchiseImage).toBeDefined();
  });
});
