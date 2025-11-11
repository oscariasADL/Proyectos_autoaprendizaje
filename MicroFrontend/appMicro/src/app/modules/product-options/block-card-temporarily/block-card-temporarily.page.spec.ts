import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { BlockCardTemporarilyPage } from './block-card-temporarily.page';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('BlockCardTemporarilyPage', () => {
  let component: BlockCardTemporarilyPage;
  let fixture: ComponentFixture<BlockCardTemporarilyPage>;
  let securityMediaActivationFacadeStub: Partial<SecurityMediaActivationFacade>;
  let modalCtrlSpy;
  let modalSpy;

  beforeEach(waitForAsync(() => {
    securityMediaActivationFacadeStub = {
      date$: of('2024-11-15T09:58:35'),
      temporaryBlockProductV2: () => {
        return;
      },
      unlockProductV2: () => {
        return;
      }
    };
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [BlockCardTemporarilyPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useValue: securityMediaActivationFacadeStub
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BlockCardTemporarilyPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.activationProduct.setValue({ id: '' });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be open modal to unblock product', async () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: true
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    await component.unBlockProduct();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
    expect(modalSpy.onDidDismiss).toHaveBeenCalled();
  });

  it('should call blockCardTemporarily', () => {
    spyOn(securityMediaActivationFacadeStub, 'temporaryBlockProductV2');
    component.activationProduct.setValue({ id: '' });
    component.form.get('endDate').setValue('13/04/1996');
    fixture.detectChanges();
    component.blockCardTemporarily();
    expect(
      securityMediaActivationFacadeStub.temporaryBlockProductV2
    ).toHaveBeenCalled();
  });

  it('should be activationProduct defined', () => {
    expect(component.activationProduct).toBeDefined();
  });

  it('should be currentDate$ defined', () => {
    expect(component.currentDate$).toBeDefined();
  });
});
