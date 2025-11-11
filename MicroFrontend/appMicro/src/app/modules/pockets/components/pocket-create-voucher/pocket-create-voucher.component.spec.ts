import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { PocketCreateVoucherComponent } from './pocket-create-voucher.component';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { CommonsModule } from '@commons/commons.module';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('PocketCreateVoucherComponent', () => {
  let component: PocketCreateVoucherComponent;
  let fixture: ComponentFixture<PocketCreateVoucherComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(PocketCreateVoucherComponent, {
      add: {
        imports: [TestingModule],
        providers: [
          {
            provide: ModalController,
            useValue: modalCtrlSpy
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [HeadersModule, CommonsModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(PocketCreateVoucherComponent);
    component = fixture.componentInstance;
    component.title = faker.lorem.sentence(5);
    component.description = faker.lorem.text();
    component.approvalId = faker.string.numeric(8);
    component.voucherItems = [];
    component.noticeMessage = faker.lorem.text();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal', async () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
