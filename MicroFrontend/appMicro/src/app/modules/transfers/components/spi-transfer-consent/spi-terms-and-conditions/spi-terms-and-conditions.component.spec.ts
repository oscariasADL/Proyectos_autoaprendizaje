import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpiTermsAndConditionsComponent } from './spi-terms-and-conditions.component';
import { TestingModule } from '@testing/testing.module';

describe('SpiTermsAndConditionsComponent', () => {
  let component: SpiTermsAndConditionsComponent;
  let fixture: ComponentFixture<SpiTermsAndConditionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(SpiTermsAndConditionsComponent, {
      add: {
        imports: [IonicModule, TestingModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(SpiTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be termsAccepted', () => {
    component.acceptTerms();
    expect(component.termsAccepted.emit()).toBe(void 0);
  });

  it('should call be termsClosed', () => {
    component.goBack();
    expect(component.termsClosed.emit()).toBe(void 0);
  });
});
