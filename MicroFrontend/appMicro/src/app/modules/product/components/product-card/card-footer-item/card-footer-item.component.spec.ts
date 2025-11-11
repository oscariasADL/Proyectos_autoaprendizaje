import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestingModule } from '@testing/testing.module';
import { CardFooterItemComponent } from './card-footer-item.component';
import {
  SpiKeyType,
  StatusDirectory
} from '@app/modules/product/entities/product-spi-user-key';
import {
  TAG_AVAL_COPY_EVENT,
  TAG_AVAL_CUTOMIZATION_FROM_ICON_EVENT
} from '@app/modules/product/constants/product.constants';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TypeAccount } from '@app/commons/entities/product/type-account';

describe('CardFooterItemComponent', () => {
  let component: CardFooterItemComponent;
  let fixture: ComponentFixture<CardFooterItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardFooterItemComponent],
      imports: [IonicModule, TestingModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardFooterItemComponent);
    component = fixture.componentInstance;
    component.item = {
      numberProduct: '8942786',
      accountId: '008942786',
      accountType: TypeAccount.SDA,
      keyId: '@AVABC123',
      keyType: SpiKeyType.AlphanumericIdentifier,
      preferredIndicator: 'N',
      statusDesc: 'ACTIVA',
      effDt: '2024-11-14T10:45:50.995-05:00',
      statusDirectory: StatusDirectory.DICE
    };
    component.utagForCopyKey = TAG_AVAL_COPY_EVENT;
    component.utagForModifyKey = TAG_AVAL_CUTOMIZATION_FROM_ICON_EVENT;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return tag-aval-colored.svg for AlphanumericIdentifier', () => {
    component.item.keyType = SpiKeyType.AlphanumericIdentifier;
    expect(component.getIcon()).toContain('tag-aval-colored.svg');
  });

  it('should return bre-b.svg for non-AlphanumericIdentifier key types', () => {
    component.item.keyType = SpiKeyType.PhoneNumber;
    expect(component.getIcon()).toContain('bre-b.svg');
  });

  it('should return true if keyType is AlphanumericIdentifier', () => {
    component.item.keyType = SpiKeyType.AlphanumericIdentifier;
    expect(component.isModificationEnabled()).toBeTrue();
  });

  it('should return false for other key types', () => {
    component.item.keyType = SpiKeyType.IdentityDocument;
    expect(component.isModificationEnabled()).toBeFalse();
  });

  it('should emit showTagAvalPopover event', () => {
    spyOn(component.showTagAvalPopover, 'emit');
    const mockEvent = new MouseEvent('click');
    component.onShowTagAvalPopover(mockEvent);
    expect(component.showTagAvalPopover.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('should emit copyKey event', () => {
    spyOn(component.copyKey, 'emit');
    component.onCopyKey();
    expect(component.copyKey.emit).toHaveBeenCalled();
  });

  it('should emit modifyKey event', () => {
    spyOn(component.modifyKey, 'emit');
    component.onModifyKey();
    expect(component.modifyKey.emit).toHaveBeenCalled();
  });
});
