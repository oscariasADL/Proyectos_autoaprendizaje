import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { faker } from '@faker-js/faker';

import { StartWalletModalComponent } from './start-wallet-modal.component';
import { TestingModule } from '@testing/testing.module';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AppFacade } from '@app/app.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { Platform } from '@commons/constants/global.constants';

describe('StartWalletModalComponent', () => {
  let component: StartWalletModalComponent;
  let fixture: ComponentFixture<StartWalletModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', [
    'create',
    'dismiss'
  ]);
  const secureStorageServiceMock = new AdlSecureStorageServiceMock();
  const appFacadeMock = new AppFacadeMock();

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(StartWalletModalComponent, {
      add: {
        imports: [IonicModule, TestingModule, FormsModule],
        providers: [
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: AdlSecureStorageService,
            useValue: secureStorageServiceMock
          },
          { provide: AppFacade, useValue: appFacadeMock }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(StartWalletModalComponent);
    component = fixture.componentInstance;
    component.startWalletModalProps = {
      title: faker.lorem.sentence(3),
      icon: 'wallets/apple-pay',
      items: [
        {
          icon: faker.lorem.slug(3),
          description: faker.lorem.sentence(10)
        }
      ],
      actionButton: faker.word.verb(),
      cancelButton: faker.word.verb(),
      platform: Platform.IOS
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be closeModal', async () => {
    await component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should call be closeModal with accepted', () => {
    component.acceptConditions = true;
    fixture.detectChanges();
    const putAdlSecureStorageServiceSpy = spyOn(
      secureStorageServiceMock,
      'put'
    );
    component.closeModal(true);
    expect(putAdlSecureStorageServiceSpy).toHaveBeenCalled();
  });
});
