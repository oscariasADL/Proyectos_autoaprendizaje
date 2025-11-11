import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvalKeyDetailsComponent } from './aval-key-details.component';
import { TestingModule } from '@testing/testing.module';
import {
  SpiKeyType,
  StatusDirectory
} from '@app/modules/product/entities/product-spi-user-key';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { TypeAccount } from '@app/commons/entities/product/type-account';

xdescribe('AvalKeyDetailsComponent', () => {
  let component: AvalKeyDetailsComponent;
  let fixture: ComponentFixture<AvalKeyDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvalKeyDetailsComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AvalKeyDetailsComponent);
    component = fixture.componentInstance;
    component.item = {
      numberProduct: '8942786',
      accountId: '008942786',
      accountType: TypeAccount.SDA,
      keyId: '@ASD343',
      keyType: SpiKeyType.AlphanumericIdentifier,
      preferredIndicator: 'N',
      statusDesc: 'ACTIVA',
      effDt: '2024-11-14T10:45:50.995-05:00',
      statusDirectory: StatusDirectory.DICE
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit copyKey event', () => {
    spyOn(component.copyKey, 'emit');

    component.onCopy();

    expect(component.copyKey.emit).toHaveBeenCalledWith();
  });

  it('should emit showTagAvalPopover event when onShowTagAvalPopover is called', () => {
    spyOn(component.showTagAvalPopover, 'emit');
    const mockEvent = new MouseEvent('click');

    component.onShowTagAvalPopover(mockEvent);

    expect(component.showTagAvalPopover.emit).toHaveBeenCalledWith(mockEvent);
  });
});
