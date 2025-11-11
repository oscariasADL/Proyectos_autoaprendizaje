import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivateDigitalDebitCardInfoComponent } from './activate-digital-debit-card-info.component';
import { TestingModule } from '@testing/testing.module';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('ActivateDigitalDebitCardInitComponent', () => {
  let component: ActivateDigitalDebitCardInfoComponent;
  let fixture: ComponentFixture<ActivateDigitalDebitCardInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateDigitalDebitCardInfoComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateDigitalDebitCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
